import { Request, Response, Router } from "express";
import HomeVideo from "../model/Video.model";

const videoRouter = Router();

videoRouter.get("/videos/home", async (_: Request, res: Response) => {
  try {
    const users = await HomeVideo.find();
    res.json(users);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default videoRouter;
