import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import User from "./model/User.model";
import { connect } from "mongoose";

const app = express();
const PORT = 8080;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["https://bq-client-five.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins?.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Home route
app.get("/", async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/add", async (_: Request, res: Response) => {
  try {
    const user = new User({
      firstName: "Nageshwar",
      lastName: "Pawar",
    });
    const result = await user.save();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Start the server
app.listen(PORT, async () => {
  try {
    try {
      await connect(
        "mongodb+srv://nageshpawarpatil:Test@test.kydiaee.mongodb.net/?retryWrites=true&w=majority&appName=Test"
      );

      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }

    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error: any) {
    console.error(`${error.message} - Server is not running`);
    process.exit(1);
  }
});
