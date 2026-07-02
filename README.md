# Complaint Management Project

This project contains:
- `backend/`: Node.js complaint backend
- `Front end/`: static HTML/CSS frontend
- `SpringBootBackend/`: Spring Boot backend for department user management

## Setup

1. Install Git and create a GitHub repository.
2. Initialize the repo locally:
   ```powershell
   cd "c:\Users\jebas\OneDrive\Desktop\May 19 Project"
   git init
   git add .
   git commit -m "Initial project import"
   ```
3. Add your GitHub repo remote and push:
   ```powershell
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

## GitHub deployment

Your GitHub repo:
- `https://github.com/JeraSoftware/Complaint-Application`

A GitHub Actions workflow is included at `.github/workflows/deploy-frontend.yml`.
It publishes the `Front end/` folder to GitHub Pages on every push to `main`.

### Frontend
- Deploy static HTML on GitHub Pages using the workflow above.
- Expected Pages URL:
  `https://jerasoftware.github.io/Complaint-Application/`
- Use `Front end/` as the site root.

### Backend
- The Node backend and Spring Boot backend still need separate hosting.
- After deployment, update frontend fetch URLs to the deployed backend endpoints.

## Notes
- Keep `backend/` and `SpringBootBackend/` running separately during development.
- Ensure CORS is enabled for deployed frontend URLs.
