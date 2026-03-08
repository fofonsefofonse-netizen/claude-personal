/**
 * session-relay-start.js
 * Hook SessionStart — injecte automatiquement le relais.md du projet courant
 * (ou le relais global) dans le contexte de chaque nouvelle session Claude Code.
 *
 * Priorité de recherche :
 *   1. relais.md à la racine du projet git courant
 *   2. relais.md dans le répertoire courant
 *   3. relais.md global (~/.claude/relais.md ou ~/relais.md)
 */

const fs   = require('fs');
const path = require('path');

const USERPROFILE  = process.env.USERPROFILE || 'C:\\Users\\AD';
const SESSION_FILE = path.join(USERPROFILE, '.claude', '.relay-session-start');

// ─── Marquer l'heure de démarrage de la session ─────────────────────────────
// Utilisé par le hook Stop pour savoir si le relais a déjà été généré
fs.writeFileSync(SESSION_FILE, Date.now().toString(), 'utf8');

// ─── Trouver la racine du projet (remonte jusqu'à .git) ─────────────────────
function findProjectRoot(startDir) {
  const markers = ['.git', 'package.json', 'pyproject.toml', 'Cargo.toml', 'go.mod'];
  let current = startDir;
  while (current !== path.dirname(current)) {
    for (const marker of markers) {
      if (fs.existsSync(path.join(current, marker))) {
        return current;
      }
    }
    current = path.dirname(current);
  }
  return null;
}

// ─── Résoudre le chemin du relais ───────────────────────────────────────────
const cwd         = process.cwd();
const projectRoot = findProjectRoot(cwd);

const candidates = [
  projectRoot ? { file: path.join(projectRoot, 'relais.md'), label: `projet « ${path.basename(projectRoot)} »` } : null,
  { file: path.join(cwd, 'relais.md'),                        label: 'répertoire courant' },
  { file: path.join(USERPROFILE, '.claude', 'relais.md'),     label: 'global ~/.claude' },
  { file: path.join(USERPROFILE, 'relais.md'),                label: 'global ~/' },
].filter(Boolean);

let found = null;
for (const candidate of candidates) {
  if (fs.existsSync(candidate.file)) {
    found = candidate;
    break;
  }
}

// ─── Injecter le contenu dans le contexte ───────────────────────────────────
if (found) {
  const content = fs.readFileSync(found.file, 'utf8').trim();
  const bar     = '═'.repeat(62);

  process.stdout.write([
    '',
    bar,
    `📋  RELAIS DE SESSION  —  ${found.label}`,
    `📁  ${found.file}`,
    bar,
    '',
    content,
    '',
    bar,
    '↑ Reprends exactement là où tu t\'es arrêté.',
    '  Pour mettre à jour ce relais, dis : "fin de session".',
    bar,
    '',
  ].join('\n'));
}
// Si aucun relais trouvé, silence — première session du projet.
