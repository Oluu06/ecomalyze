"use client";

import { useState } from "react";
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface SEOAnalysis {
  site: string;
  httpsImplemented: boolean;
  title: string;
  metaDescription: string;
  metaKeywords: string;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  imagesCount: number;
  imagesWithoutAlt: number;
  robotsTxtExists: boolean;
  sitemapExists: boolean;
  loadTimeMs: number;
  mobileFriendly: boolean;
  internalLinks: string[];
  externalLinks: string[];
  seoScore: number;
  accessibilityScore: number;
  recommendations: string[];
}

export default function AuditPage() {
  const [siteInput, setSiteInput] = useState("");
  const [site, setSite] = useState("");
  const [data, setData] = useState<SEOAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteInput.trim()) return;

    if (!isValidUrl(siteInput.trim())) {
      setError("Por favor, introduce una URL válida (https://...)");
      return;
    }

    setSite(siteInput.trim());
    setError("");
    setData(null);
    setLoading(true);

    try {
      const cached = sessionStorage.getItem(`audit_${siteInput.trim()}`);
      if (cached) {
        setData(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/analyze?site=${encodeURIComponent(siteInput.trim())}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error desconocido");
      }

      const json = (await res.json()) as SEOAnalysis;
      setData(json);
      sessionStorage.setItem(`audit_${siteInput.trim()}`, JSON.stringify(json));
    } catch (err: any) {
      setError(err.message || "No se pudo obtener el análisis.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 px-6 py-20 flex flex-col items-center font-sans">
      <div className="w-full max-w-5xl flex flex-col items-center mb-14 gap-6">
        <motion.h1
          className="text-5xl font-extrabold text-gray-900 select-none drop-shadow-md"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Auditoría Web
        </motion.h1>

        <Link
          href="/dashboard"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 active:scale-95 transition-transform rounded-xl px-8 py-4 text-white font-semibold shadow-lg drop-shadow-lg"
        >
          Dashboard
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex gap-4 mb-16"
        aria-label="Formulario de análisis de sitio"
      >
        <input
          type="url"
          placeholder="https://ejemplo.com"
          value={siteInput}
          onChange={(e) => setSiteInput(e.target.value)}
          className="flex-grow rounded-xl border border-gray-300 px-6 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition shadow-sm"
          required
          aria-required="true"
          aria-describedby="error-msg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl px-8 py-4 font-semibold shadow-lg drop-shadow-lg transition-transform flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Analizando...
            </>
          ) : (
            "Analizar"
          )}
        </button>
      </form>

      {error && (
        <motion.p
          id="error-msg"
          className="text-center text-red-600 font-medium mb-12 select-none text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
          aria-live="polite"
        >
          {error}
        </motion.p>
      )}

      <AnimatePresence>
        {data && (
          <motion.div
            key={site}
            className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Resumen general */}
            <section
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition-shadow"
              role="region"
              aria-labelledby="general-summary-title"
            >
              <h2
                id="general-summary-title"
                className="text-2xl font-semibold text-indigo-700 mb-8 flex items-center gap-3 select-none"
              >
                🧾 Resumen general
              </h2>
              <ul className="space-y-5 text-gray-700 text-base leading-relaxed">
                <li>
                  {data.httpsImplemented ? (
                    <span className="text-green-600 flex items-center gap-2 font-semibold">
                      <CheckCircle className="w-6 h-6" /> HTTPS implementado correctamente
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-2 font-semibold">
                      <XCircle className="w-6 h-6" /> HTTPS no está implementado
                    </span>
                  )}
                </li>
                <li>
                  ⚡ Carga estimada: <strong>{data.loadTimeMs} ms</strong>
                </li>
                <li>
                  📱 Adaptabilidad móvil: <strong>{data.mobileFriendly ? "Sí" : "No"}</strong>
                </li>
                <li>
                  🔍 SEO básico:{" "}
                  <strong>
                    {data.h1Count} &lt;h1&gt;, {data.h2Count} &lt;h2&gt;, {data.h3Count} &lt;h3&gt;
                  </strong>
                </li>
                <li>
                  🖼️ Imágenes totales: <strong>{data.imagesCount}</strong>, sin alt:{" "}
                  <strong>{data.imagesWithoutAlt}</strong>
                </li>
                <li>
                  <strong>Título:</strong> {data.title}
                </li>
                <li>
                  <strong>Meta Description:</strong> {data.metaDescription}
                </li>
                <li>
                  <strong>Meta Keywords:</strong> {data.metaKeywords}
                </li>
                <li>
                 🔗 Links internos: <strong>{data.internalLinks?.length ?? 0}</strong>
                </li>
                <li>
                  🔗 Links externos: <strong>{data.externalLinks?.length ?? 0}</strong>
                </li>

              </ul>
            </section>

            {/* Detalles técnicos */}
            <section
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition-shadow"
              role="region"
              aria-labelledby="technical-details-title"
            >
              <h2
                id="technical-details-title"
                className="text-2xl font-semibold text-indigo-700 mb-8 flex items-center gap-3 select-none"
              >
                🧪 Detalles técnicos
              </h2>
              <ul className="space-y-8 text-gray-700 text-base leading-relaxed">
                <li className="flex items-center gap-4">
                  {data.robotsTxtExists ? (
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  ) : (
                    <XCircle className="w-7 h-7 text-red-600" />
                  )}
                  <span>robots.txt disponible</span>
                </li>
                <li className="flex items-center gap-4">
                  {data.sitemapExists ? (
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  ) : (
                    <XCircle className="w-7 h-7 text-red-600" />
                  )}
                  <span>sitemap.xml disponible</span>
                </li>
                <li className="flex items-center gap-4">
                  <Clock className="w-7 h-7 text-yellow-500" />
                  <span>Imágenes sin alt: {data.imagesWithoutAlt}</span>
                </li>
              </ul>
            </section>

            {/* Puntuaciones */}
            <section
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition-shadow"
              role="region"
              aria-labelledby="scores-title"
            >
              <h2
                id="scores-title"
                className="text-2xl font-semibold text-indigo-700 mb-8 flex items-center gap-3 select-none"
              >
                🎯 Puntuaciones
              </h2>
              <ul className="space-y-5 text-gray-700 text-base leading-relaxed">
                <li>
                  SEO Score: <strong>{data.seoScore.toFixed(1)}</strong>
                </li>
                <li>
                  Accesibilidad: <strong>{data.accessibilityScore.toFixed(1)}</strong>
                </li>
              </ul>
            </section>

            {/* Recomendaciones */}
            <section
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 hover:shadow-2xl transition-shadow md:col-span-2"
              role="region"
              aria-labelledby="recommendations-title"
            >
              <h2
                id="recommendations-title"
                className="text-2xl font-semibold text-indigo-700 mb-8 flex items-center gap-3 select-none"
              >
                💡 Recomendaciones
              </h2>
              <ul className="list-disc pl-5 text-gray-700 text-base leading-relaxed space-y-2">
                {Array.isArray(data.recommendations) && data.recommendations.length > 0 ? (
                  data.recommendations.map((rec, i) => <li key={i}>{rec}</li>)
                ) : (
                  <li>No hay recomendaciones disponibles.</li>
                )}
              </ul>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
