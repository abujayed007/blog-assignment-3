# Blog API

A powerful RESTful API for a blog platform that allows user authentication, blog management, and admin functionalities. The system supports role-based access control (RBAC) with `admin` and `user` roles, ensuring secure access to sensitive operations.

## Live URL

[**Live Demo**](https://blog-assignment-3-ten.vercel.app/)

## Features

- **User Registration & Login**: Allows users to register, authenticate, and manage their accounts with JWT-based authentication.
- **Blog Management**:
  - Users can create, update, and delete their own blogs.
  - Admins have full control over the blogs, including the ability to delete any blog.
  - Public API available for fetching blogs with search, filtering, and sorting options.
- **Role-Based Access Control**: Differentiates between `admin` and `user` roles to provide appropriate access.
- **User Blocking**: Admins can block users, preventing them from accessing the platform.
- **Data Validation**: Secure data handling using Zod for schema validation.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Zod (for schema validation)
- **Environment Variables**: dotenv
- **API Documentation**: Postman
- **Error Handling**: Custom error handling and status codes

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Postman or any API testing tool

### Clone the repository

```bash
git clone https://github.com/abujayed007/blog-assignment-3
cd blog-assignment-3
```
