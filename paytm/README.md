# Simple Paytm Project

This project is a simplified version of Paytm, where users can sign up, sign in, and perform money transfers securely. It incorporates various technologies and optimizations to ensure smooth functionality.

## Technologies Used

- **Node.js**: Backend server environment.
- **Express.js**: Web framework for Node.js, used for handling HTTP requests.
- **MongoDB**: Database for storing user information and transaction data.
- **JWT (JSON Web Tokens)**: Used for user authentication and storing tokens in local storage.
- **bcrypt**: Library for hashing passwords before storing them in the database.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB, used for database operations.
- **Sessions**: Optimizations implemented using Mongoose session management to ensure transaction reliability.

## Features

1. **User Authentication**:
   - Users can sign up and create accounts securely.
   - Sign in functionality using email and password.
   - JWT tokens are generated upon successful authentication and stored in local storage to maintain user sessions.

2. **Secure Password Storage**:
   - User passwords are hashed using bcrypt before storing them in the database, ensuring security against breaches.

3. **Money Transfer**:
   - Users can transfer money securely between accounts.
   - Optimizations using Mongoose sessions ensure that transactions do not get stuck midway, enhancing reliability.

## Contribution Guidelines

If you want to contribute to this project, feel free to submit pull requests with your enhancements or bug fixes. Here are the steps to set up the project locally:

