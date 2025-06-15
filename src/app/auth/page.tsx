"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState<
    { email: string; password: string; fullName: string; phone?: string; birthDate: string }[]
  >([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (!email || !password) {
        setMessage("Por favor, completa email y contraseña.");
        return;
      }

      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        setMessage("Inicio de sesión exitoso.");
        localStorage.setItem("loggedUser", JSON.stringify(user));
        setUser(user);
        router.push("/dashboard");
      } else {
        setMessage("Credenciales incorrectas.");
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

      if (users.some((u) => u.email === email)) {
        setMessage("El email ya está registrado.");
        return;
      }

      const newUser = { email, password, fullName, phone, birthDate };
      setUsers([...users, newUser]);
      setMessage("Registro exitoso, ya puedes iniciar sesión.");
      setIsLogin(true);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      setPhone("");
      setBirthDate("");
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
        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full text-center bg-gray-200 text-black px-4 py-2 rounded-xl hover:bg-gray-300 transition font-semibold cursor-pointer"
          >
          Volver al inicio
          </button>

      </div>
    </div>
  );
}
