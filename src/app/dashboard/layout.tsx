"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiLogOut,
  FiHome,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import { useUser, UserProvider } from "../context/UserContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <LayoutInner>{children}</LayoutInner>
    </UserProvider>
  );
}

function LayoutInner({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useUser();

  // Cerrar el menú de usuario si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const userName = user?.fullName || user?.email || "Usuario";

  return (
    <div className="flex h-screen bg-[#f5f7ff]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white w-20 flex flex-col items-center
        border-r border-gray-200 transition-transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static z-30`}
      >
        <div className="h-16 flex items-center justify-center w-full text-blue-600 text-3xl font-extrabold cursor-pointer select-none">
          E
        </div>

        <nav className="flex flex-col mt-8 space-y-6">
          <a
            href="/dashboard"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition text-xs font-semibold"
            title="Dashboard"
          >
            <FiHome size={20} />
            <span className="mt-1">Inicio</span>
          </a>
          <a
            href="/dashboard/reports"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition text-xs font-semibold"
            title="Informes"
          >
            <FiBarChart2 size={20} />
            <span className="mt-1">Informes</span>
          </a>
          <a
            href="/dashboard/settings"
            className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition text-xs font-semibold"
            title="Ajustes"
          >
            <FiSettings size={20} />
            <span className="mt-1">Ajustes</span>
          </a>
        </nav>

        <div className="flex-grow" />

        <button
          onClick={logout}
          className="mb-6 text-gray-600 hover:text-red-600 transition"
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
          type="button"
        >
          <FiLogOut size={24} />
        </button>
      </aside>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 min-h-screen md:pl-20">
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none "
            aria-label="Abrir menú lateral"
          >
            <FiMenu size={28} />
          </button>

          <h1
            className="text-xl font-bold text-blue-600 hidden md:block cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            Ecomalyze
          </h1>

          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-gray-700 font-semibold focus:outline-none flex items-center gap-2 cursor-pointer"
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
              aria-controls="user-menu"
              type="button"
            >
              Bienvenido, {userName}
              <svg
                className={`w-4 h-4 transition-transform ${
                  userMenuOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {userMenuOpen && (
              <ul
                id="user-menu"
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg py-1 text-gray-700 text-sm"
                role="menu"
                aria-label="Opciones de usuario"
              >
                <li role="none">
                  <button
                    role="menuitem"
                    onClick={() => alert("Perfil")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    type="button"
                  >
                    Perfil
                  </button>
                </li>
                <li role="none">
                  <button
                    role="menuitem"
                    onClick={() => alert("Configuración")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    type="button"
                  >
                    Configuración
                  </button>
                </li>
                <li role="none">
                  <button
                    role="menuitem"
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                    type="button"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
