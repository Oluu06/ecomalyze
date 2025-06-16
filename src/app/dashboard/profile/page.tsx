"use client";

import React, { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function ProfilePage() {
  const { user, setUser } = useUser();

  if (!user) {
    return <p className="text-black">No estás autenticado.</p>;
  }

  const [fullName, setFullName] = useState(user!.fullName || "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSave() {
    if (fullName.trim() === "") {
      setError("El nombre completo no puede estar vacío.");
      return;
    }

    setError("");
    setIsSaving(true);

    setTimeout(() => {
      setUser({
        email: user!.email,
        fullName,
      });
      setMessage("Perfil actualizado correctamente.");
      setIsSaving(false);

      setTimeout(() => setMessage(""), 3000);
    }, 1000);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow text-black">
      <h1 className="text-2xl font-semibold mb-4">Perfil</h1>

      <div className="mb-4">
        <label className="block text-black font-medium mb-1">Email</label>
        <input
          type="email"
          value={user!.email}
          disabled
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fullName" className="block text-black font-medium mb-1">
          Nombre completo
        </label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={`w-full border rounded px-3 py-2 text-black ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={!!error}
          aria-describedby="fullName-error"
        />
        {error && (
          <p id="fullName-error" className="mt-1 text-red-600 text-sm">
            {error}
          </p>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {isSaving ? "Guardando..." : "Guardar cambios"}
      </button>

      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
