/**
 * session-relay-stop.js
 * Hook Stop — demande à Claude de générer le relais.md avant de terminer.
 *
 * Fonctionnement :
 *   Le stdout de ce hook est injecté dans le contexte de Claude avant
 *   sa réponse finale. Claude voit l'instruction et génère le relais
 *   dans son dernier message (en utilisant le skill session-relay).
 *
 * Protection anti-doublon :
 *   Si relais.md a été modifié APRÈS le démarrage de la session courante
 *   (marqueur ~/.claude/.relay-session-start), on skip.
 */

const fs   = require('fs');
const path = require('path');

const USERPROFILE  = process.env.USERPROFILE || 'C:\\Users\\AD';
const SESSION_FILE = path.join(USERPROFILE, '.claude', '.relay-session-start');

// ─── Anti-récursion (session interne de génération) ─────────────────────────
if (process.env.CLAUDE_RELAY_SESSION === '1') {
  process.exit(0);
}

// ─── Récupérer l'heure de démarrage de session ──────────────────────────────
let sessionStart = 0;
if (fs.existsSync(SESSION_FILE)) {
  sessionStart = parseInt(fs.readFileSync(SESSION_FILE, 'utf8').trim(), 10) || 0;
}

// ─── Trouver la racine du projet ─────────────────────────────────────────────
function findProjectRoot(startDir) {
  const markers = ['.git', 'package.json', 'pyproject.toml', 'Cargo.toml', 'go.mod'];
  let current = startDir;
  while (current !== path.dirname(current)) {
    for (const marker of markers) {
      if (fs.existsSync(path.join(current, marker))) return current;
    }
    current = path.dirname(current);
  }
  return null;
}

const cwd         = process.cwd();
const projectRoot = findProjectRoot(cwd);

// Chemin cible pour le relais (projet > global)
const relayPath = projectRoot
  ? path.join(projectRoot, 'relais.md').replace(/\\/g, '/')
  : path.join(USERPROFILE, 'relais.md').replace(/\\/g, '/');

// ─── Vérifier si le relais a déjà été généré PENDANT cette session ───────────
if (fs.existsSync(relayPath)) {
  const relayMtime = fs.statSync(relayPath).mtimeMs;
  if (relayMtime > sessionStart) {
    // Le relais a été mis à jour après le début de la session → déjà fait
    process.exit(0);
  }
}

// ─── Injecter l'instruction dans le contexte de Claude ──────────────────────
// Ce stdout devient un system-reminder que Claude voit avant sa réponse finale.
const bar = '─'.repeat(60);
process.stdout.write([
  '',
  bar,
  '⚠️  ACTION REQUISE — RELAIS DE SESSION',
  bar,
  `Génère maintenant le document relais.md pour cette session.`,
  `Chemin de sauvegarde : ${relayPath}`,
  '',
  `Utilise le skill session-relay. Sois concis et actionnable.`,
  `Inclus : ✅ accompli  |  🔴 reste à faire  |  🚀 prochaines étapes`,
  bar,
  '',
].join('\n'));
