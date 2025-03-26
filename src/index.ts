import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import connectDB from "./configs/db.config";
import videoRouter from "./routes/home.routes";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
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

// Routes with DB connection middleware
app.use(async (_: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// app.get("/", async (_: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     console.error("Database query error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/add", async (_: Request, res: Response) => {
//   try {
//     const user = new User({
//       firstName: "Nageshwar",
//       lastName: "Pawar",
//     });
//     const result = await user.save();
//     res.json(result);
//   } catch (error) {
//     console.error("User creation error:", error);
//     res.status(500).json(error);
//   }
// });

app.use("/api/media", videoRouter);

// Start server only if not in Vercel environment
if (process.env.NODE_ENV === "development") {
  app.listen(PORT, async () => {
    try {
      await connectDB();
      console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
      console.error("Server startup failed:", error);
      process.exit(1);
    }
  });
}

export default app;
