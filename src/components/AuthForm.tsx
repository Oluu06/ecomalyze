"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export type RegisterData = {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  birthDate?: string;
  confirmPassword?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: RegisterData | LoginData) => Promise<void>;
  message?: string;
}

export default function AuthForm({ mode, onSubmit, message }: AuthFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localMessage, setLocalMessage] = useState(message || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalMessage("");
    try {
      if (mode === "login") {
        if (!email || !password) {
          setLocalMessage("Por favor, completa email y contraseña.");
          return;
        }
        await onSubmit({ email, password });
      } else {
        if (!fullName || !email || !password || !confirmPassword || !birthDate) {
          setLocalMessage("Por favor, completa todos los campos obligatorios.");
          return;
        }
        if (password !== confirmPassword) {
          setLocalMessage("Las contraseñas no coinciden.");
          return;
        }
        await onSubmit({ email, password, fullName, phone, birthDate, confirmPassword });
      }
    } catch (error: any) {
      setLocalMessage(error.message || "Ocurrió un error.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f7ff] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-black slide-in-right">
        <h2 className="text-3xl font-bold text-center mb-6">
          {mode === "login" ? "Iniciar sesión" : "Registrarse"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "register" && (
            <>
              <input
                type="text"
                placeholder="Nombre completo"
                className="border border-gray-300 rounded px-4 py-2 text-black"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Teléfono (opcional)"
                className="border border-gray-300 rounded px-4 py-2 text-black"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="date"
                placeholder="Fecha de nacimiento"
                className="border border-gray-300 rounded px-4 py-2 text-black"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Correo electrónico"
            className="border border-gray-300 rounded px-4 py-2 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="border border-gray-300 rounded px-4 py-2 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {mode === "register" && (
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="border border-gray-300 rounded px-4 py-2 text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-semibold cursor-pointer"
          >
            {mode === "login" ? "Entrar" : "Registrarse"}
          </button>
        </form>

        {localMessage && <p className="mt-4 text-center text-red-600">{localMessage}</p>}

        {mode === "login" && (
          <>
            <button
              onClick={() => router.push("/auth/register")}
              className="mt-6 w-full text-center text-blue-600 hover:underline font-semibold"
            >
              ¿No tienes cuenta? Regístrate aquí
            </button>

            <button
              onClick={() => router.push("/")}
              className="mt-4 w-full text-center text-gray-600 hover:underline font-semibold"
            >
              Volver a la página principal
            </button>
          </>
        )}

        {mode === "register" && (
          <>
            <button
              onClick={() => router.push("/auth/login")}
              className="mt-6 w-full text-center text-blue-600 hover:underline font-semibold"
            >
              ¿Ya tienes cuenta? Inicia sesión aquí
            </button>

            <button
              onClick={() => router.push("/")}
              className="mt-4 w-full text-center text-gray-600 hover:underline font-semibold"
            >
              Volver a la página principal
            </button>
          </>
        )}
      </div>
    </div>
  );
}
