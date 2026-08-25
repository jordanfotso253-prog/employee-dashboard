# Employee Manager Dashboard

Modern Employee Management Dashboard — React + TypeScript + Vite.

Designed to match the provided UI mockups (Login, Dashboard, Employees, Details, Add/Edit, Delete modal, Reports, Settings, Mobile).

## Features

- Login / Logout with DummyJSON API
- Protected routes + AuthContext
- Dashboard with stats + gender breakdown + recent employees
- Employees list (search, pagination, filters UI)
- Employee Details page
- Add / Edit Employee forms
- Delete confirmation modal
- Reports & Settings pages
- Fully responsive (desktop + mobile cards + hamburger menu)

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router DOM
- Lucide React (icons)
- DummyJSON API

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

**Demo credentials**
- Username: `emilys`
- Password: `emilyspass`

## Project Structure

```
src/
├── components/   # Sidebar, Header, Layout, ProtectedRoute, DeleteModal
├── pages/        # Login, Dashboard, Employees, Details, Form, Reports, Settings
├── services/     # authService, employeeService
├── context/      # AuthContext
└── types/        # TypeScript interfaces
```

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run preview` — preview build
