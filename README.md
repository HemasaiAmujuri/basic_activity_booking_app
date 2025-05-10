Basic Activity Booking App – Backend API
This is a Node.js REST API developed as part of the Backend Developer Internship Assignment for MeetX. It allows users to register, log in, view available activities, book them, and check their bookings securely using JWT authentication.

Features Implemented
User APIs
Register: User can register using name, email, phone number, and password.

Passwords are securely hashed using bcrypt.

Login: Authenticates user and returns a JWT token for protected routes.

Activity APIs
List Activities: Public endpoint to get all available activities (e.g., cricket, movies).

Each activity includes title, description, location, date, and time.

Booking APIs
Book an Activity: Authenticated users can book an activity using its ID.

Get My Bookings: Authenticated users can fetch all their bookings.

Authentication
JWT-based token is returned upon login.

A middleware checks for valid tokens to protect booking endpoints.

Tech Stack
Backend: Node.js + Express.js

Database: MongoDB (via Mongoose)

Authentication: JWT

Password Security: bcrypt

API Testing: Postman

