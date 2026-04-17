# Documentation des Routes API

Documentation complète de toutes les routes de l'API Gym Management.

## Authentification

Les routes marquées 🔒 nécessitent un token JWT dans l'en-tête :
```
Authorization: Bearer <token>
```

Les rôles disponibles : `admin`, `manager`, `member`

---

## Routes User (`/user`)

### Authentification

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| POST | `/auth` | - | Connexion (retourne un JWT token) |

**Body `/auth` :**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Réponse :**
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "507f1f77bcf86cd799439011"
}
```

### CRUD Utilisateurs

| Méthode | Route | Auth | Rôle | Description |
|---------|-------|------|------|-------------|
| GET | `/getAll` | 🔒 | - | Récupérer tous les utilisateurs |
| GET | `/get/:id` | 🔒 | - | Récupérer un utilisateur par ID |
| POST | `/create` | 🔒 | - | Créer un utilisateur |
| PATCH | `/update/:id` | 🔒 | - | Mettre à jour un utilisateur |
| DELETE | `/delete/:id` | 🔒 | - | Supprimer un utilisateur |
| DELETE | `/deleteAll` | 🔒 | - | Supprimer tous les utilisateurs |

**Body `/create` :**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "role": "member",
  "active": true
}
```

### Gestion des comptes (Admin)

| Méthode | Route | Auth | Rôle | Description |
|---------|-------|------|------|-------------|
| PATCH | `/toggle-active/:id` | 🔒 | admin | Activer/désactiver un compte |
| GET | `/status/:id` | 🔒 | admin | Voir le statut d'un utilisateur |
