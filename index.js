import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { dayRateLimiter, speedLimiter } from './middlewares/rateLimit.js';

const app = express();
const PORT = process.env.PORT || 5000
// loads environment variables from a .env file into process.env
dotenv.config()

// setup middlewares
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// allow cross origin resource sharing and restrict to a white list of Ip addresses
const allowedOrigins = ['https://jacksgardenadmin.netlify.app', 'http://localhost:3002', 'http://localhost:3001', '172.30.211.54']
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use("/images", express.static("images"))

//rate limiter
app.use('/api/', dayRateLimiter)
app.use('/api/', speedLimiter)
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/checkout", stripeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploadfiles", uploadRoutes);

app.get('/api', (req, res) => {
  res.send("Welcome to Jack's Garden API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});