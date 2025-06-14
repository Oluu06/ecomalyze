// src/app/page.tsx
export default function Home() {
  return (
    <main className="bg-[#f5f7ff] text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-600">rm -r </h1>
        <nav className="space-x-6 hidden md:flex">
          <a href="#" className="text-gray-700 font-bold hover:text-blue-600">Cómo funciona</a>
          <a href="#" className="text-gray-700 font-bold hover:text-blue-600">Funcionalidades</a>
          <a href="#" className="text-gray-700 font-bold hover:text-blue-600">Precios</a>
          <a href="#" className="text-gray-700 font-bold hover:text-blue-600">Blog</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-bold">⚡Login / Registro</button>

      </header>

      {/* Hero */}
      <section className="text-center py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800">
          <span className="block">
          <span className="text-blue-600">Audita </span>
          cualquier tienda
          </span>
          <span className="block">
          online 
          <span className="text-blue-600"> en segundos </span>
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
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition font-bold">
            ⚡Audita ahora gratis
          </button>


        </div>
      </section>
    </main>
  );
}
