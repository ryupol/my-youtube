import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";

import connectDB from "./connect.js";
import userRouter from "./api/routes/users.routes.js";
import videoRouter from "./api/routes/videos.routes.js";
import subscribeRouter from "./api/routes/subscribe.routes.js";
import ratingRouter from "./api/routes/rating.routes.js";
import commentRouter from "./api/routes/comments.routes.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
connectDB(process.env.MONGODB_URL);

const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

store.on("error", function (error) {
  console.error("Session store error:", error);
});

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Server" });
});

app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/comments", commentRouter);
app.use("/images/thumbnail", express.static("assets/images/thumbnail"));
app.use("/images/profile", express.static("assets/images/profile"));

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
