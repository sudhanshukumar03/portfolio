import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Build-time content loader. Reads markdown from src/content (mirror of the
// portfolio docs repo) and returns typed data. No client fetching — all static.
// See portfolio/docs/ARCHITECTURE.md
const CONTENT_DIR = path.join(process.cwd(), "src", "content");

export type ParsedDoc<T = Record<string, unknown>> = {
  data: T;
  body: string;
};

export function loadDoc<T = Record<string, unknown>>(relativePath: string): ParsedDoc<T> {
  const full = path.join(CONTENT_DIR, relativePath);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  return { data: data as T, body: content };
}
