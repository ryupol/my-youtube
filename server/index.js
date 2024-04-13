import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

import connectDB from "./data/connect.js";
import userRouter from "./api/routes/users.routes.js";
import videoRouter from "./api/routes/videos.routes.js";
import popRouter from "./api/routes/popularity.routes.js";
import actionRouter from "./api/routes/userActions.routes.js";
import commentRouter from "./api/routes/comments.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
connectDB(process.env.MONGODB_URL);

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Server" });
});

app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/popular", popRouter);
app.use("/api/actions", actionRouter);
app.use("/api/comments", commentRouter);
app.use("/images/thumbnail", express.static("assets/images/thumbnail"));
app.use("/images/profile", express.static("assets/images/profile"));

app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});
