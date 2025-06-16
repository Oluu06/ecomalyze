"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";

const plans = [
  {
    id: "gratis",
    name: "Gratis",
    price: "0€",
    features: [
      "1 auditoría básica diaria",
      "Informe simple con lo esencial",
      "Soporte vía email limitado",
    ],
    details: {
      "SEO técnico básico": [
        "Meta títulos y descripciones básicos",
        "Etiquetas H1 mínimas",
        "URLs amigables básicas",
      ],
      "Velocidad y rendimiento básico": ["Tiempo de carga aceptable"],
      "Experiencia de Usuario": [
        "Navegación funcional pero básica",
        "Botones esenciales visibles",
      ],
      "Seguridad y confianza": ["Certificado SSL activo", "Políticas legales visibles"],
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: "19€/mes",
    features: [
      "Hasta 10 auditorías diarias",
      "Informe detallado con recomendaciones específicas",
      "Acceso completo a funcionalidades avanzadas",
      "Soporte prioritario vía chat y email",
      "Exportar informes en PDF y CSV",
    ],
    details: {
      "SEO avanzado": [
        "Estructura H1–H3 optimizada para eCommerce",
        "Detección de contenido duplicado o canibalización",
        "Implementación de Schema para productos y reseñas",
        "Validación de enlaces rotos internos y externos",
        "Revisión avanzada de indexación en Google",
      ],
      "Rendimiento web optimizado": [
        "Minificación y optimización de CSS, JS y HTML",
        "Lazy loading para imágenes y recursos",
        "Uso de CDN y caché para mejorar velocidad",
        "Corrección de recursos que bloquean renderizado",
      ],
      "Experiencia de Usuario mejorada": [
        "Consistencia visual en toda la tienda",
        "Accesibilidad básica con ARIA y navegación por teclado",
        "Diseño responsive para móviles y tablets",
        "Feedback visual en interacciones clave",
      ],
      "Copywriting persuasivo para eCommerce": [
        "Propuestas de valor orientadas a conversión",
        "CTAs optimizados para incentivar compra",
        "Lenguaje emocional adaptado a audiencia",
        "Textos optimizados para dispositivos móviles",
      ],
      "Análisis y seguimiento": [
        "Google Analytics y Tag Manager avanzados",
        "Seguimiento de clics y conversiones",
        "Mapeo del funnel de ventas",
        "Análisis de tasa de rebote y comportamiento",
      ],
    },
  },
  {
    id: "agencia",
    name: "Agencia",
    price: "49€/mes",
    features: [
      "Auditorías ilimitadas para múltiples tiendas",
      "Informes PDF con branding personalizado",
      "Soporte prioritario 24/7 dedicado",
      "Integración avanzada con CRM y marketing",
    ],
    details: {
      "Auditoría técnica completa": [
        "Revisión errores 404 y redirecciones 301/302",
        "Página 404 personalizada y optimizada",
        "Compatibilidad con navegadores y dispositivos",
        "Protección contra XSS, CSRF y vulnerabilidades",
        "Auditoría y actualización de plugins y CMS",
      ],
      "Accesibilidad y sostenibilidad": [
        "Etiquetas ARIA avanzadas",
        "Cumplimiento WCAG con navegación por teclado",
        "Alternativas textuales en multimedia",
        "Optimización para consumo energético y eco diseño",
      ],
      "Elementos de confianza avanzados": [
        "Sellos de confianza y badges de seguridad",
        "Políticas de devolución claras",
        "Pruebas sociales destacadas y personalizadas",
        "Información detallada de envíos y soporte premium",
      ],
      "Estrategia de conversión avanzada": [
        "Pop-ups y chatbots no intrusivos",
        "Análisis emocional y persuasivo del contenido",
        "Auditoría exhaustiva de FAQ y objeciones",
      ],
      "Reporte profesional y estratégico": [
        "Comentarios automáticos personalizados",
        "Priorización de acciones rápidas e intermedias",
        "Recomendaciones para equipos técnicos y marketing",
      ],
    },
  },
];

// Animaciones para las cards de planes
const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: easeOut },
  }),
};

// Animaciones para la lista de detalles
const listVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

function PlanDetails({
  details,
}: {
  details: Record<string, string[] | undefined>;
}) {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="mt-6 space-y-6 text-gray-700 max-h-[280px] overflow-y-auto pr-2"
    >
      {Object.entries(details).map(([section, items]) => (
        <div key={section}>
          <h4 className="text-lg font-semibold text-blue-600 mb-2">{section}</h4>
          <ul className="list-disc list-inside space-y-1">
            {(items || []).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
}

export default function PlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
        Elige tu Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {plans.map((plan, i) => (
          <motion.article
            key={plan.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`rounded-2xl p-8 shadow-lg cursor-pointer flex flex-col justify-between
              ${
                selectedPlan === plan.id
                  ? "bg-blue-600 text-white scale-[1.05] shadow-xl"
                  : "bg-white text-gray-900 hover:shadow-xl hover:scale-[1.03] transition-transform duration-300"
              }`}
            onClick={() =>
              setSelectedPlan(selectedPlan === plan.id ? null : plan.id)
            }
            layout
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-4xl font-extrabold">{plan.price}</p>
              <ul className="mt-4 list-disc list-inside space-y-1 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            <AnimatePresence>
              {selectedPlan === plan.id && <PlanDetails details={plan.details} />}
            </AnimatePresence>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
