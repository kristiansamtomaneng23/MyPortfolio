# MyPortfolio

This repository contains the full-stack portfolio application:

- `myportfolio-frontend/` - React, TypeScript, and Vite website
- `myportfolio-backend/` - ASP.NET Core API backed by PostgreSQL

## Run locally

Start the API from `myportfolio-backend`:

```powershell
Set-Location myportfolio-backend
$env:Database__Password = "<your-database-password>"
dotnet run
```

The API listens on `http://localhost:5059` in the HTTP launch profile. The password is supplied through the environment and should not be committed.

In another terminal, start the frontend from `myportfolio-frontend`:

```powershell
Set-Location myportfolio-frontend
npm ci
npm run dev
```

The frontend uses `VITE_API_URL` for the API base URL and defaults to `http://localhost:5059`.

## Deploy the backend to Render

Create a Render Web Service from this repository and configure it to use Docker:

- Root Directory: `myportfolio-backend`
- Dockerfile Path: `./Dockerfile`
- Environment variable: `Database__Password` (set this to the PostgreSQL password in Render; do not commit it)
- Environment variable: `Frontend__Origin` (the frontend's full origin, e.g. `https://your-frontend.onrender.com`, with no trailing slash)

The container listens on Render's `PORT` value, defaulting to `10000` locally. In the frontend Render service, set `VITE_API_URL` to the backend service URL (for example, `https://your-backend.onrender.com`, with no `/api` suffix) and redeploy the frontend so Vite includes the value in its build. The backend allows requests from `http://localhost:5173` and the origin configured by `Frontend__Origin`.
