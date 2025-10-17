# Resume Ecosystem API

Production-ready backend API for the resume building platform.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Resume Management
- `GET /api/resume` - Get user resume data
- `POST /api/resume/achievements` - Add achievement
- `PUT /api/resume/profile` - Update profile
- `POST /api/resume/generate` - Auto-generate resume summary

### Health Check
- `GET /health` - API health status

## Example Usage

```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","firstName":"John","lastName":"Doe"}'

# Add achievement
curl -X POST http://localhost:3000/api/resume/achievements \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"type":"internship","title":"Software Engineer Intern","organization":"Tech Corp","skills":["JavaScript","React"]}'
```

## Production Features
- JWT authentication
- Rate limiting
- Security headers
- Input validation
- Error handling
- MongoDB integration
