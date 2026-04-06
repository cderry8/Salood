# Salood Backend API

## Setup Instructions
shyaka randy
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/salood
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:5173
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your system (default: mongodb://localhost:27017)

4. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)
- `POST /api/auth/logout` - Logout user

### Catalog
- `GET /api/categories` - List categories with service counts
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin, only when empty)
- `GET /api/services` - List services (supports `?category=<slug>`)
- `GET /api/services/:id` - Get a single service
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### User Registration Request Body
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### User Login Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Response Format
All responses follow this format:
```json
{
  "success": true,
  "message": "Success message",
  "data": {
    // response data
  }
}
```

## Authentication
Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## User Roles
- `user` - Regular user
- `admin` - Admin user with elevated privileges

## Database Schema
Users collection includes:
- firstName, lastName, email, password (hashed)
- phone, role (user/admin), isActive
- timestamps (createdAt, updatedAt)
