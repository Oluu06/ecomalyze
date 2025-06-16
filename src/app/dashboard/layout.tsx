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
  FiPlus,
  FiChevronDown,
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
  const { user, logout, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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

  if (loading) return <div>Cargando...</div>;
  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const userName = user.fullName || user.email || "Usuario";

  // Obtener inicial para avatar si no hay imagen
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen bg-gray-50">
      {user && (
        <aside
          className={`fixed inset-y-0 left-0 bg-white w-20 flex flex-col items-center
          border-r border-gray-200 transition-transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static z-30`}
        >
          <Link
            href="/"
            className="h-16 flex items-center justify-center w-full text-indigo-600 text-3xl font-extrabold cursor-pointer select-none"
          >
            E
          </Link>

          <nav className="flex flex-col mt-8 space-y-6">
            <Link
              href="/dashboard"
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 transition text-xs font-semibold"
              title="Inicio"
            >
              <FiHome size={20} />
              <span className="mt-1">Inicio</span>
            </Link>

            <Link
              href="/dashboard/reports"
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 transition text-xs font-semibold"
              title="Informes"
            >
              <FiBarChart2 size={20} />
              <span className="mt-1">Informes</span>
            </Link>

            <Link
              href="/dashboard/plan"
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 transition text-xs font-semibold"
              title="Plan"
            >
              <FiClipboard size={20} />
              <span className="mt-1">Plan</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex flex-col items-center text-gray-600 hover:text-indigo-600 transition text-xs font-semibold"
              title="Ajustes"
            >
              <FiSettings size={20} />
              <span className="mt-1">Ajustes</span>
            </Link>
          </nav>

          <button
            onClick={() => router.push("/audit")}
            className="mt-8 flex flex-col items-center text-indigo-600 hover:text-indigo-800 transition text-xs font-semibold focus:outline-none cursor-pointer"
            title="Nueva auditoría"
            type="button"
          >
            <FiPlus size={24} />
            <span className="mt-1">Nueva auditoría</span>
          </button>

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

      <div className="flex flex-col flex-1 min-h-screen md:pl-20">
        <header className="flex items-center justify-between bg-white shadow px-6 py-3 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-600 hover:text-indigo-600 focus:outline-none"
            aria-label="Abrir menú lateral"
          >
            <FiMenu size={28} />
          </button>

          <h1 className="text-xl font-semibold text-gray-800 select-none">
            Panel de control
          </h1>

          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 focus:outline-none transition"
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
              aria-controls="user-menu"
              type="button"
            >
              {/* Avatar circular */}
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold select-none">
                {userInitial}
              </div>
              <span className="text-gray-800 font-medium">{userName}</span>
              <FiChevronDown
                className={`text-gray-600 transition-transform ${
                  userMenuOpen ? "rotate-180" : "rotate-0"
                }`}
                size={18}
              />
            </button>

            {userMenuOpen && (
              <ul
                id="user-menu"
                className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-2 text-gray-700 text-sm origin-top-right animate-fade-in cursor-pointer"
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
