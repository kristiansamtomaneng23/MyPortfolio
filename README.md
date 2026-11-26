# MyPortfolio

This repository contains the full-stack portfolio application:

- `myportfolio-frontend/` - React, TypeScript, and Vite website
- `myportfolio-backend/PortfolioApi/` - ASP.NET Core API backed by PostgreSQL

## Run locally

Start the API from `myportfolio-backend/PortfolioApi`:

```powershell
Set-Location myportfolio-backend\PortfolioApi
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
