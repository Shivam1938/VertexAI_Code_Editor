import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './config/db.js';

// routes imports
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8001;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes

app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the backend auth service!');
});

app.listen(PORT, () => {
  connectDB(); // Call the connectDB function to establish a connection to MongoDB
  console.log(`Backend auth service is running on http://localhost:${PORT}`);
});
