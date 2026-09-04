# Rivera Long Exam 1 - CTADWEBL

## Bulldogs Exchange

Bulldogs Exchange is a web application where customers can browse products, add items to cart, place orders, write reviews, and manage their profile.

The project has two main folders:

- `rivera-client` - for the frontend
- `rivera-server` - for the backend

## Client and Server Integration

The client is made with React and the server is made with Node.js and Express.

The frontend sends requests to the backend using REST API.

The main API URL used is:

`http://localhost:8000/api/v1`

The server receives the request, connects to MongoDB using Mongoose, and sends the data back to the frontend.

JWT is used for login and protected routes.

## Client Packages Used

The client uses:

- React
- React DOM
- React Router DOM
- Tailwind CSS
- Vite
- ESLint

## Client Design Pattern

The client uses a component-based structure.

Main folders:

- `components` - reusable parts like navbar, buttons, and product cards
- `pages` - different pages of the website
- `services` - API requests
- `layouts` - shared layouts
- `utils` - helper files

## Server Packages Used

The server uses:

- Express
- Mongoose
- JSON Web Token
- bcryptjs
- CORS
- dotenv
- nodemon

## Server Design Pattern

The server uses an MVC-style structure.

Main folders:

- `models` - database models
- `controllers` - main functions and logic
- `routes` - API routes
- `middleware` - authentication and authorization
- `config` - database and server settings

## Main Features

### Customer

- Register
- Login and logout
- Search products
- Filter products by category
- View product details
- Add and remove products from cart
- Place orders
- View order status
- Create and view reviews
- View and edit profile
- Change password

### Admin

- Login
- View admin dashboard
- Create, view, and edit products
- Confirm orders
- Set orders as Ready for Claiming
- View and edit reviews
- View and edit users
- Activate and deactivate users

## Project Structure

Rivera-LongExam/
- README.md
- rivera-client/
  - src/
    - assets/
    - components/
    - layouts/
    - pages/
    - services/
    - utils/
  - package.json
- rivera-server/
  - config/
  - controllers/
  - middleware/
  - models/
  - routes/
  - index.js
  - package.json

## How to Run

### Server

1. Open the server folder

`cd rivera-server`

2. Install packages

`npm install`

3. Run the server

`npm run dev`

### Client

1. Open another terminal and go to the client folder

`cd rivera-client`

2. Install packages

`npm install`

3. Run the client

`npm run dev`

## Security

The project uses:

- Password hashing with bcryptjs
- JWT authentication
- Protected routes
- Role-based access for customer and admin
- `.env` for private information

## Author

Rivera  
Advanced Web Programming  
Long Exam 1 - CTADWEBL