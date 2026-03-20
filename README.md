# Todo App

A simple todo list application built with React and Vite as part of a learning module on React fundamentals. The app now talks to an Express API for all CRUD operations on tasks.

## Features

- Display a list of tasks with completion status
- Visual checkmarks for completed items
- Add, edit, toggle, and delete tasks via API calls
- Glassmorphism UI with gradient accents
- Responsive design with light/dark mode support

## Tech Stack

- **React** 19 — UI library
- **Vite** 7 — build tool with HMR
- **Express** + **CORS** — lightweight JSON API for todos
- **ESLint** — code linting
- **React Compiler** — automatic optimizations

## Project Structure

```
src/
├── App.jsx            # Root component with task data
├── App.css            # Global styles
├── main.jsx           # Entry point
└── components/
    ├── TodoList.jsx   # Renders the list of todos
    └── TodoItem.jsx   # Individual todo item
server.js               # Express API (GET/POST/PATCH/DELETE)
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Backend API

Run the Express server in another terminal:

```bash
npm run server
```

- API base: `http://localhost:4000/api/todos`
- Configure CORS origin via `CLIENT_ORIGIN` (defaults to Vite dev URL).
- Point the frontend to a different API (e.g., deployed backend) via `VITE_API_URL`.

