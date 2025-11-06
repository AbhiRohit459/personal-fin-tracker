
## Personal Finance Tracker

A full-stack personal finance tracking app with user authentication, income/expense management, summaries, charts, and report generation.

### Features
- **Auth**: Signup, login, JWT-protected routes
- **Transactions**: Add, list, and delete incomes and expenses
- **Dashboard**: Balance, totals, recent history
- **Charts**: Visualize spending and income trends
- **Reports**: Generate simple reports

### Tech Stack
- **Frontend**: React (CRA), styled-components
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT

### Project Structure
```
backend/          Express API, models, routes, controllers
frontend/         React app (CRA), components, pages, styles
```

### Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### Environment Variables
Create a `.env` in `backend/` with:
```
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<a-strong-secret>
PORT=5000
```

If the frontend needs API base URL customization, create `.env` in `frontend/` (optional):
```
REACT_APP_API_URL=http://localhost:5000
```

### Setup
1) Install dependencies
```
cd backend && npm install
cd ../frontend && npm install
```

2) Run locally (two terminals)
```
# Terminal A
cd backend
npm start

# Terminal B
cd frontend
npm start
```

Backend defaults to `http://localhost:5000`, frontend to `http://localhost:3000`.

### Common Scripts
- Backend:
  - `npm start` — start API server
- Frontend:
  - `npm start` — start React dev server
  - `npm run build` — production build

### API Overview (Backend)
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — authenticate, returns JWT
- `GET /api/transactions` — list transactions (auth)
- `POST /api/transactions/income` — add income (auth)
- `POST /api/transactions/expense` — add expense (auth)
- `DELETE /api/transactions/:id` — delete transaction (auth)

Authorization: set header `Authorization: Bearer <token>`.

### Notes
- `node_modules/` and build caches are intentionally not committed; install locally.
- Ensure MongoDB connection string allows your IP or is reachable from your environment.

### Deployment
- Backend: Any Node hosting (Render, Railway, Heroku, etc.). Set env vars.
- Frontend: Any static host (Netlify, Vercel, GitHub Pages). Set `REACT_APP_API_URL` to your deployed backend URL and rebuild.

### License
MIT
