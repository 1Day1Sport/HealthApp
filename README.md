# 1Day1Sport HealthApp

Application full stack :
- **Frontend** : HTML/CSS/JS simple dans `frontend/index.html`
- **Backend** : Node.js + Express dans `backend/`
- **Base de données** : MongoDB Atlas
- **Auth** : code personnel à 6 chiffres

## 1. Prérequis
- Node.js 18+
- Un compte MongoDB Atlas actif
- Un compte GitHub
- Un hébergeur type Render pour l'API

## 2. Installation backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## 3. Configuration `.env`
Créer un fichier `.env` dans `backend/` :
```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/1day1sport
JWT_SECRET=un_secret_tres_long_et_aleatoire
PORT=3001
```

## 4. Déploiement sur Render
1. Créer un nouveau Web Service sur Render
2. Connecter le dépôt GitHub `1Day1Sport/HealthApp`
3. Choisir le dossier `backend`
4. Build command :
```bash
npm install
```
5. Start command :
```bash
npm start
```
6. Ajouter les variables d'environnement `MONGODB_URI`, `JWT_SECRET`, `PORT`

## 5. Déploiement frontend
### Option GitHub Pages
- Héberger le contenu du dossier `frontend/`

### Option Netlify
- Déployer le dossier `frontend/`

## 6. Mise à jour de l'URL API
Dans `frontend/index.html`, mettre à jour :
```js
var API_URL = 'https://votre-api.onrender.com';
```

## 7. Utilisation
- Ouvrir l'app frontend
- Créer un profil héros
- Choisir un code personnel à 6 chiffres
- Se reconnecter avec prénom + code
- Les sauvegardes sont locales + synchronisées vers MongoDB

## 8. Notes
- Si l'API n'est pas disponible, l'app continue à fonctionner en localStorage
- La synchro serveur reprend dès que le réseau revient
