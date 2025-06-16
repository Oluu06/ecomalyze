"use client";

import React, { useState, useMemo } from "react";

type DataRow = {
  fecha: string;
  evento: string;
  resultado: string;
};

type SortKey = keyof DataRow; // "fecha" | "evento" | "resultado"
type SortDirection = "asc" | "desc";

export default function ReportsPage() {
  const initialData: DataRow[] = [
    { fecha: "2025-06-01", evento: "Visitas", resultado: "1,500" },
    { fecha: "2025-06-02", evento: "Ventas", resultado: "120" },
    { fecha: "2025-06-03", evento: "Suscripciones", resultado: "45" },
    { fecha: "2025-06-04", evento: "Visitas", resultado: "1,700" },
    { fecha: "2025-06-05", evento: "Ventas", resultado: "100" },
  ];

  // Estado para filtro de fecha
  const [filterDate, setFilterDate] = useState<string>("");

  // Estado para ordenamiento, key puede ser null (sin ordenar)
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey | null;
    direction: SortDirection;
  }>({ key: null, direction: "asc" });

  // Filtrado por fecha
  const filteredData = useMemo(() => {
    if (!filterDate) return initialData;
    return initialData.filter((item) => item.fecha === filterDate);
  }, [filterDate, initialData]);

  // Ordenar datos
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const key = sortConfig.key;

    return [...filteredData].sort((a, b) => {
      // Para resultado, que es string con números, vamos a parsear números para orden correcto
      let aValue = a[key];
      let bValue = b[key];

      if (key === "resultado") {
        // Remover comas y convertir a número
        aValue = aValue.replace(/,/g, "");
        bValue = bValue.replace(/,/g, "");
        const aNum = Number(aValue);
        const bNum = Number(bValue);
        if (aNum < bNum) return sortConfig.direction === "asc" ? -1 : 1;
        if (aNum > bNum) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      } else {
        // Comparación normal para strings (fecha y evento)
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      }
    });
  }, [filteredData, sortConfig]);

  // Manejar click en encabezado para ordenar
  function handleSort(key: SortKey) {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  return (
    <div className="text-gray-800 max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Informes</h1>

      {/* Filtro por fecha */}
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="fechaFiltro" className="font-medium">
          Filtrar por fecha:
        </label>
        <input
          type="date"
          id="fechaFiltro"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-blue-500"
        />
        <button
          onClick={() => setFilterDate("")}
          className="text-sm text-blue-600 hover:underline"
        >
          Limpiar filtro
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider select-none">
            <tr>
              <th
                className="px-6 py-3 border-b cursor-pointer"
                onClick={() => handleSort("fecha")}
              >
                Fecha
                {sortConfig.key === "fecha" &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
              <th
                className="px-6 py-3 border-b cursor-pointer"
                onClick={() => handleSort("evento")}
              >
                Evento
                {sortConfig.key === "evento" &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
              <th
                className="px-6 py-3 border-b cursor-pointer"
                onClick={() => handleSort("resultado")}
              >
                Resultado
                {sortConfig.key === "resultado" &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((fila, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-6 py-4 border-b">{fila.fecha}</td>
                  <td className="px-6 py-4 border-b">{fila.evento}</td>
                  <td className="px-6 py-4 border-b">{fila.resultado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No hay datos para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
