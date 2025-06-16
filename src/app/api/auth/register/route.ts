import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

async function readUsers() {
  try {
    const data = await fs.promises.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users: any[]) {
  await fs.promises.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

export async function POST(req: NextRequest) {
  const { email, password, fullName, phone, birthDate } = await req.json();

  if (!email || !password || !fullName || !birthDate) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const users = await readUsers();

  if (users.find((u: any) => u.email === email)) {
    return NextResponse.json({ error: "El email ya está registrado" }, { status: 409 });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = { email, password: hashedPassword, fullName, phone, birthDate };
  users.push(newUser);

  await writeUsers(users);

  return NextResponse.json({ message: "Registro exitoso" });
}
