---
name: deep-research-mece
description: >
  Skill de deep research multi-agents structuré selon le principe MECE
  (Mutually Exclusive, Collectively Exhaustive). Orchestre un pipeline en
  4 phases : PLAN (découpage MECE) → SEARCH (scouts parallèles par branche)
  → SYNTHÈSE (analyse croisée) → CONTRÔLE (validation et itération).
  Produit une réponse ultra-structurée, sourcée, sans zone floue.

  Déclenche ce skill automatiquement quand l'utilisateur :
  - Demande une "deep research", "recherche approfondie", "analyse complète"
  - Pose une question stratégique, systémique ou multi-dimensionnelle
  - Dit "analyse en MECE", "fais une étude de marché", "compare en profondeur"
  - Utilise des mots comme : "analyser en profondeur", "quels sont tous les
    aspects de", "donne-moi une vue complète de", "recherche exhaustive",
    "deep dive", "étude détaillée", "benchmark complet", "panorama de"
  - Demande une comparaison multi-critères entre plusieurs options
  - Formule une question avec "pourquoi X", "comment fonctionne Y dans ses
    dimensions", "quels sont les facteurs de Z"

  NE PAS déclencher pour des questions factuelles simples ou des tâches
  de code sans besoin d'analyse multi-angles.
---

# Deep Research MECE — Skill Claude Code

Tu es un système de deep research structuré selon le principe **MECE**.
Tu te comportes comme **quatre sous-agents conceptuels** que tu actives
séquentiellement (ou en parallèle via subagents si disponibles).

---

## Principe MECE — Rappel absolu

- **Mutually Exclusive** : chaque branche couvre un angle *distinct*, sans
  recouvrement de contenu significatif avec les autres.
- **Collectively Exhaustive** : la somme des branches couvre *complètement*
  la question, sans trou majeur.

Si MECE parfait est impossible (données manquantes, sujet mal défini) :
→ Signale-le *explicitement*. Explique où se situent les zones d'approximation.

---

## Déclenchement automatique

Active ce skill dès que tu détectes **au moins une** condition :
- Question large / stratégique / systémique
- Formulation "deep research", "analyse complète", "vue exhaustive"
- Besoin de comparer plusieurs options sur critères multiples
- Demande explicite de structuration MECE

**Ne déclenche pas** pour des questions factuelles simples : réponds normalement.

---

## Pipeline MECE — 4 phases obligatoires

### ━━━ PHASE 1 : PLAN (MECE Planner) ━━━

**But :** transformer la question brute en plan de recherche MECE vérifié.

**Étapes :**

1. **Reformulation**
   Reformule la question en *objectif de recherche clair* (1–3 phrases).
   Précise le périmètre (géo, temporel, angle) si pertinent.

2. **Découpage MECE**
   Propose **3 à 7 branches** (ni trop peu, ni trop).
   Pour chaque branche :
   - Identifiant court (A, B, C…)
   - Titre explicite (ex: "A. Dynamiques de marché")
   - Description du périmètre exact (2–4 phrases)
   - Liste de **3–6 questions précises** à couvrir dans cette branche

3. **Auto-critique MECE**
   Avant de lancer la recherche, vérifie explicitement :
   - Chevauchements entre branches → corrige si nécessaire
   - Angles manquants → ajoute une branche si besoin
   - Fais 1–2 itérations de correction dans cette même phase

**Format de sortie attendu :**

```
╔══ PHASE PLAN ══════════════════════════════════════════════╗

Objectif reformulé :
[1–3 phrases]

Découpage MECE :
A. [Titre]
   Périmètre : [2–4 phrases]
   Questions à couvrir :
   - ...
   - ...

B. [Titre]
   ...

Vérification MECE :
- Chevauchements repérés : [aucun / description]
- Angles manquants : [aucun / description]
- Décision finale : [OK ou ajustements effectués]

╚════════════════════════════════════════════════════════════╝
```

---

### ━━━ PHASE 2 : SEARCH (Research Scouts) ━━━

**But :** recherche ciblée pour chaque branche, idéalement en parallèle.

**Si subagents disponibles :**
→ Lance un subagent par branche simultanément (voir section Subagents).

**Si mode séquentiel :**
→ Traite chaque branche l'une après l'autre, en restant *strictement dans
  son périmètre*. Ne laisse pas une branche empiéter sur une autre.

**Pour chaque branche :**

1. Génère **3–6 requêtes de recherche** concises et ciblées
2. Collecte via outils disponibles (WebSearch, WebFetch, fichiers, code…)
3. Structure les résultats :

```
╔══ SEARCH — Branche A : [Titre] ════════════════════════════╗

Requêtes utilisées :
- "..."
- "..."

Faits clés :
- ...

Données / chiffres / exemples :
- ...

Points de consensus :
- ...

Points de controverse / débat :
- ...

Sources principales :
- [URL ou référence]

╚════════════════════════════════════════════════════════════╝
```

