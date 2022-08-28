import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/usersRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import cartsRoutes from "./routes/cartRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cookiesRoutes from "./routes/cookiesRoutes.js";
import { dayRateLimiter, speedLimiter } from "./middlewares/rateLimit.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// loads environment variables from a .env file into process.env
dotenv.config();

// setup middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());

// allow cross origin resource sharing and restrict to a white list of Ip addresses
const allowedOrigins = [
    "https://jacksgarden.netlify.app",
    "https://jacksgardenadmin.netlify.app",
    "http://localhost:3001",
    "https://jacksgardentest.netlify.app",
    "https://jacksgardenadmintest.netlify.app/"
];
const corsOptions = {
    credentials: true,
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/images", express.static("images"));
//rate limiter
app.use("/api/", dayRateLimiter);
app.use("/api/", speedLimiter);

app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/checkout", stripeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploadfiles", uploadRoutes);
app.use("/api/cookies", cookiesRoutes);

app.get("/api", (req, res) => {
    res.send("Welcome to Jack's Garden API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
