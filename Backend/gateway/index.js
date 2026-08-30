import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import proxy from 'express-http-proxy';

dotenv.config();

const app = express();

// Set the port for the gateway service
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proxy requests to the auth service
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL || 'http://localhost:8001'));

// Define a simple route for the gateway service
app.get('/', (req, res) => {
  res.send('Hello from the backend gateway!');
});

// Start the gateway service
app.listen(PORT, () => {
  console.log(`Backend gateway is running on http://localhost:${PORT}`);
});