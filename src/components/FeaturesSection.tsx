export default function FeaturesSection() {
  return (
    <section className="bg-[#f5f7ff] py-20 px-4 md:px-6">
      {/* ¿Cómo funciona? */}
      <div
        id="how-it-works"
        className="max-w-6xl mx-auto text-center pt-20 -mt-16"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          ¿Cómo funciona <span className="text-blue-600">Ecomalyze.ai</span>? ⚙️
        </h2>
        <p className="text-gray-600 mb-12">Audita tu tienda en solo tres pasos simples</p>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 text-left">
            <h3 className="font-bold text-blue-600 text-lg mb-2">
              🛒 Paso 1: <span className="text-gray-900">Ingresa tu tienda</span>
            </h3>
            <p className="text-gray-600 text-sm">
              Introduce la URL de tu tienda online para comenzar el análisis.
            </p>
          </div>

          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 text-left">
            <h3 className="font-bold text-blue-600 text-lg mb-2">
              🤖 Paso 2: <span className="text-gray-900">Análisis inteligente</span>
            </h3>
            <p className="text-gray-600 text-sm">
              Nuestra IA evalúa automáticamente tu sitio en aspectos clave como SEO, velocidad y experiencia de usuario.
            </p>
          </div>

          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 text-left">
            <h3 className="font-bold text-blue-600 text-lg mb-2">
              📄 Paso 3: <span className="text-gray-900">Recibe tu informe</span>
            </h3>
            <p className="text-gray-600 text-sm">
              Obtén un informe personalizado con puntuaciones, errores detectados y sugerencias prácticas para mejorar tu tienda.
            </p>
          </div>
        </div>
      </div>

      {/* Funcionalidades */}
      <div
        id="features"
        className="max-w-6xl mx-auto mt-24 text-center pt-20 -mt-16"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
          Funcionalidades principales 🛠️
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { icon: "🔍", title: "SEO", desc: "Analizamos títulos, metadescripciones, headers y enlaces rotos." },
            { icon: "⚡", title: "VELOCIDAD WEB", desc: "Te mostramos los tiempos de carga, recursos pesados y qué optimizar." },
            { icon: "🧠", title: "UX/UI", desc: "Evaluamos navegación, jerarquía visual y experiencia en móvil." },
            { icon: "✍️", title: "Copywriting", desc: "Detectamos textos genéricos o poco persuasivos y sugerimos mejoras." },
            { icon: "📱", title: "Adaptabilidad móvil", desc: "Revisamos si tu tienda está bien optimizada para móviles." },
            { icon: "🛒", title: "Conversión", desc: "Analizamos CTA, formularios, confianza y barreras de compra." },
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 text-left">
              <h3 className="text-lg font-bold mb-2">
                <span className="text-xl">{feature.icon}</span> {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Precios */}
      <div
        id="pricing"
        className="max-w-6xl mx-auto mt-24 text-center pt-20 -mt-16"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
          Planes y precios 💳
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Gratis</h3>
            <p className="text-gray-900 text-4xl font-extrabold mb-4">0€</p>
            <ul className="text-gray-600 text-sm mb-6 space-y-2">
              <li>1 auditoría por día</li>
              <li>Informe básico</li>
              <li>Acceso limitado a funcionalidades</li>
            </ul>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition font-semibold">
              Empezar gratis
            </button>
          </div>

          <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-8 flex flex-col items-center transform scale-[1.03]">
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-4xl font-extrabold mb-4">19€/mes</p>
            <ul className="text-white/90 text-sm mb-6 space-y-2">
              <li>10 auditorías al día</li>
              <li>Informe detallado con recomendaciones</li>
              <li>Acceso completo a funcionalidades</li>
            </ul>
            <button className="bg-white text-blue-600 px-5 py-2 rounded-xl hover:bg-blue-100 transition font-semibold">
              Empezar con Pro
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Agencia</h3>
            <p className="text-gray-900 text-4xl font-extrabold mb-4">49€/mes</p>
            <ul className="text-gray-600 text-sm mb-6 space-y-2">
              <li>Auditorías ilimitadas</li>
              <li>Informes PDF con branding</li>
              <li>Soporte prioritario</li>
            </ul>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition font-semibold">
              Solicitar demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
