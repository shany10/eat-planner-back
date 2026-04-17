# Database Seeders

Ce dossier contient les seeders pour peupler la base de données avec des données de test.

## Collections seeded

- **Users** : Utilisateurs (admin, managers, membres)
- **Exercise Types** : Types d'exercices (push-ups, squats, etc.)
- **Gyms** : Salles de sport
- **Badges** : Badges de réussite
- **Badge Rules** : Règles d'attribution automatique des badges
- **Challenges** : Défis sportifs

## Utilisation

### Option 1 : Dans un container Docker (recommandé)
```bash
docker compose exec web npm run seed:dev
```

### Option 2 : En développement local (avec ts-node)
```bash
# Assurez-vous que MongoDB tourne localement ou modifiez MONGO_URI dans .env
npm run seed:dev
```

### Option 3 : En production (compile puis exécute)
```bash
npm run seed
```

## Important

**Attention** : L'exécution du seeder **supprime toutes les données existantes** avant d'insérer les nouvelles données.

Ne l'exécutez **jamais en production** avec des données réelles !

## Données créées

### Comptes utilisateurs

| Rôle    | Email                      | Mot de passe  |
|---------|----------------------------|---------------|
| Admin   | admin@gym.com              | Admin123!     |
| Manager | jean.manager@gym.com       | Manager123!   |
| Member  | marie.dupont@gym.com       | Member123!    |
| Member  | pierre.martin@gym.com      | Member123!    |
| Member  | sophie.bernard@gym.com     | Member123!    |

### Types d'exercices

- Push-ups (débutant)
- Squats (débutant)
- Pull-ups (intermédiaire)
- Deadlift (avancé)
- Bench Press (intermédiaire)
- Plank (débutant)
- Lunges (débutant)
- Burpees (avancé)
- Dips (intermédiaire)
- Box Jumps (intermédiaire)

### Salles de sport

- **FitZone Paris** (approuvée)
- **PowerGym Lyon** (approuvée)
- **BodyShape Marseille** (approuvée)
- **IronTemple Toulouse** (en attente d'approbation)

### Badges

- Première Séance
- Marathonien
- Débutant Déterminé
- Champion Intermédiaire
- Expert Avancé
- Social Butterfly
- Roi du Cardio
- Force Brute
- Régularité
- Légende

### Badge Rules (Règles d'attribution)

- **Première Séance** : 1 entraînement complété
- **Débutant Déterminé** : 10 entraînements complétés
- **Régularité** : 30 entraînements complétés
- **Marathonien** : 50 entraînements complétés
- **Expert Avancé** : 1000 points accumulés
- **Champion Intermédiaire** : 5000 points accumulés
- **Roi du Cardio** : 10000 points accumulés

*Note : Les autres badges (Social Butterfly, Force Brute, Légende) nécessitent la création de règles personnalisées via l'API `/badgeRule/create`*

### Challenges

- Défi Push-ups 100
- 30 Jours de Squats
- Pull-ups Master
- Plank Challenge
- Burpees Inferno

## Personnalisation

Pour modifier les données seeded, éditez les fichiers dans le dossier `seeders/` :

- `userSeeder.ts` - Données utilisateurs
- `exerciseTypeSeeder.ts` - Types d'exercices
- `gymSeeder.ts` - Salles de sport
- `badgeSeeder.ts` - Badges
- `badgeRuleSeeder.ts` - Règles d'attribution des badges
- `challengeSeeder.ts` - Challenges

## Dépendances

Les seeders respectent les relations entre collections :
1. Users (indépendant)
2. ExerciseTypes (indépendant)
3. Badges (indépendant)
4. Badge Rules (dépend de Badges - liaison par nom)
5. Gyms (dépend de Users et ExerciseTypes)
6. Challenges (dépend de Users, ExerciseTypes et Gyms)

## Exemple de sortie

```
Starting database seeding...

Connecting to MongoDB: mongodb://localhost:27017/gym-app
Connected to MongoDB

Clearing existing data...
Database cleared

Seeding users...
5 users created
Seeding exercise types...
10 exercise types created
Seeding badges...
10 badges created
Seeding badge rules...
7 badge rules created
Seeding gyms...
4 gyms created
Seeding challenges...
5 challenges created

Database seeding completed successfully!

Summary:
   - Users: 5
   - Exercise Types: 10
   - Badges: 10
   - Badge Rules: 7
   - Gyms: 4
   - Challenges: 5

Test accounts:
   Admin: admin@gym.com / Admin123!
   Manager: jean.manager@gym.com / Manager123!
   Member: marie.dupont@gym.com / Member123!

Disconnected from MongoDB
```

## Troubleshooting

### Erreur de connexion MongoDB
Vérifiez que :
- MongoDB est démarré
- La variable `MONGO_URI` est correctement définie dans `.env`
- Le port MongoDB est accessible

### Erreur de compilation TypeScript
```bash
npm run build
```
Puis réessayez `npm run seed`

### Erreur de dépendances manquantes
Installez ts-node si nécessaire :
```bash
npm install -D ts-node
```
