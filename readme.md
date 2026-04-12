# GUESS — E-Commerce Frontend

A full-featured e-commerce web application built as a frontend course final project,
replicating the shopping experience of [guess.com](https://www.guess.com).

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + Vite | UI framework and build tool |
| Tailwind CSS v4 | Styling |
| Redux Toolkit | Global state management |
| React Router v7 | Client-side routing |
| Fetch API | HTTP communication with backend |

---

## Features

**User Side**

- Product browsing with category navigation, filtering and sorting
- Product detail pages with multi-color image gallery
- Shopping basket with quantity and variant management
- Wishlist / favorites with server sync on login
- User registration, login and profile management
- Order history and personalized recommendations
- Recently viewed products

**Admin Panel** — accessible at `/admin`

- Role-based access control (`admin`, `superadmin`)
- Product management with image upload (URL or device)
- Category management with parent/child hierarchy
- Order management with status control
- User and role management (superadmin only)

---

## Getting Started

> The backend API must be running before starting the frontend.

```bash
npm install
npm run dev
```

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Main shop |
| `http://localhost:5173/admin` | Admin panel |

---

## Configuration

API base URL is defined in `src/services/api.js`:

```js
const API_BASE = 'http://localhost:8000/api';
```

Update this value when deploying to production.

---

## Admin Accounts

```
Superadmin    afag@guess.com       admin1234
Admin         admin1@guess.com     admin1234
Admin         admin2@guess.com     admin1234
```

---

## Backend Repository

The backend API this project connects to:
[GUESS E-Commerce Backend]([https://github.com/AfagRa/guess-e-commerce-backend])
