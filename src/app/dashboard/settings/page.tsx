"use client";

import React, { useState } from "react";

export default function SettingsPage() {
  // Estados para los ajustes
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleSave = () => {
    // Aquí iría la lógica para guardar cambios (API o localStorage)
    alert("Cambios guardados correctamente");
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md min-h-screen text-black">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Ajustes</h1>

      {/* Cambiar contraseña */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Cambiar contraseña</h2>
        <div className="space-y-4 max-w-md">
          <input
            type="password"
            placeholder="Contraseña actual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Preferencias */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Preferencias</h2>
        <div className="flex items-center space-x-4 max-w-md">
          <label className="font-medium text-black">Tema:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Notificaciones</h2>
        <div className="space-y-4 max-w-md text-black">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() => setEmailNotifications(!emailNotifications)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Email</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={() => setPushNotifications(!pushNotifications)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Push Notifications</span>
          </label>
        </div>
      </div>

      {/* Seguridad */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Seguridad</h2>
        <label className="flex items-center space-x-3 max-w-md text-black">
          <input
            type="checkbox"
            checked={twoFactorAuth}
            onChange={() => setTwoFactorAuth(!twoFactorAuth)}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Activar Autenticación de Dos Factores (2FA)</span>
        </label>
      </div>

      {/* Botón Guardar */}
      <div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Guardar cambios
        </button>
      </div>
    </section>
  );
}
