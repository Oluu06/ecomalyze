"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f5f7ff] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 relative">
        {/* Botón Volver a inicio */}
        <button
          onClick={() => router.push("/")}
          className="absolute top-6 right-6 text-blue-600 hover:text-blue-700 font-semibold focus:outline-none"
          aria-label="Volver a inicio"
        >
          ← Inicio
        </button>

        {/* Tabs */}
        <div className="flex mb-10 rounded-2xl bg-gray-100 text-gray-600 font-semibold text-lg">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-3 rounded-2xl transition-colors ${
              !isRegister
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-gray-200"
            }`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-3 rounded-2xl transition-colors ${
              isRegister
                ? "bg-white text-blue-600 shadow-md"
                : "hover:bg-gray-200"
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form */}
        {isRegister ? (
          <form className="space-y-8">
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
              autoComplete="name"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
              minLength={6}
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
              minLength={6}
              autoComplete="new-password"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl py-3 shadow-md transition"
            >
              Crear cuenta
            </button>
          </form>
        ) : (
          <form className="space-y-8">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              required
              autoComplete="current-password"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl py-3 shadow-md transition"
            >
              Iniciar sesión
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
