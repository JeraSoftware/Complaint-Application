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

## Hosting

### Frontend
- Deploy static HTML on GitHub Pages, Netlify, or Vercel.
- Use `Front end/` as the site root.

### Backend
- Deploy the Spring Boot app on Azure App Service, AWS Elastic Beanstalk, or Heroku.
- Deploy the Node backend on the same provider or a separate service.
- Update frontend fetch URLs to point to the deployed backend endpoints.

## Notes
- Keep `backend/` and `SpringBootBackend/` running separately during development.
- Ensure CORS is enabled for deployed frontend URLs.
