"use client";

import Link from "next/link";
import React, { ReactNode, useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiLogOut,
  FiHome,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiClipboard,
} from "react-icons/fi";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <LayoutInner>{children}</LayoutInner>;
}

function LayoutInner({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useUser();
  const router = useRouter();

  // Redirigir a login si no hay usuario
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return null; // No mostrar nada hasta que el user esté definido

  const userName = user.fullName || user.email || "Usuario";

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

  return (
    <div className="flex h-screen bg-[#f5f7ff]">
      {/* Sidebar visible solo si hay usuario */}
      {user && (
        <aside
          className={`fixed inset-y-0 left-0 bg-white w-20 flex flex-col items-center
          border-r border-gray-200 transition-transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static z-30`}
        >
          <Link
            href="/"
            className="h-16 flex items-center justify-center w-full text-blue-600 text-3xl font-extrabold cursor-pointer select-none"
          >
            E
          </Link>

          <nav className="flex flex-col mt-8 space-y-6">
            <Link
              href="/dashboard"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition text-xs font-semibold"
              title="Inicio"
            >
              <FiHome size={20} />
              <span className="mt-1">Inicio</span>
            </Link>

            <Link
              href="/dashboard/reports"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition text-xs font-semibold"
              title="Informes"
            >
              <FiBarChart2 size={20} />
              <span className="mt-1">Informes</span>
            </Link>

            <Link
              href="/dashboard/plan"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition text-xs font-semibold"
              title="Plan"
            >
              <FiClipboard size={20} />
              <span className="mt-1">Plan</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition text-xs font-semibold"
              title="Ajustes"
            >
              <FiSettings size={20} />
              <span className="mt-1">Ajustes</span>
            </Link>
          </nav>

          <div className="flex-grow" />

          <button
            onClick={handleLogout}
            className="mb-6 text-gray-600 hover:text-red-600 transition"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            type="button"
          >
            <FiLogOut size={24} />
          </button>
        </aside>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 min-h-screen md:pl-20">
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 sticky top-0 z-20">
          {/* Botón menú (solo móvil) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
            aria-label="Abrir menú lateral"
          >
            <FiMenu size={28} />
          </button>

          {/* Título centrado */}
          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-semibold text-gray-800">Panel de control</h1>
          </div>

          {/* Usuario */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-gray-700 font-medium focus:outline-none flex items-center gap-1 cursor-pointer hover:text-blue-600 transition"
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
              aria-controls="user-menu"
              type="button"
              style={{ outline: "none" }}
            >
              <FiUser size={20} />
              <span>{userName}</span>
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
                className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-lg py-1 text-gray-700 text-sm"
                role="menu"
                aria-label="Opciones de usuario"
              >
                <li role="none">
                  <button
                    role="menuitem"
                    onClick={() => {
                      router.push("/dashboard/profile");
                      setUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    type="button"
                  >
                    Perfil
                  </button>
                </li>
                <li role="none">
                  <button
                    role="menuitem"
                    onClick={handleLogout}
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
