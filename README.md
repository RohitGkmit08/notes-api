# Notes API

A production-quality REST API for a multi-user notes service, similar to Google Keep.

## Live URL
https://notes-api-om4a.onrender.com

## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

## Features
- User registration and login with JWT auth
- Create, read, update, delete notes
- Share notes with other users by email
- Full-text search across title and content
- Filter by tags, pinned, archived
- Pagination and sorting
- OpenAPI documentation

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /register | Register a new user |
| POST | /login | Login and get JWT token |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /notes | Get all notes |
| POST | /notes | Create a note |
| GET | /notes/:id | Get note by ID |
| PUT | /notes/:id | Update a note |
| DELETE | /notes/:id | Delete a note |
| POST | /notes/:id/share | Share note with a user |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /about | About the API |
| GET | /openapi.json | API documentation |

## Search & Filtering
- GET /notes?search=meeting
- GET /notes?tag=work
- GET /notes?isPinned=true
- GET /notes?isArchived=true
- GET /notes?page=1&limit=10
- GET /notes?sortBy=createdAt&order=desc
