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
import { useUser } from "../context/UserContext";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  // Usamos la URL del usuario si existe, sino un texto por defecto
  const projectName = user?.siteUrl || "Tu sitio web";

  // Datos simulados para auditorías (puedes reemplazar con fetch o props)
  const recentAudits = [
    { id: 1, date: "2025-06-10", score: 85 },
    { id: 2, date: "2025-06-05", score: 78 },
    { id: 3, date: "2025-05-20", score: 92 },
  ];

  const getLabel = (score: number) => {
    if (score >= 90) return "Excelente";
    if (score >= 75) return "Bueno";
    return "Mejorar";
  };

  const totalAudits = recentAudits.length;
  const avgScore =
    recentAudits.reduce((acc, audit) => acc + audit.score, 0) / totalAudits || 0;
  const auditsThisMonth = recentAudits.filter(
    (audit) => audit.date >= "2025-06-01"
  ).length;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-gray-900 px-4 py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 flex flex-col gap-8">
          <h1 className="text-3xl font-semibold text-indigo-600 mb-6">
            Dashboard de {projectName}
          </h1>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500">Auditorías realizadas</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalAudits}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500">Puntuación promedio</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {avgScore.toFixed(0)}%
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500">Auditorías este mes</p>
              <p className="text-3xl font-bold text-yellow-500 mt-2">
                {auditsThisMonth}
              </p>
            </div>
          </div>

          {/* Auditorías recientes */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Historial reciente</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="text-gray-600 border-b border-gray-200">
                    <th className="py-2 px-4">Fecha</th>
                    <th className="py-2 px-4">Puntuación</th>
                    <th className="py-2 px-4">Etiqueta</th>
                    <th className="py-2 px-4">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAudits.map(({ id, date, score }) => (
                    <tr
                      key={id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
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
        </section>

        <div className="flex flex-col gap-8">
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-72">
            <h2 className="text-xl font-semibold mb-4">Evolución de puntuaciones</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentAudits}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(date) => date.slice(5)}
                />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "none" }} />
                <Bar dataKey="score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>

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
} //hola
