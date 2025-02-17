# Car Store API

A robust backend API for managing cars and orders, built with **Node.js**, **Express.js**, **Mongoose**, and **TypeScript**, with data validation using **Zod**. The API supports CRUD operations for cars and features an order management system, including total revenue calculation.

## Prerequisites

Ensure you have the following installed before setting up the project:

- **Node.js** (v16 or higher)
- **npm** or **Yarn**
- **MongoDB** (running locally or using a connection URI)

## Installation

Follow these steps to set up the project:

1. Clone the GitHub repository:
   ```bash
   git clone https://github.com/sheabali/car-store-backend.git
   cd car-store-backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the required environment variables (e.g., `MONGO_URI`, `JWT_SECRET`).

4. Start the development server:
   ```bash
   npm run start:dev
   ```

## Features

### User Registration & Authentication (Role-Based)

- **Secure Registration & Login**:
  - Users can register with a **name, email, and password**.
  - Default role: **user** (admin role must be manually assigned).
  - Passwords are **securely hashed** before storing.
  - Users can log in using their **email and password**.
- **JWT Authentication**:
  - Generate a **JWT token** upon login.
  - Store the token in **local storage** to maintain user sessions.
- **Logout**:
  - Clears the token from local storage upon logout.
  - Redirects the user to the login page.

### Car Management

- **Create a Car**: Add a new car to the database.
- **Get All Cars**: Retrieve all cars from the database.
- **Get Car by ID**: Retrieve details of a specific car.
- **Update Car by ID**: Modify car details.
- **Delete Car by ID**: Remove a car from the database.

### Order Management

- **Create an Order**: Users can place orders for cars.
- **Stock Check**: Ensures the ordered quantity does not exceed available stock.
- **Total Revenue Calculation**: Compute total revenue from all orders.

### Public Routes

- **Home Page**:
  - Navbar with logo, navigation, and login/signup buttons.
  - Banner for promotions (carousel supported).
  - Featured Products (displays up to 6 products with a "View All" option).
  - Extra section for testimonials or blog posts.
  - Footer with essential links and contact details.
- **All Products Page**:
  - **Search Functionality**: Search by brand, car name, or category.
  - **Filters**: Filter by price range, model, brand, category, and availability.
  - **Dynamic Results**: Updates based on search terms and filters.
  - **Product Cards**: Display name, brand, model, price, and category.
  - **View Details** button for each product.
- **Product Details Page**:
  - Displays car image and detailed information.
  - "Buy Now" button redirects to the checkout page.
- **About Page**:
  - Information about the store, mission, and relevant details.

### Private Routes

- **Checkout Page**:
  - Users can place orders for cars.
  - Order form includes product details, user details, total price calculation, and payment method.
  - **SurjoPay Integration** for secure payments.
  - "Order Now" button confirms the purchase.
- **Dashboard (Role-Based Access)**:
  - **Admin Dashboard**:
    - Manage users (deactivate accounts, etc.).
    - Manage products (CRUD operations).
    - Manage orders (CRUD operations).
  - **User Dashboard**:
    - View order history.
    - Update profile settings.
    - Change password (requires current password for security).

## Technologies Used

- **Node.js** - JavaScript runtime environment.
- **Express.js** - Web framework for building the API.
- **Mongoose** - MongoDB object modeling tool.
- **TypeScript** - Ensures type safety and better development experience.
- **Zod** - Schema validation for API requests.
- **JWT** - Secure authentication mechanism.
- **SurjoPay** - Integrated payment gateway.

## API Endpoints

### Car Endpoints

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| POST   | `/api/cars`     | Create a new car   |
| GET    | `/api/cars`     | Get all cars       |
| GET    | `/api/cars/:id` | Get a car by ID    |
| PUT    | `/api/cars/:id` | Update a car by ID |
| DELETE | `/api/cars/:id` | Delete a car by ID |

### Order Endpoints

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `/api/orders`         | Create a new order            |
| GET    | `/api/orders/revenue` | Get total revenue from orders |

## Run the Project

To start the development server, run:

```bash
npm run start:dev
```
