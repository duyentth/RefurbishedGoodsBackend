import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import notificationRouter from "./routes/notification.route.js";
import productRouter from "./routes/product.route.js";
import bidRouter from "./routes/bid.route.js";
import paymentRouter from "./routes/payment.route.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/products", productRouter);
app.use("/api/bids", bidRouter);
app.use("/api/payments", paymentRouter);

//error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).send("Server Error: ", error);
    } else {
        next();
    }
});

app.use((req, res) => {
    res.status(501).send("API is not supported.");
});

export default app;
