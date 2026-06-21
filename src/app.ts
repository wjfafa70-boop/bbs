import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import announcementsRouter from "./routes/announcements";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api/announcements", announcementsRouter);

export default app;
