
# 📄 Documentation – Application de Publications

## 🧠 Description

Cette application permet aux utilisateurs de créer, visualiser et supprimer des publications. Chaque publication est composée d’un **titre** et d’une **image** (via une URL). Les données sont stockées localement dans le navigateur à l’aide d’**IndexedDB**, ce qui permet de conserver les publications même après un rechargement de la page.

---

## 📦 Structure du projet

```
src/
├── modules/
│   ├── Storage.ts           // Gestion de la base de données IndexedDB
│   └── PublicationManager.ts (non utilisé)
├── newPublications.tsx      // Composant principal pour la gestion des publications
├── Publications.tsx         // Composant d'accueil
├── Publications.css         // Styles de l'application
└── index.tsx                // Point d’entrée de l’application
```

---

## ⚙️ Fonctionnement général

### 1. Création de publication

Dans `newPublications.tsx` :
- L'utilisateur entre une **URL d'image** et un **titre**.
- En cliquant sur **Send publication**, l'application appelle :
  - `storage.addPublication(title, image)` → Enregistre la publication dans **IndexedDB**.
- L'état `publications` est mis à jour avec les données stockées.

---

### 2. Affichage des publications

À chaque chargement :
- `useEffect` exécute `storage.init()` pour initialiser IndexedDB.
- Ensuite, `storage.getAllPublications()` récupère les publications stockées et les affiche sous forme de cartes :

```tsx
<img src={pub.image} alt={pub.title} />
<p>{pub.title}</p>
```

---

### 3. Suppression de publication

- Lors d’un clic gauche sur une carte, une **modale de confirmation** s’affiche.
- Si l'utilisateur confirme :
  - `storage.deletePublication(id)` supprime la publication d'IndexedDB.
  - L’état est de nouveau mis à jour avec les publications restantes.

---

### 4. Stockage (`modules/Storage.ts`)

- Initialise IndexedDB avec :
  - Nom : `PublicationsDB`
  - Store : `publications`
- Stocke chaque publication avec un `id` auto-incrémenté, un `title` et un `image`.

```ts
db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
```

- Méthodes principales :
  - `addPublication(title, image)`
  - `getAllPublications()`
  - `deletePublication(id)`

---

## 💻 Déploiement sur GitHub Pages

### Étapes :

1. Ajouter dans `package.json` :

```json
"homepage": "https://<utilisateur>.github.io/<repo>"
```

2. Ajouter les scripts :

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Exécuter :

```bash
npm run deploy
```

---

## 🖼️ Démo visuelle

- **Carte publication** :
  - Image
  - Titre
  - Clique gauche → Modale de suppression

- **Formulaire** :
  - Champ pour URL image
  - Champ pour titre
  - Bouton pour envoyer

---

## 🧪 À améliorer

- Prévisualisation de l’image avant validation
- Système de tri ou recherche
- Support de drag & drop ou upload de fichiers
- Internationalisation (fr/en)

---

## 👨‍💻 Auteur

Développé par **Maël Gruand**  
📂 GitHub : [maelgruand1](https://github.com/maelgruand1)

---

## Connection
Username : Admin
Password : root


