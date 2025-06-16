import { NextResponse } from "next/server";
import { parse } from "node-html-parser";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get("site");

    if (!site) {
      return NextResponse.json({ error: "Parámetro site es requerido" }, { status: 400 });
    }

    // Validar URL
    let siteUrl: URL;
    try {
      siteUrl = new URL(site);
    } catch {
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    }

    const start = Date.now();
    const response = await fetch(site);
    const loadTimeMs = Date.now() - start;

    if (!response.ok) {
      return NextResponse.json({ error: `No se pudo acceder a la página. Status: ${response.status}` }, { status: 500 });
    }

    const htmlText = await response.text();

    // Parse HTML
    const root = parse(htmlText);

    // Título
    const titleTag = root.querySelector("title");
    const title = titleTag?.text.trim() ?? "No encontrado";

    // Meta description y keywords
    const metaDescriptionTag = root.querySelector('meta[name="description"]');
    const metaDescription = metaDescriptionTag?.getAttribute("content")?.trim() ?? "No encontrada";

    const metaKeywordsTag = root.querySelector('meta[name="keywords"]');
    const metaKeywords = metaKeywordsTag?.getAttribute("content")?.trim() ?? "No encontradas";

    // Contar etiquetas h1, h2, h3
    const h1Count = root.querySelectorAll("h1").length;
    const h2Count = root.querySelectorAll("h2").length;
    const h3Count = root.querySelectorAll("h3").length;

    // Imágenes y cuántas sin alt
    const images = root.querySelectorAll("img");
    const imagesWithoutAlt = images.filter(img => !img.getAttribute("alt") || img.getAttribute("alt")?.trim() === "").length;

    // Detectar viewport (para mobile-friendly)
    const viewportMeta = root.querySelector('meta[name="viewport"]');
    const mobileFriendly = !!viewportMeta;

    // Recopilar links internos y externos
    const links = root.querySelectorAll("a");
    const internalLinks = new Set<string>();
    const externalLinks = new Set<string>();

    links.forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;

      try {
        const url = new URL(href, siteUrl);
        if (url.hostname === siteUrl.hostname) {
          internalLinks.add(url.toString());
        } else {
          externalLinks.add(url.toString());
        }
      } catch {
        // Ignorar enlaces inválidos
      }
    });

    // robots.txt
    let robotsTxtExists = false;
    try {
      const robotsRes = await fetch(new URL("/robots.txt", siteUrl).toString());
      robotsTxtExists = robotsRes.ok;
    } catch {}

    // sitemap.xml
    let sitemapExists = false;
    try {
      const sitemapRes = await fetch(new URL("/sitemap.xml", siteUrl).toString());
      sitemapExists = sitemapRes.ok;
    } catch {}

    // HTTPS implementado
    const httpsImplemented = siteUrl.protocol === "https:";

    // Simple scoring (puedes mejorar la lógica)
    let seoScore = 100;
    let accessibilityScore = 100;
    const recommendations: string[] = [];

    if (!httpsImplemented) {
      seoScore -= 30;
      recommendations.push("Usar HTTPS para mejorar la seguridad y SEO.");
    }
    if (h1Count === 0) {
      seoScore -= 20;
      recommendations.push("Agregar al menos una etiqueta <h1> para mejorar SEO.");
    }
    if (imagesWithoutAlt > 0) {
      accessibilityScore -= 20;
      recommendations.push(`Agregar atributos alt a las ${imagesWithoutAlt} imágenes que los necesitan.`);
    }
    if (!robotsTxtExists) {
      seoScore -= 10;
      recommendations.push("Agregar un archivo robots.txt para controlar el rastreo de motores de búsqueda.");
    }
    if (!sitemapExists) {
      seoScore -= 10;
      recommendations.push("Agregar un sitemap.xml para facilitar la indexación.");
    }
    if (!mobileFriendly) {
      seoScore -= 10;
      recommendations.push("Agregar meta viewport para mejorar la experiencia móvil.");
    }
    if (loadTimeMs > 3000) {
      seoScore -= 10;
      recommendations.push("Optimizar la velocidad de carga del sitio.");
    }

    // Aseguramos valores dentro del rango 0-100
    seoScore = Math.max(0, Math.min(100, seoScore));
    accessibilityScore = Math.max(0, Math.min(100, accessibilityScore));

    return NextResponse.json({
      site: siteUrl.toString(),
      httpsImplemented,
      title,
      metaDescription,
      metaKeywords,
      h1Count,
      h2Count,
      h3Count,
      imagesCount: images.length,
      imagesWithoutAlt,
      robotsTxtExists,
      sitemapExists,
      loadTimeMs,
      mobileFriendly,
      internalLinks: Array.from(internalLinks),
      externalLinks: Array.from(externalLinks),
      seoScore,
      accessibilityScore,
      recommendations,
    });
  } catch (error) {
    console.error("Error en /api/analyze:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
