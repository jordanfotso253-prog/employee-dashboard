# Employee Manager — Dashboard RH

Dashboard de gestion des ressources humaines — React + TypeScript + Vite.

Interface **100 % française**, couleurs du projet d'origine (primary indigo `#4f46e5`, sidebar sombre).

## Fonctionnalités

- Connexion / Déconnexion (API DummyJSON)
- Routes protégées + AuthContext + ThemeContext (clair/sombre)
- **Tableau de bord** — stats, graphiques, derniers employés
- **Employés** — liste, recherche, filtres, pagination, ajout/modif/suppression
- **Fiche employé** — profil complet
- **Recrutement** — offres, candidatures, entretiens
- **Congés** — calendrier, demandes en attente, historique
- **Paie** — masse salariale, bulletins
- **Formation** — catalogue et progression
- **Rapports** & **Paramètres**
- Responsive (desktop + navigation mobile)

## Stack

- React 19 + TypeScript
- Vite
- React Router DOM
- Lucide React
- Recharts
- DummyJSON API

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir http://localhost:5173

**Identifiants de démo**
- Utilisateur : `emilys`
- Mot de passe : `emilyspass`

## Structure

```
src/
├── components/   # Sidebar, Header, Layout, ProtectedRoute, DeleteModal, MobileNav
├── pages/        # Login, Dashboard, Employés, Détails, Formulaire,
│                 # Recrutement, Congés, Paie, Formation, Rapports, Paramètres
├── services/     # authService, employeeService
├── context/      # AuthContext, ThemeContext
└── types/        # Interfaces TypeScript
```
