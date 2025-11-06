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

**Backend** - Create a `.env` file in `backend/` with:
```
MONGO_URL=<your-mongodb-connection-string>
JWT_SECRET=<a-strong-secret>
PORT=5000
```

**Frontend** - Create a `.env` file in `frontend/` (optional for local dev):
```
REACT_APP_API_URL=http://localhost:5000
```

> **Note**: For production deployment, you'll need to set `REACT_APP_API_URL` to your deployed backend URL.
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

This project is ready for deployment on various platforms. Configuration files are already included.

#### Option 1: Render (Recommended for Free Tier)

**Backend Deployment:**
1. Push your code to GitHub
2. Go to [Render](https://render.com) and create a new Web Service
3. Connect your GitHub repository
4. Set the following:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `MONGO_URL` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - A strong random secret
   - `NODE_ENV` - `production`
   - `PORT` - `5000` (or leave blank, Render will assign)
6. Deploy and copy your backend URL (e.g., `https://your-app.onrender.com`)

**Frontend Deployment:**
1. Create a new Static Site on Render (or use Netlify/Vercel)
2. Connect your GitHub repository
3. Set the following:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Add environment variable:
   - `REACT_APP_API_URL` - Your deployed backend URL (e.g., `https://your-app.onrender.com`)
5. Deploy

#### Option 2: Railway

**Backend:**
1. Push code to GitHub
2. Go to [Railway](https://railway.app) and create a new project
3. Add a new service from GitHub repo
4. Set root directory to `backend`
5. Add environment variables (same as Render)
6. Deploy and copy the backend URL

**Frontend:**
1. Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
2. Connect GitHub repo, set root to `frontend`
3. Add `REACT_APP_API_URL` environment variable
4. Deploy

#### Option 3: Vercel (Frontend) + Railway/Render (Backend)

**Backend:** Follow Option 1 or 2 above

**Frontend on Vercel:**
1. Import your GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL` = your backend URL
4. Deploy

#### MongoDB Setup (Required)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist IP addresses (use `0.0.0.0/0` for all IPs in production)
5. Get your connection string and use it as `MONGO_URL`

#### Important Notes

- **CORS**: The backend already has CORS enabled, so it should work with any frontend URL
- **Environment Variables**: Never commit `.env` files. Set them in your hosting platform's dashboard
- **Build Time**: Frontend builds may take a few minutes on free tiers
- **Cold Starts**: Free tiers may have cold starts (first request after inactivity takes longer)

### License
MIT
