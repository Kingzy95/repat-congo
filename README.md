# 🇨�� Entrepreneur Congo - Planificateur Personnel

Une application complète pour aider les entrepreneurs à préparer leur installation au Congo-Brazzaville.

## 🏗️ Architecture

- **Frontend** : React 18 + TypeScript + Tailwind CSS + Redux Toolkit
- **Backend** : NestJS + Prisma + PostgreSQL (Supabase)
- **Base de données** : PostgreSQL avec Supabase
- **Authentification** : JWT avec bcrypt

## 📁 Structure du Projet

```
entrepreneur-congo-planner/
├── backend/          # API NestJS
│   ├── prisma/       # Schema et migrations
│   ├── src/          # Code source NestJS
│   └── ...
├── frontend/         # Application React
│   ├── src/          # Code source React
│   ├── public/       # Assets statiques
│   └── ...
└── README.md
```

## 🚀 Démarrage Rapide

### 1. Backend (NestJS)

```bash
cd backend
npm install
```

**Configuration de la base de données :**
1. Créer un compte Supabase
2. Créer un nouveau projet
3. Copier `environment.sample` vers `.env`
4. Remplir les variables d'environnement :

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[SUPABASE_REF].supabase.co:5432/postgres"
JWT_SECRET="votre-secret-jwt-super-secure"
```

**Initialiser la base de données :**
```bash
npx prisma generate
npx prisma db push
```

**Démarrer le serveur :**
```bash
npm run start:dev
```

L'API sera disponible sur http://localhost:3000
Documentation Swagger : http://localhost:3000/api/docs

### 2. Frontend (React)

```bash
cd frontend
npm install
```

**Variables d'environnement :**
Créer un fichier `.env` dans le dossier frontend :
```env
REACT_APP_API_URL=http://localhost:3000/api
PORT=3001
```

**Démarrer l'application :**
```bash
npm start
```

L'application sera disponible sur http://localhost:3001

## 🎯 Fonctionnalités

### ✅ Backend Complet (Testé)

- **Authentification JWT** - Inscription/Connexion sécurisée
- **Analyse SWOT** - Gestion des forces/faiblesses/opportunités/menaces + recommandations automatiques
- **Gestion des Tâches** - CRUD complet avec planning 4 mois pré-rempli
- **Objectifs SMART** - 5 objectifs spécifiques Congo avec suivi progression
- **Suivi d'Habitudes** - 3 habitudes par défaut avec système de streaks
- **Timer Pomodoro** - Sessions de productivité avec statistiques
- **Opportunités de Marché** - 8 opportunités Congo avec recommandations personnalisées

### 🚧 Frontend React (En cours)

- **Interface moderne** - Design inspiré des couleurs du Congo (vert/rouge)
- **Navigation responsive** - Sidebar avec 8 sections principales
- **Pages principales** :
  - Dashboard avec KPIs et métriques
  - Analyse SWOT interactive
  - Planificateur 4 mois
  - Suivi d'objectifs avec barres de progression
  - Opportunités sectorielles (Drones/SI)
  - Timer Pomodoro
  - Suivi d'habitudes
  - Ressources Congo

## 🧪 Tests et Validation

### Backend Validé
Tous les endpoints ont été testés avec curl :

```bash
# Test complet d'inscription/connexion
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "firstName": "Test", "lastName": "User"}'

# Initialisation des données
curl -X POST http://localhost:3000/api/swot/initialize -H "Authorization: Bearer $TOKEN"
curl -X POST http://localhost:3000/api/tasks/initialize-planning -H "Authorization: Bearer $TOKEN"
curl -X POST http://localhost:3000/api/goals/initialize-smart -H "Authorization: Bearer $TOKEN"
```

### Données Métier Spécifiques Congo

- **Tâches Planning** : 9 tâches réparties sur 4 mois (Contact CARIA, Réglementation drones, etc.)
- **Objectifs SMART** : Réseau 50 contacts, Financement 25M FCFA, 5 clients pilotes
- **Opportunités** : Secteurs Drones (surveillance pétrolier) et SI (microfinance digitale)
- **Analyse SWOT** : Forces (Epitech, IA) vs Défis (réseau local, expérience terrain)

## 🔧 Développement

### Structure Frontend

```
frontend/src/
├── components/       # Composants réutilisables
│   ├── Layout.tsx    # Layout principal
│   ├── Sidebar.tsx   # Navigation
│   └── Header.tsx    # Header avec profil
├── pages/           # Pages de l'application
├── store/           # Redux store et slices
├── services/        # Services API
├── types/           # Types TypeScript
├── hooks/           # Hooks personnalisés
└── styles/          # Styles CSS/Tailwind
```

### API Endpoints

- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /swot` - Récupérer analyse SWOT
- `POST /swot/initialize` - Initialiser SWOT par défaut
- `GET /tasks` - Liste des tâches avec filtres
- `POST /tasks/initialize-planning` - Créer planning 4 mois
- `GET /goals/stats` - Statistiques objectifs
- `GET /habits/stats` - Statistiques habitudes
- `GET /opportunities` - Opportunités de marché

## 🌍 Spécificités Congo-Brazzaville

### Données Économiques Intégrées
- PIB 2025 : +4.4% de croissance
- Secteur pétrolier : 85% du PIB
- Population : 5.5M habitants
- Taux de change : Stable (FCFA)

### Institutions Partenaires
- **CARIA** - Centre d'Intelligence Artificielle de Brazzaville
- **Ministère du Numérique** - Réglementation tech
- **Chambre de Commerce** - Support entrepreneurs

### Secteurs d'Opportunités
1. **Drones** - Surveillance pipeline, agriculture, sécurité
2. **Systèmes d'Information** - Microfinance, gov-tech, formation

## 🎨 Design System

### Couleurs Congo
- **Vert** : #228B22 (Congo green)
- **Rouge** : #DC143C (Congo red)
- **Jaune** : #FFD700 (Congo yellow)

### Composants Tailwind Personnalisés
- `.btn-congo` - Boutons avec gradient Congo
- `.card` - Cartes avec ombres modernes
- `.swot-grid` - Grille SWOT responsive
- `.task-item` - Items de tâches interactifs

## 📦 Déploiement

### Backend (NestJS)
```bash
npm run build
npm run start:prod
```

### Frontend (React)
```bash
npm run build
# Déployer le dossier build/
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push sur la branche
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

---

**Made with ❤️ for Congo entrepreneurs**
🚀 Vers le succès entrepreneurial au Congo-Brazzaville ! # repat-congo
