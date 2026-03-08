# Exemples de découpages MECE — Référence du Planner

Ces exemples servent de référence pour le MECE Planner.
Chaque arbre a été vérifié : pas de chevauchement, pas de trou majeur.

---

## 1. Analyser un marché

**Question :** "Quel est le potentiel du marché de l'IA générative en Europe ?"

```
A. Taille et structure du marché
   - Volume actuel, projection 2027, segments (B2B/B2C, vertical)
   - Répartition géographique intra-Europe

B. Acteurs et dynamiques concurrentielles
   - Leaders (locaux + américains), parts de marché
   - Barrières à l'entrée, niveau de concentration

C. Réglementation et cadre légal
   - AI Act UE, RGPD, contraintes sectorielles
   - Impact sur adoption et coûts de conformité

D. Adoption et comportements des entreprises
   - Taux d'adoption par taille / secteur
   - Cas d'usage prioritaires, freins à l'adoption

E. Facteurs d'investissement et financement
   - VC, fonds publics (Horizon Europe), M&A
   - Valorisations, tours récents
```

*Vérification : A=taille, B=acteurs, C=règles, D=demande, E=capital → pas de chevauchement.*

---

## 2. Évaluer une décision stratégique

**Question :** "Faut-il que notre startup lance un produit freemium ?"

```
A. Impact sur l'acquisition client
   - CAC freemium vs paid, virality, conversion funnel

B. Impact sur la monétisation et le LTV
   - Taux de conversion free→paid, ARPU, churn comparé

C. Coûts et faisabilité opérationnelle
   - Coût serveur / support du tier gratuit, charge équipe

D. Positionnement et perception marché
   - Signal premium vs commodity, concurrence freemium

E. Risques et scénarios de sortie
   - Risque d'abus, scénario de pivot, réversibilité
```

---

## 3. Comprendre un phénomène complexe

**Question :** "Pourquoi la productivité des développeurs a-t-elle stagné ?"

```
A. Facteurs organisationnels
   - Interruptions, réunions, dette de décision, process lourds

B. Facteurs techniques (environnement de travail)
   - Dette technique, CI/CD lent, outillage inadapté

C. Facteurs humains et cognitifs
   - Charge cognitive, burnout, turnover, onboarding long

D. Mesure et définition de la productivité
   - Biais dans les métriques, DORA vs ressenti, scope creep

E. Contexte marché et contraintes externes
   - Régulation croissante, pression de sécurité, compliance
```

*Note : "mesure de la productivité" est une branche propre — elle ne chevauche pas les causes.*

---

## 4. Benchmark de solutions / outils

**Question :** "Quel framework d'orchestration d'agents choisir : LangChain, LlamaIndex ou framework custom ?"

```
A. Facilité d'adoption et courbe d'apprentissage
   - Documentation, exemples, communauté, onboarding

B. Capacités techniques et fonctionnalités
   - Types d'agents supportés, intégrations LLM, mémoire, outils

C. Performance et scalabilité
   - Latence, throughput, coût par appel, limites en prod

D. Écosystème et pérennité
   - Mainteneurs, financement, roadmap, lock-in

E. Adéquation avec notre cas d'usage spécifique
   - Fit avec nos contraintes : stack, budget, équipe, timeline
```

---

## 5. Analyser une technologie émergente

**Question :** "Quelles sont les implications du quantum computing pour la cybersécurité ?"

```
A. État de maturité de la technologie quantique
   - Où en sont les qubits, timeline réaliste (NISQ → fault-tolerant)

B. Menaces sur les algorithmes cryptographiques actuels
   - RSA, ECC, AES — lesquels sont vulnérables, à quelle échéance

C. Solutions de cryptographie post-quantique (PQC)
   - Standards NIST, algorithmes candidats, état de déploiement

D. Impact sectoriel différencié
   - Finance, santé, défense, infrastructure critique — urgence relative

E. Stratégies de transition et coûts
   - Crypto agility, inventaire des systèmes, coûts de migration
```

---

## Anti-patterns à éviter

| ❌ Mauvais | ✅ Correct |
|---|---|
| A. Avantages / B. Inconvénients | A. Technique / B. Économique / C. Organisationnel |
| A. Court terme / B. Long terme | (OK si vraiment distinct, sinon → fusionner dans chaque branche) |
| A. Acteurs / B. Concurrents (overlap) | A. Leaders établis / B. Challengers / C. Nouveaux entrants |
| A. Tout ce qu'on sait | (trop vague → forcément non-MECE) |
| Branches de tailles très inégales | Rééquilibrer ou fusionner les petites |
