# VertexAI Code Editor

A full-stack code editor project built with a modular backend architecture.

## Current Features

- Google Authentication
- Session management using Redis
- Redis integrated with Docker
- Logout functionality
- Modular backend structure with services and shared utilities

## Tech Stack

- Node.js
- Express.js
- JavaScript
- Redis
- Docker & Docker Compose
- Google OAuth
- Git & GitHub

## Project Structure

```text
VertexAI_Code_Editor/
├── Backend/
│   ├── gateway/
│   ├── services/
│   │   └── auth/
│   ├── shared/
│   │   └── redis/
│   └── docker-compose.yml
│
├── Frontend/
└── README.md
Development

The project uses feature branches and Pull Requests for development.

main
├── feature/auth
├── feature/redis-in-docker
└── feature/logout

Each feature is developed separately, reviewed, and then merged into main.

Status

🚧 Under Development