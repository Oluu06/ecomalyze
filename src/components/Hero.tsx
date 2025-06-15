"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleAudit = () => {
    if (!url.trim()) {
      alert("Por favor, introduce una URL válida.");
      return;
    }
    router.push(`/audit?site=${encodeURIComponent(url.trim())}`);
  };

  return (
    <motion.section
      className="text-center py-20 px-4 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800">
        <span className="block">
          <span className="text-blue-600">Audita </span>
          cualquier tienda
        </span>
        <span className="block">
          online <span className="text-blue-600"> en segundos </span>
          con <span className="text-blue-600">IA</span>
        </span>
      </h2>

      <p className="mt-4 text-lg text-gray-600">
        Recibe un análisis instantáneo de tu tienda con IA: SEO, velocidad y experiencia de usuario
      </p>

      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-2">
        <input
          type="text"
          placeholder="www.tutienda.com"
          className="px-4 py-2 rounded border border-gray-300 w-full sm:w-80"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleAudit}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-bold cursor-pointer"
        >
          ⚡Audita ahora gratis
        </button>
      </div>
    </motion.section>
  );
}
