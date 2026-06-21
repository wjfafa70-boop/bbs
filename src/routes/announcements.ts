import { Router, Request, Response } from "express";
import { supabase } from "../supabaseClient";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "title and content are required" });
  }

  const { data, error } = await supabase
    .from("announcements")
    .insert({ title, content, author })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { title, content, author } = req.body;

  const { data, error } = await supabase
    .from("announcements")
    .update({ title, content, author, updated_at: new Date().toISOString() })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

export default router;
