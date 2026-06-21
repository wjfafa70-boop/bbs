import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import announcementsRouter from "./routes/announcements";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api/announcements", announcementsRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
