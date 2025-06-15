import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-6 text-gray-500 text-sm">
      © {new Date().getFullYear()} Ecomalyze. Todos los derechos reservados.
    </footer>
  );
}
