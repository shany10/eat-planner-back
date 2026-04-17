# Nodemon 
Outil Node.js qui surveille les fichiers de ton projet et redémarre automatiquement le serveur Node quand il détecte des changements — très utile en développement pour éviter de relancer manuellement à chaque modification.

# argon2 
Bibliothèque de hachage de mots de passe moderne et sécurisée — c'est l'algorithme recommandé pour stocker des mots de passe en base de données

 # jsonwebtoken (JWT)
 Bibliothèque Node.js la plus populaire pour créer et vérifier des JSON Web Tokens (JWT) — utilisée pour l'authentification stateless dans les APIs
 exemple: 
    Créer des tokens signés contenant des données (claims) comme l'ID utilisateur, rôle, expiration.
    Vérifier l'authenticité et l'intégrité d'un token reçu du client.
    Permettre une authentification sans session (le serveur n'a pas besoin de stocker les tokens).

# Zod 
Bibliothèque TypeScript de validation de schémas et de parsing de données — elle permet de valider les données à l'exécution (runtime) tout en générant automatiquement les types TypeScript.
exemple: 
    Valider les données reçues (API requests, formulaires, configs, etc.).
    Garantir que les données respectent un schéma (type, format, contraintes).
    Générer automatiquement des types TypeScript depuis les schémas.
    Parser et transformer les données (coercion, defaults, transformations).