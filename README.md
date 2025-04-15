# DopaxServer

DopaxServer is a Node.js-based server application for user authentication and profile management. It uses Express.js for routing, MongoDB for database storage, and JWT for secure authentication.

## Features
- User sign-up and login with validation.
- JWT-based authentication for protected routes.
- MongoDB integration using Mongoose.
- Middleware for route protection.

## Project Structure
```
.
├── config/          # Database configuration
├── controller/      # Controllers for handling business logic
├── helper/          # Helper functions
├── middleware/      # Middleware for authentication
├── model/           # Mongoose models
├── routes/          # API routes
├── .env             # Environment variables
├── server.js        # Entry point of the application
```

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the following:
   ```
   MONGO_URI=mongodb://localhost:27017/DopaxDetox
   PORT=5000
   JWT_SECRET=<your-secret-key>
   ```

## Usage
1. Start the server:
   ```bash
   npm start
   ```
2. Access the API at `http://localhost:5000`.

## API Endpoints
- **POST** `/api/users/signup`: User sign-up.
- **POST** `/api/users/login`: User login.
- **GET** `/api/users/profile`: Fetch user profile (protected).

## Dependencies
- `express`
- `mongoose`
- `jsonwebtoken`
- `bcryptjs`
- `dotenv`

## License
This project is licensed under the ISC License.