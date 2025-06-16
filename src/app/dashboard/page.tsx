"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const recentAudits = [
    { id: 1, store: "mystore.com", date: "2025-06-10", score: 85 },
    { id: 2, store: "shop123.com", date: "2025-06-08", score: 78 },
    { id: 3, store: "tienda-ejemplo.com", date: "2025-06-05", score: 92 },
  ];

  const router = useRouter();

  const getLabel = (score: number) => {
    if (score >= 90) return "Excelente";
    if (score >= 75) return "Bueno";
    return "Mejorar";
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Resumen rápido */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500">Auditorías realizadas</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">42</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500">Puntuación promedio</p>
              <p className="text-3xl font-bold text-green-600 mt-2">87%</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500">Auditorías este mes</p>
              <p className="text-3xl font-bold text-yellow-500 mt-2">8</p>
            </div>
          </section>

          {/* Auditorías destacadas */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Auditorías destacadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentAudits.length > 0 && (
                <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                  <p className="text-sm text-gray-600 mb-1">🏆 Mejor puntuación</p>
                  <p className="font-semibold text-gray-800">
                    {recentAudits.sort((a, b) => b.score - a.score)[0].store} –{" "}
                    {recentAudits.sort((a, b) => b.score - a.score)[0].score}%
                  </p>
                </div>
              )}
              {recentAudits.length > 0 && (
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                  <p className="text-sm text-gray-600 mb-1">📅 Más reciente</p>
                  <p className="font-semibold text-gray-800">
                    {
                      recentAudits.sort(
                        (a, b) =>
                          new Date(b.date).getTime() - new Date(a.date).getTime()
                      )[0].store
                    }{" "}
                    –{" "}
                    {
                      recentAudits.sort(
                        (a, b) =>
                          new Date(b.date).getTime() - new Date(a.date).getTime()
                      )[0].date
                    }
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Tabla de auditorías */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Auditorías recientes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b border-gray-200">
                    <th className="py-2 px-4">Tienda</th>
                    <th className="py-2 px-4">Fecha</th>
                    <th className="py-2 px-4">Puntuación</th>
                    <th className="py-2 px-4">Etiqueta</th>
                    <th className="py-2 px-4">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAudits.map(({ id, store, date, score }) => (
                    <tr
                      key={id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-medium">{store}</td>
                      <td className="py-3 px-4">{date}</td>
                      <td className="py-3 px-4">{score}%</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            score >= 90
                              ? "bg-green-100 text-green-800"
                              : score >= 75
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {getLabel(score)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() =>
                            alert(`Ver detalles auditoría #${id}`)
                          }
                          className="text-blue-600 hover:underline"
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-8">
          {/* Gráfico de puntuaciones */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-72">
            <h2 className="text-xl font-semibold mb-4">Puntuaciones recientes</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentAudits}>
                <XAxis dataKey="store" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "none" }} />
                <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>

          {/* Botón para auditar ahora */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-center">
            <button
              onClick={() => router.push("/audit")}
              className="bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition font-semibold text-lg w-full"
            >
              Auditar ahora
            </button>
          </section>

          {/* Ajustes */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-2">Ajustes</h2>
            <p className="text-sm text-gray-600">
              Aquí puedes modificar tus preferencias o editar tu perfil.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
