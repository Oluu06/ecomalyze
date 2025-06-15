"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { useState } from "react";

interface ChecklistProps {
  plan: "gratis" | "pro" | "agencia";
}

const checklistData = {
  gratis: {
    resumen: [
      "1 auditoría básica diaria",
      "Informe simple con lo esencial",
      "Soporte vía email limitado",
    ],
    detalle: {
      "SEO técnico básico": [
        "Meta títulos y descripciones básicos",
        "Etiquetas H1 mínimas",
        "URLs amigables básicas",
      ],
      "Velocidad y rendimiento básico": [
        "Tiempo de carga aceptable",
      ],
      "Experiencia de Usuario": [
        "Navegación funcional pero básica",
        "Botones esenciales visibles",
      ],
      "Seguridad y confianza": [
        "Certificado SSL activo",
        "Políticas legales visibles",
      ],
    },
  },

  pro: {
    resumen: [
      "Hasta 10 auditorías diarias",
      "Informe detallado con recomendaciones específicas para Shopify, WooCommerce y más",
      "Acceso completo a todas las funcionalidades avanzadas",
      "Soporte prioritario vía chat y email",
      "Exportar informes en PDF y CSV",
    ],
    detalle: {
      "SEO avanzado": [
        "Estructura de encabezados H1–H3 optimizada para eCommerce",
        "Detección de contenido duplicado o canibalización",
        "Implementación de Schema para productos y reseñas",
        "Validación de enlaces rotos internos y externos",
        "Revisión avanzada de indexación en Google",
      ],
      "Rendimiento web optimizado": [
        "Minificación y optimización de CSS, JS y HTML",
        "Implementación de lazy loading para imágenes y recursos",
        "Uso de CDN y caché para mejorar velocidad",
        "Identificación y corrección de recursos que bloquean renderizado",
      ],
      "Experiencia de Usuario mejorada": [
        "Consistencia visual en toda la tienda",
        "Accesibilidad básica con ARIA y navegación por teclado",
        "Diseño responsive para móviles y tablets",
        "Feedback visual en interacciones clave",
      ],
      "Copywriting persuasivo para eCommerce": [
        "Propuestas de valor claras y orientadas a conversión",
        "CTAs optimizados para incentivar compra",
        "Lenguaje emocional adaptado a tu audiencia",
        "Textos optimizados para dispositivos móviles",
      ],
      "Análisis y seguimiento": [
        "Configuración avanzada de Google Analytics y Tag Manager",
        "Seguimiento de eventos clave como clics y conversiones",
        "Mapeo del funnel de ventas",
        "Análisis de tasa de rebote y comportamiento del usuario",
      ],
    },
  },

  agencia: {
    resumen: [
      "Auditorías ilimitadas para múltiples tiendas",
      "Informes PDF con branding personalizado",
      "Soporte prioritario 24/7 dedicado",
      "Integración avanzada con CRM y herramientas de marketing",
    ],
    detalle: {
      "Auditoría técnica completa": [
        "Revisión exhaustiva de errores 404 y redirecciones 301/302",
        "Página 404 personalizada y optimizada",
        "Análisis de compatibilidad con todos los navegadores y dispositivos",
        "Protección avanzada contra XSS, CSRF y vulnerabilidades comunes",
        "Auditoría y actualización de plugins y CMS",
      ],
      "Accesibilidad y sostenibilidad": [
        "Etiquetas ARIA avanzadas para accesibilidad total",
        "Evaluación de contraste y navegación por teclado para cumplimiento WCAG",
        "Alternativas textuales en multimedia",
        "Optimización para consumo energético y eco web design",
      ],
      "Elementos de confianza avanzados": [
        "Integración de sellos de confianza y badges de seguridad",
        "Garantías y políticas de devolución claras y visibles",
        "Pruebas sociales destacadas y personalizadas",
        "Información detallada sobre envíos y soporte premium",
      ],
      "Estrategia de conversión avanzada": [
        "Diseño y redacción de pop-ups y chatbots no intrusivos",
        "Análisis emocional y persuasivo del contenido",
        "Auditoría exhaustiva de FAQ y gestión de objeciones",
      ],
      "Reporte profesional y estratégico": [
        "Comentarios automáticos personalizados con insights claros",
        "Priorización de acciones rápidas, intermedias y estructurales",
        "Recomendaciones detalladas para equipos técnicos y de marketing",
      ],
    },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

function Checklist({ plan }: ChecklistProps) {
  const data = checklistData[plan];

  return (
    <div className="space-y-6">
      {Object.entries(data.detalle).map(([section, items]) => (
        <div key={section}>
          <h4 className="text-lg font-semibold mb-2 text-blue-600">{section}</h4>
          <motion.ul
            className="list-disc list-inside text-gray-700"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {items.map((item, i) => (
              <motion.li key={i} variants={itemVariants} className="mb-1">
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      ))}
    </div>
  );
}

export default function FeaturesSection() {
  const router = useRouter();
  const [showMore, setShowMore] = useState<null | "gratis" | "pro" | "agencia">(null);

  return (
    <section className="bg-[#f5f7ff] py-20 px-4 md:px-6">
      <FadeInWhenVisible>
        <div id="pricing" className="max-w-6xl mx-auto mt-24 text-center pt-20 -mt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
            Planes y precios 💳
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["gratis", "pro", "agencia"] as const).map((plan) => {
              const data = checklistData[plan];
              const isPro = plan === "pro";
              return (
                <motion.div
                  key={plan}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: plan === "gratis" ? 0.1 : plan === "pro" ? 0.2 : 0.3 }}
                  className={`rounded-2xl shadow-md p-8 flex flex-col items-center ${
                    isPro
                      ? "bg-blue-600 text-white shadow-lg transform scale-[1.03]"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${isPro ? "text-white" : "text-blue-600"}`}>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}
                  </h3>
                  <p className={`text-4xl font-extrabold mb-4 ${isPro ? "text-white" : "text-gray-900"}`}>
                    {plan === "gratis" ? "0€" : plan === "pro" ? "19€/mes" : "49€/mes"}
                  </p>

                  <ul
                    className={`list-disc list-inside text-sm space-y-1 mt-4 ${
                      isPro ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {data.resumen.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className="flex gap-4 mt-6">
                    {plan === "gratis" && (
                      <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition font-semibold hover:cursor-pointer"
                        onClick={() => router.push("/")}
                      >
                        Empieza gratis ahora
                      </button>
                    )}
                    {plan === "pro" && (
                      <button
                        onClick={() => router.push("/auth")}
                        className="bg-white text-blue-600 px-5 py-2 rounded-xl hover:bg-blue-100 transition font-semibold cursor-pointer"
                      >
                        Prueba Pro y aumenta tus ventas
                      </button>
                    )}
                    {plan === "agencia" && (
                      <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition font-semibold hover:cursor-pointer"
                        onClick={() => alert("Formulario de demo aquí")}
                      >
                        Solicita demo personalizada
                      </button>
                    )}

                    <button
                      className={`${
                        isPro
                          ? "bg-white/20 hover:bg-white/30 text-white"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      } px-5 py-2 rounded-xl transition font-semibold hover:cursor-pointer`}
                      onClick={() => setShowMore(showMore === plan ? null : plan)}
                    >
                      {showMore === plan ? "Ver menos beneficios" : "Ver todos los beneficios"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {showMore && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6"
                onClick={() => setShowMore(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-10 relative"
                >
                  <button
                    onClick={() => setShowMore(null)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-full p-2"
                    aria-label="Cerrar modal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <h3 className="text-3xl font-bold mb-6 capitalize text-blue-600">
                    {showMore.charAt(0).toUpperCase() + showMore.slice(1)}
                  </h3>

                  <Checklist plan={showMore} />

                  <button
                    className="mt-10 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-semibold block mx-auto focus:outline-none focus:ring-4 focus:ring-blue-400"
                    onClick={() => setShowMore(null)}
                  >
                    Cerrar
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </FadeInWhenVisible>
    </section>
  );
}
