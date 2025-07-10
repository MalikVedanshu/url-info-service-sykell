# Web Crawler Dashboard – Sykell Full-Stack Challenge

This is my submission for the Sykell Full-Stack Developer (Front-End Focus) challenge. The application is a web crawler dashboard that allows users to submit URLs for analysis and view various insights about those pages.

## Tech Stack

- **Frontend**: React (TypeScript) – created using `create-react-app`
- **Backend**: Go (Golang) with Gin Web Framework
- **Database**: MySQL
- **Others**: Axios,gorm

---

## Features Implemented

### Backend
- Crawl and analyze web pages:
  - Extract HTML version
  - Page title
  - Count of heading tags (H1–H6)
  - Count of internal vs. external links
  - Check for broken links (4xx/5xx)
  - Detect login forms
- Secure API using authorization headers : name z-token
- error handling

### Frontend
- Login-Signup
- URL input and submission
- Real-time processing states
- UI is responsive for mobile and desktop

---

## Features in Progress / Not Completed
- Column-based sorting and filtering
- Table pagination
- Displaying H1 to H6 count
- More extensive test coverage

---

## Running the Project

### 1. Clone the repository

## in root/client

```bash
git clone https://github.com/MalikVedanshu/url-info-service-sykell

cd client
npm install
npm start

```

## in root/server
```bash

cd server
go run main.go
CompileDaemon -command="go run main.go"


```

### .env file needs to be added in root/server folder values being
```
DB_SERVER=127.0.0.1
DB_PORT=1433
DB_USER=sa
DB_PASS=
DB_DATABASE=
JWT_SECRET=
```

# Folder Structure

```
root/
├── frontend/                  # React app
│   ├── public/
│   └── src/
│       ├── index.tsx
│       ├── App.tsx
│       ├── components/        # Reusable UI components
│       ├── pages/             # Page-level components
│       ├── locales/           # i18n translations (only english used for now)
│       ├── utils/             # Frontend utility functions
│       └── ...
│
├── backend/                   # Golang API (Gin)
│   ├── main.go
│   ├── .env                   # Environment variables
│   ├── middlewares/          # Custom middleware (eg auth)
│   ├── models/               # Database models, setup & structs
│   ├── routes/               # Route handlers
│   ├── utils/                # Helper functions
│   └── ...
│
├── README.md                  # Project instructions
└── ...
```