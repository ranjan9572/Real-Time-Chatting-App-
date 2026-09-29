import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.resolve(__dirname, "../../data/messages.json");

async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

async function readMessages() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf8");
  return JSON.parse(raw || "[]");
}

async function writeMessages(messages) {
  await fs.writeFile(dataFile, JSON.stringify(messages, null, 2), "utf8");
}

export async function getMessages(limit = 100) {
  const messages = await readMessages();
  return messages.slice(-limit);
}

export async function createMessage({ username, text }) {
  const messages = await readMessages();

  const message = {
    id: randomUUID(),
    username: username.trim(),
    text: text.trim(),
    createdAt: new Date().toISOString()
  };

  messages.push(message);
  await writeMessages(messages);

  return message;
}
