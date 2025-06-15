"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

export default function FeaturesSection() {
  const router = useRouter();

  const features = [
    { icon: "🔍", title: "SEO", desc: "Analizamos títulos, metadescripciones, headers y enlaces rotos." },
    { icon: "⚡", title: "VELOCIDAD WEB", desc: "Te mostramos los tiempos de carga, recursos pesados y qué optimizar." },
    { icon: "🧠", title: "UX/UI", desc: "Evaluamos navegación, jerarquía visual y experiencia en móvil." },
    { icon: "✍️", title: "Copywriting", desc: "Detectamos textos genéricos o poco persuasivos y sugerimos mejoras." },
    { icon: "📱", title: "Adaptabilidad móvil", desc: "Revisamos si tu tienda está bien optimizada para móviles." },
    { icon: "🛒", title: "Conversión", desc: "Analizamos CTA, formularios, confianza y barreras de compra." },
  ];

  return (
    <section className="bg-[#f5f7ff] py-20 px-4 md:px-6">
      {/* ¿Cómo funciona? */}
      <FadeInWhenVisible>
        <div id="how-it-works" className="max-w-6xl mx-auto text-center pt-20 -mt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            ¿Cómo funciona <span className="text-blue-600">Ecomalyze.ai</span>? ⚙️
          </h2>
          <p className="text-gray-600 mb-12">Audita tu tienda en solo tres pasos simples</p>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
            {[
              { title: "🛒 Paso 1: Ingresa tu tienda", desc: "Introduce la URL de tu tienda online para comenzar el análisis." },
              { title: "🤖 Paso 2: Análisis inteligente", desc: "Nuestra IA evalúa automáticamente tu sitio en aspectos clave como SEO, velocidad y experiencia de usuario." },
              { title: "📄 Paso 3: Recibe tu informe", desc: "Obtén un informe personalizado con puntuaciones, errores detectados y sugerencias prácticas para mejorar tu tienda." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex-1 bg-white rounded-2xl shadow-md p-6 text-left"
              >
                <h3 className="font-bold text-blue-600 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInWhenVisible>

      {/* Funcionalidades */}
      <FadeInWhenVisible>
        <div id="features" className="max-w-6xl mx-auto mt-24 text-center pt-20 -mt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
            Funcionalidades principales 🛠️
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6 text-left"
              >
                <h3 className="text-lg font-bold mb-2">
                  <span className="text-xl">{feature.icon}</span> {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}
