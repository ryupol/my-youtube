import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/users.routes.js";
import videoRouter from "./routes/videos.routes.js";
import popRouter from "./routes/popularity.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Server" });
});

app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/popular", popRouter);
app.use("/images", express.static("assets/images")); // http://localhost:3000/images/defaultProfile.png

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(3000, () =>
      console.log("Server started on port http://localhost:3000")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
