"use client";

export default function DashboardPage() {
  const recentAudits = [
    { id: 1, store: "mystore.com", date: "2025-06-10", score: 85 },
    { id: 2, store: "shop123.com", date: "2025-06-08", score: 78 },
    { id: 3, store: "tienda-ejemplo.com", date: "2025-06-05", score: 92 },
  ];

  function handleNewAudit() {
    alert("Iniciar nueva auditoría...");
  }

  return (
    <main className="min-h-screen bg-[#f5f7ff] text-gray-900 flex flex-col">
      <div className="flex flex-1 max-w-7xl mx-auto px-6 py-8 gap-8">
        <section className="flex-1 flex flex-col gap-10 overflow-y-auto">
          {/* Resumen */}
          <section className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Resumen rápido</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-blue-600 text-white rounded-2xl p-6 text-center">
                <p className="text-lg">Auditorías realizadas</p>
                <p className="text-4xl font-extrabold">42</p>
              </div>
              <div className="bg-green-600 text-white rounded-2xl p-6 text-center">
                <p className="text-lg">Puntuación promedio</p>
                <p className="text-4xl font-extrabold">87%</p>
              </div>
              <div className="bg-yellow-500 text-white rounded-2xl p-6 text-center">
                <p className="text-lg">Auditorías este mes</p>
                <p className="text-4xl font-extrabold">8</p>
              </div>
            </div>
          </section>

          {/* Auditorías recientes */}
          <section className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Auditorías recientes</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-4">Tienda</th>
                  <th className="py-2 px-4">Fecha</th>
                  <th className="py-2 px-4">Puntuación</th>
                  <th className="py-2 px-4">Acción</th>
                </tr>
              </thead>
              <tbody>
                {recentAudits.map(({ id, store, date, score }) => (
                  <tr key={id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{store}</td>
                    <td className="py-3 px-4">{date}</td>
                    <td className="py-3 px-4">{score}%</td>
                    <td className="py-3 px-4">
                      <button
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => alert(`Ver detalles auditoría #${id}`)}
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Nueva auditoría */}
          <section className="bg-white rounded-2xl shadow-md p-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Nueva auditoría</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNewAudit();
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="url"
                placeholder="Introduce la URL de tu tienda"
                className="border border-gray-300 rounded px-4 py-2"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-semibold cursor-pointer"
              >
                Auditar ahora
              </button>
            </form>
          </section>

          {/* Ajustes */}
          <section className="bg-white rounded-2xl shadow-md p-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Ajustes</h2>
            <p className="text-gray-700">
              Aquí puedes agregar opciones para modificar tu perfil o preferencias.
            </p>
          </section>
        </section>
      </div>

      {/* Botón flotante para nueva auditoría */}
      <button
        onClick={handleNewAudit}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 transition cursor-pointer"
        aria-label="Nueva auditoría"
        title="Nueva auditoría"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </main>
  );
}
