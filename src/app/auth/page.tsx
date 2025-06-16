"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { registerUser, loginUser } from "../services/auth";

export default function AuthPage() {
  const router = useRouter();
  const { login } = useUser();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      if (!email || !password) {
        setMessage("Por favor, completa email y contraseña.");
        return;
      }
      try {
        const data = await loginUser(email, password);
        localStorage.setItem("token", data.token);
        login(data.user);
        router.push("/dashboard");
      } catch (error: any) {
        setMessage(error.message);
      }
    } else {
      if (!fullName || !email || !password || !confirmPassword || !birthDate) {
        setMessage("Por favor, completa todos los campos obligatorios.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Las contraseñas no coinciden.");
        return;
      }

      try {
        await registerUser({ email, password, fullName, phone, birthDate });
        setMessage("Registro exitoso, ya puedes iniciar sesión.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullName("");
        setPhone("");
        setBirthDate("");
      } catch (error: any) {
        setMessage(error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f7ff] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-black">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
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

          {!isLogin && (
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
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}

        <p className="mt-6 text-center text-black">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
}
