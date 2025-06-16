import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const usersFilePath = path.join(process.cwd(), "data", "users.json");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

async function readUsers() {
  try {
    const data = await fs.promises.readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Faltan email o contraseña" }, { status: 400 });
  }

  const users = await readUsers();
  const user = users.find((u: any) => u.email === email);

  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = jwt.sign(
    {
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      birthDate: user.birthDate,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return NextResponse.json({ message: "Login exitoso", token, user: { email: user.email, fullName: user.fullName, phone: user.phone, birthDate: user.birthDate } });
}
