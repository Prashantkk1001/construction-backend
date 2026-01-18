# RK Constructions Backend

This is the backend API for the RK Constructions project, built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- Project management
- Service management
- Contact form handling
- File uploads with Cloudinary

## Installation

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with the required environment variables
4. Run `npm run dev` for development

## Environment Variables

- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT secret key
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## API Endpoints

- `/api/auth`: Authentication routes
- `/api/projects`: Project management
- `/api/services`: Service management
- `/api/contacts`: Contact form

## License

ISC
