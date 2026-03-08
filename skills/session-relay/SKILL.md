---
name: session-relay
description: >
  Skill de gestion du relais de session. Génère ou met à jour le fichier relais.md
  du projet courant pour assurer la continuité entre les sessions Claude Code.
  Ce skill est activé automatiquement à la fin de chaque session (hook Stop) et
  son contenu est injecté au démarrage de chaque session (hook SessionStart).
  Déclenche ce skill quand l'utilisateur dit : "fin de session", "relais",
  "session relay", "résume la session", "end of session", "what did we do today",
  "create relay document", "relais.md", "session summary", "doc de relais",
  "document de relais", "crée un relais", "génère le relais", "summarize session",
  "session recap", "bilan de session", "mise à jour du relais", "update relay",
  "sauvegarde la session", "save session state", "checkpoint".
  Toujours sauvegarder à la racine du projet git courant (ou ~/relais.md si hors projet).
---

# Session Relay — Continuité Inter-Sessions

Tu assures la continuité parfaite entre les sessions Claude Code. Chaque projet a
son propre `relais.md` à sa racine. Ce fichier est automatiquement :
- **Lu et injecté** au démarrage de chaque session (hook SessionStart)
- **Généré/mis à jour** à la fin de chaque session (hook Stop + skill manuel)

---

## Détermination du chemin de sauvegarde

```
1. Cherche la racine du projet (remonte jusqu'à .git, package.json,
   pyproject.toml, Cargo.toml, go.mod)
2. Si trouvé → <racine-projet>/relais.md
3. Sinon → C:\Users\AD\relais.md (global)
```

Annonce toujours le chemin exact avant de sauvegarder.

---

## Structure du document relais.md

```markdown
# 🔄 Relais de Session — [Nom du Projet]
**Date :** YYYY-MM-DD
**Projet :** [chemin absolu ou nom]
**Session :** [numéro ou description courte]

---

## ✅ Accompli cette session
- [bullet par bullet, exhaustif]
- Fichiers créés/modifiés : chemins COMPLETS
- Bugs corrigés : cause + solution
- Commandes importantes exécutées
- Décisions architecturales prises

---

## 🔴 Reste à faire
### Priorité 1 — Bloquant
- [ ] [action actionnable, commence par un verbe]

### Priorité 2 — Important
- [ ] ...

### Priorité 3 — Nice-to-have
- [ ] ...

---

## 🚀 Par où commencer (prochaine session)

Les 3-5 premières actions EXACTES avec commandes copy-paste :

```bash
# 1. [Description courte]
cd "C:\chemin\exact" && commande --args

# 2. ...
```

---

## 📁 Fichiers et chemins clés

| Composant | Chemin absolu |
|---|---|
| ... | ... |

---

## ⚠️ Points d'attention
- Erreurs connues, workarounds, pièges à éviter
- Dépendances non installées
- Secrets/config à vérifier

---
*Généré le YYYY-MM-DD HH:MM par session-relay*
```

---

## Protocole d'exécution

### Étape 1 — Déterminer le chemin
Annonce le chemin cible AVANT de générer le contenu.

### Étape 2 — Scanner la session
Passe en revue mentalement TOUT ce qui s'est passé :
- Chaque fichier créé ou modifié (avec chemin complet)
- Chaque commande exécutée qui a eu de l'importance
- Chaque erreur rencontrée et comment elle a été résolue
- Chaque décision de design ou d'architecture prise
- Ce qui était EN COURS et n'est pas terminé

### Étape 3 — Identifier l'incomplétude
Qu'est-ce qui a été COMMENCÉ mais pas terminé ?
Qu'est-ce qui a ÉCHOUÉ et doit être repris ?
Qu'est-ce qui reste dans la TODO list ?

### Étape 4 — Construire le relais
Rédige selon le template. Règles strictes :
- **Chemins COMPLETS** — jamais de `./` ou chemin relatif
- **Commandes exactes** — copie-colle ready, avec vrais arguments
- **Pas de fluff** — chaque mot doit apporter de la valeur
- **Vérbes d'action** — commence chaque todo par un verbe (Installer, Créer, Tester...)
- **Concis mais complet** — vise 200-400 mots pour le relais total

### Étape 5 — Sauvegarder
Écris le fichier avec l'outil Write. Confirme dans le chat :
```
✅ relais.md sauvegardé → C:\chemin\exact\relais.md
   ✅ N choses accomplies  |  🔴 N choses restantes
   🚀 Prochaine étape : [description courte]
```

---

## Règles absolues

- **Langue** : même langue que l'utilisateur (FR si la session était en FR)
- **Timestamp** : toujours mettre la date ET l'heure du moment exact
- **Atomicité** : le relais doit être auto-suffisant — quelqu'un qui ne connaît
  pas le projet doit comprendre l'état et savoir quoi faire ensuite
- **Mise à jour** : si relais.md existe déjà, le remplacer entièrement (pas d'append)