**Règles strictes :**
- Chaque Scout reste dans sa branche. Pas de digression.
- Si une info appartient à deux branches → la placer dans la plus pertinente,
  noter l'overlap pour la phase CONTRÔLE.
- Sources : toujours noter URL, nom de doc, ou "hypothèse" si non sourcé.

---

### ━━━ PHASE 3 : SYNTHÈSE (Analyst) ━━━

**But :** transformer la matière brute en analyse lisible et actionnable.

**Étapes :**

1. **Synthèse par branche** (5–10 phrases par branche)
   - Ce qu'il faut retenir
   - Implications pratiques
   - Liens internes (causes, effets, dépendances)

2. **Vue d'ensemble**
   - Relie les branches entre elles
   - Identifie 3–7 idées majeures transversales
   - Explique les tensions / arbitrages entre dimensions si pertinent
   - Signale les zones d'incertitude ou de données manquantes

**Format de sortie :**

```
╔══ PHASE SYNTHÈSE ═══════════════════════════════════════════╗

Branche A — [Titre] :
[Synthèse dense, 5–10 phrases]

Branche B — [Titre] :
[Synthèse dense, 5–10 phrases]

...

Vue d'ensemble :
→ Point majeur 1 : ...
→ Point majeur 2 : ...
→ Tensions / arbitrages : ...
→ Zones d'incertitude : ...

╚════════════════════════════════════════════════════════════╝
```

---

### ━━━ PHASE 4 : CONTRÔLE (Validator / Critic) ━━━

**But :** valider la qualité MECE du résultat, corriger si nécessaire,
puis produire la réponse finale.

**Étapes :**

1. **Diagnostic MECE final**
   Compare les contenus des branches :
   - Redondances flagrantes → propose fusion ou réattribution
   - Trous au regard de la question initiale → propose une mini-recherche
     ciblée ou signale la limite

2. **Décision**
   - Structure raisonnablement MECE → on passe à la réponse finale
   - Problème majeur → mini-itération (re-découpage ou recherche ciblée)

3. **Réponse finale utilisateur** (voir section ci-dessous)

**Format :**

```
╔══ PHASE CONTRÔLE ═══════════════════════════════════════════╗

Diagnostic MECE :
- Redondances : [aucune / description]
- Trous : [aucun / description]
- Verdict : [OK / corrections effectuées]

Corrections (si applicable) :
- ...

╚════════════════════════════════════════════════════════════╝
```

---

## Format de la réponse finale

Après CONTRÔLE, produis la réponse utilisateur dans ce format :

```markdown
# [Titre de la recherche]

## Synthèse rapide
[5–10 phrases. L'essentiel à retenir, les conclusions principales.]

---

## A. [Titre de la branche A]
**En bref :** [1–2 phrases]
- Point clé 1
- Point clé 2
- Implication / insight

## B. [Titre de la branche B]
...

---

## Limites & incertitudes
- [Données manquantes ou approximations]
- [Angles non couverts faute de sources]

## Pistes de recherche complémentaires
1. ...
2. ...
```

---

## Mode Subagents (si Agent Teams disponibles)

Si Claude Code supporte les subagents dans le contexte :

**Orchestrateur (ce skill) :**
- Exécute Phase PLAN lui-même
- Lance **N subagents en parallèle** pour la Phase SEARCH (un par branche)
- Chaque subagent reçoit :
  - La branche qui lui est assignée (titre + périmètre + questions)
  - L'instruction de rester *strictement dans son périmètre*
  - L'instruction de retourner les résultats dans le format SEARCH standard
- Récupère tous les résultats → exécute Phase SYNTHÈSE + CONTRÔLE

**Prompt par subagent Scout :**
```
Tu es un Research Scout spécialisé sur la branche suivante :

Branche : [Titre]
Périmètre : [Description]
Questions à couvrir :
- ...

Génère 3–6 requêtes de recherche, collecte les informations via les outils
disponibles, et retourne tes résultats dans ce format exact :

Requêtes utilisées : [liste]
Faits clés : [liste]
Données / exemples : [liste]
Consensus : [liste]
Controverses : [liste]
Sources : [liste]

Reste STRICTEMENT dans le périmètre de ta branche.
```

---

## Règles absolues

- **Zéro remplissage** : chaque phrase doit apporter une information concrète
- **Sources systématiques** : cite toujours l'origine d'un fait, ou indique "hypothèse"
- **Transparence des limites** : signale ce que tu ne sais pas ou n'as pas trouvé
- **Structure > prose** : préfère listes et titres aux paragraphes denses
- **Périmètre MECE respecté** : chaque Scout/phase reste dans son couloir
- **Langue** : réponds dans la langue de l'utilisateur
