# Coffee Discovery

A subscription-based coffee discovery platform that helps users explore unique coffees from around the world.

## About the Project

Coffee Discovery is a web application that allows users to embark on a personalized coffee journey. Each month, subscribers receive a curated selection of coffees from their chosen region, enabling them to explore new flavors and discover coffees they might love.

Users can:

- Select their preferred coffee regions.
- Receive monthly curated coffee selections.
- Try different coffees from across the world.
- Post reviews and share their experiences.
- Track and revisit their favorite discoveries.

The goal is to create a community-driven experience that celebrates coffee culture and helps users expand their palate with high-quality selections.

---

## Features

✔ Subscription-based coffee service  
✔ Regional coffee discovery  
✔ Personalized monthly deliveries  
✔ User reviews and ratings  
✔ Secure authentication  
✔ Shopping cart and checkout  
✔ Stripe payment integration  
✔ Responsive and modern UI  
✔ Admin dashboard for product management

---

## Tech Stack

### Frontend

- React
- Redux Toolkit
- Vite
- Styled Components
- React Router
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Stripe API

### Deployment

- Vercel (Frontend & Backend)

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>=18)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/coffee-discovery.git
cd coffee-discovery

Install dependencies (frontend):

cd client
npm install

Install dependencies (backend):

cd server
npm install
Environment Variables

Create a .env file in the backend directory and configure:

MONGO_URI=your_database_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CLIENT_URL=https://your-frontend-url

For the frontend:

VITE_API_URL=https://your-backend-url
Running the Project

Start the backend:

cd server
npm run dev

Start the frontend:

cd client
npm run dev

The app will be available at:

Frontend: http://localhost:5173
Backend: http://localhost:5050
Deployment

The project is deployed using Vercel.

To deploy:

Push your code to GitHub.

Create a new project in Vercel.

Connect the repository.

Add environment variables in Vercel.

Deploy.

Contribution

Contributions are welcome!

To contribute:

Fork the repository.

Create a feature branch.

Commit changes.

Open a pull request.

License

This project is licensed under the MIT License.

Contact

For questions or collaboration, reach out:

Email: your.email@example.com

GitHub: https://github.com/your-username

```
