# VLE Backend — Verified Learning Engine API

A Node.js + Express microservice backend for the VLE platform.

## Architecture

```
backend/
├── src/
│   ├── config/
│   │   ├── config.js          # Central config (reads .env)
│   │   └── db.js              # PostgreSQL pool (AWS RDS in prod)
│   ├── middleware/
│   │   ├── auth.middleware.js  # JWT verification
│   │   └── error.middleware.js # Global error handler
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── skills.controller.js
│   │   ├── graph.controller.js
│   │   └── verification.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── skills.routes.js
│   │   ├── graph.routes.js
│   │   └── verification.routes.js
│   ├── services/
│   │   ├── skillEngine.service.js   # Core progression logic
│   │   ├── verification.service.js  # Local → AWS Lambda
│   │   └── storage.service.js       # Local DB → AWS S3
│   └── utils/
│       └── initDb.js               # DB setup + seeding script
├── schema.sql                       # PostgreSQL schema
├── .env                             # Local environment variables
├── .env.example                     # Template
└── package.json
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/health` | No | Health check |
| POST | `/auth/signup` | No | Register user |
| POST | `/auth/login` | No | Login → JWT |
| GET | `/auth/me` | Yes | Get current user |
| GET | `/skills` | No | All skills |
| GET | `/skills/:id` | No | Single skill |
| GET | `/skills/:id/state` | Yes | User's state for skill |
| GET | `/skills/:id/attempts` | Yes | User's attempt history |
| GET | `/graph/:roleId` | Yes | Full graph + user states |
| POST | `/graph/:roleId/init` | Yes | Init user's skill states |
| GET | `/graph/progress` | Yes | User progress summary |
| POST | `/verify/:skillId` | Yes | Submit verification |

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 3. Initialise database
```bash
npm run init-db
```

### 4. Start development server
```bash
npm run dev
```

## AWS Deployment

### Services Used
- **EC2** (`vle-backend-server`) — Hosts this Node.js server
- **RDS** (`vle-postgres-db`) — Managed PostgreSQL database
- **S3** (`vle-submissions`) — Stores user submission files
- **Lambda** (`vle-code-grader`) — Sandboxed code execution

### Switching to AWS Services
- Set `USE_S3=true` in `.env` to upload submissions to S3
- Set `USE_LAMBDA=true` in `.env` to grade via Lambda
- Set `NODE_ENV=production` to enable RDS SSL

### EC2 Security Group Rules
- SSH: TCP port 22 (Anywhere)
- API: TCP port 3001 (Anywhere — restrict later)

### RDS Security Group
- Allow inbound PostgreSQL (port 5432) from EC2 security group only
