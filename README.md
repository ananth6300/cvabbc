# Construction Company Website

A full-stack MERN (MongoDB, Express, React, Node.js) application for a construction company to showcase projects and manage customer inquiries.

## Features

- **Public Pages:**
  - Home page with company information
  - Projects gallery (Completed & Ongoing projects)
  - Customer inquiry form

- **Owner Dashboard:**
  - Secure login with passkey
  - Add/manage projects with image uploads
  - View and manage customer inquiries

## Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **File Upload:** Multer
- **Authentication:** JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/construction_db
JWT_SECRET=your_secret_key_change_this
OWNER_PASSKEY=admin123
UPLOAD_PATH=./uploads
```

4. Start MongoDB (if running locally):
```bash
# On Windows (if MongoDB is installed as a service, it should start automatically)
# Or use MongoDB Atlas connection string in .env
```

5. Start the backend server:
```bash
npm run dev
# or
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Default Credentials

- **Owner Passkey:** `admin123` (can be changed in backend `.env` file)

## Project Structure

```
construction-website/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── uploads/         # Uploaded images (created automatically)
│   ├── server.js        # Express server
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects?status=completed` - Get projects by status
- `POST /api/inquiries` - Submit customer inquiry

### Owner Endpoints (Requires Authentication)
- `POST /api/auth/login` - Owner login
- `POST /api/projects` - Create project (with images)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/inquiries` - Get all inquiries
- `PUT /api/inquiries/:id` - Update inquiry status

## Notes

- Images are stored in `backend/uploads/` directory
- JWT tokens are stored in browser localStorage
- Default passkey is `admin123` - change it in production!
- Make sure MongoDB is running before starting the backend

## Production Deployment

Before deploying to production:
1. Change the `OWNER_PASSKEY` in `.env`
2. Change the `JWT_SECRET` to a strong random string
3. Use MongoDB Atlas or a production MongoDB instance
4. Update API URLs in frontend if needed
5. Set up proper image storage (AWS S3, Cloudinary, etc.)
6. Enable HTTPS
7. Add environment variables for production

