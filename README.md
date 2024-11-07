# Project_Build_APIs_With_Node

# ShoppyGlobe API

ShoppyGlobe API offering various endpoints for user registration, login, product listings, and cart management. It is built using Node.js and Express, with MongoDB as the database.

## Technologies used

- Node.js
- Express
- MongoDB
- Mongoose

## Installation and Setup Instructions

To run this application on your local machine, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/shreyajha10/Project_Build_APIs_With_Node



2. **Navigate to the Project Directory:**
   ```bash
   cd BackendForShoppyGlobe


3. **Install Dependencies**
   ```bash
   npm install express mongoose jsonwebtoken dotenv

4. **Start The Server**
   ```bash
   npm start

5. **Create .env file in root**
    ```bash
    JWT_SECRET=jhajkkkkki123@ 
    MONGODB_URI=mongodb://localhost:27017/shoppy_db



## API Endpoints
   **Authentication**
   - Post/register 
    - Body: { "username": "testuser", "password": "testpassword" }
   - Post/login
     - Body: { "username": "testuser", "password": "testpassword" }

     **Products**
     - Get/products
     - Get/products/productId

     **Cart**
     - Post/cart
      - Body: { "productId": "PRODUCT_ID", "quantity": 1 }
     - Get/cart
     - Put/cart/productId
       - Body:{"quantity":2}
     - Delete/cart
