import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import notificationRouter from "./routes/notification.route.js";
import productRouter from "./routes/product.route.js";
import bidRouter from "./routes/bid.route.js";
import paymentRouter from "./routes/payment.route.js";
import job from "./cron.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://refurbished-goods-marketplace-app.onrender.com",
    ],
  })
);

app.use("/api/auth", authRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/products", productRouter);
app.use("/api/bids", bidRouter);
app.use("/api/payments", paymentRouter);

//starting the job sending GET request to server for every 14 minutes to make the server always active on Render.com
job.start();

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
