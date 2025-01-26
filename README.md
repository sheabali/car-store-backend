# Car Store API

A robust backend API for managing cars and orders, built with **Node.js**, **Express.js**, **Mongoose**, **TypeScript**, and validated using **Zod**. The API supports CRUD operations for cars and features an order management system, including total revenue calculation.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (Node Package Manager)
- **MongoDB** (Ensure MongoDB is running locally or provide a connection URI)

---

## Installation

Follow these steps to set up the project:

1. Clone the GitHub repository:

   ```bash
   git clone https://github.com/sheabali/car-store.git
   cd car-store
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

---

## Features

### Car Management

- **Create a Car**: Add a new car to the database.
- **Get All Cars**: Retrieve all cars from the database.
- **Get Car by ID**: Retrieve a specific car by its unique identifier.
- **Update Car by ID**: Update details of a specific car.
- **Delete Car by ID**: Remove a specific car from the database.

### Order Management

- **Create an Order**: Place an order for one or more cars.
- **Calculate Total Revenue**: Compute the total revenue generated from all orders.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **Mongoose**: MongoDB object modeling tool.
- **TypeScript**: Type safety.
- **Zod**: Data validation.

---

## API Endpoints

### Car Endpoints

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/api/cars`        | Create a new car   |
| GET    | `/api/cars`        | Get all cars       |
| GET    | `/api/cars/:carId` | Get a car by ID    |
| PUT    | `/api/cars/:carId` | Update a car by ID |
| DELETE | `/api/cars/:carId` | Delete a car by ID |

### Order Endpoints

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| POST   | `/api/orders`         | Create a new order            |
| GET    | `/api/orders/revenue` | Get total revenue from orders |

---

## Run the project

- **Start Development Server**:
  ```bash
  npm run start:dev
  ```
# car-store-backend
