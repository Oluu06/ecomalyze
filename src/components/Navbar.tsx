"use client"; // Asegúrate de que es un componente cliente

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600 cursor-pointer">Ecomalyze</h1>
      <nav className="hidden md:flex space-x-6">
        <a href="#how-it-works" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
          Cómo funciona
        </a>
        <a href="#features" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
          Funcionalidades
        </a>
        <a href="#pricing" className="text-gray-700 font-medium hover:text-blue-600 transition-colors">
          Precios
        </a>
        <span
          className="text-gray-400 font-medium cursor-not-allowed select-none"
          title="Próximamente"
        >
          Blog
        </span>
      </nav>
      <button
        onClick={() => router.push("/auth")}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-bold"
      >
        ⚡Login / Registro
      </button>
    </header>
  );
}
