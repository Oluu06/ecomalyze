"use client";

import { useSearchParams } from "next/navigation";

export default function AuditPage() {
  const searchParams = useSearchParams();
  const site = searchParams.get("site") ?? "";

  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Resultados de la auditoría
      </h1>

      {site ? (
        <div>
          <p className="mb-4 text-center">
            Análisis de la tienda: <strong>{site}</strong>
          </p>
          <div className="bg-white p-6 rounded shadow text-gray-700">
            {/* Aquí irán los resultados reales */}
            <p>
              (Por ahora, esta página muestra solo la URL. Pronto añadiremos los resultados detallados.)
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500">No se ha proporcionado una URL válida.</p>
      )}
    </main>
  );
}
