import type { NewsSource, PublicNewsSource } from "./types";

type NewsSourceInput = Omit<NewsSource, "country" | "language"> & {
  readonly language?: NewsSource["language"];
};

export const defaultNewsSources: readonly NewsSource[] = [
  createSource({
    id: "kompas-home",
    name: "Kompas.com",
    description:
      "Portal berita arus utama nasional dari halaman depan Kompas.com",
    url: "https://www.kompas.com/",
    rssUrl: "https://www.kompas.com/",
    feedType: "html",
    articlePathIncludes: ["/read/"],
    category: "general",
  }),
  createSource({
    id: "kompas-tren",
    name: "Kompas.com Tren",
    description: "Berita trending dan kanal Tren dari Kompas.com",
    url: "https://www.kompas.com/tren",
    rssUrl: "https://www.kompas.com/tren",
    feedType: "html",
    articlePathIncludes: ["/read/"],
    category: "general",
  }),
  createSource({
    id: "antara-general",
    name: "ANTARA News",
    description:
      "Kantor berita nasional resmi yang mendistribusikan informasi ke berbagai media",
    url: "https://www.antaranews.com",
    rssUrl: "https://www.antaranews.com/rss/terkini.xml",
    category: "general",
  }),
  createSource({
    id: "antara-business",
    name: "ANTARA Ekonomi",
    description: "Berita ekonomi dari ANTARA News",
    url: "https://www.antaranews.com/ekonomi",
    rssUrl: "https://www.antaranews.com/rss/ekonomi.xml",
    category: "business",
  }),
  createSource({
    id: "antara-sports",
    name: "ANTARA Olahraga",
    description: "Berita olahraga dari ANTARA News",
    url: "https://www.antaranews.com/olahraga",
    rssUrl: "https://www.antaranews.com/rss/olahraga.xml",
    category: "sports",
  }),
  createSource({
    id: "antara-technology",
    name: "ANTARA Tekno",
    description: "Berita teknologi dari ANTARA News",
    url: "https://www.antaranews.com/tekno",
    rssUrl: "https://www.antaranews.com/rss/tekno.xml",
    category: "technology",
  }),
  createSource({
    id: "antara-entertainment",
    name: "ANTARA Hiburan",
    description: "Berita hiburan dari ANTARA News",
    url: "https://www.antaranews.com/hiburan",
    rssUrl: "https://www.antaranews.com/rss/hiburan.xml",
    category: "entertainment",
  }),
  createSource({
    id: "tempo-general",
    name: "Tempo Nasional",
    description:
      "Media dengan tradisi jurnalisme investigasi dan liputan mendalam",
    url: "https://nasional.tempo.co",
    rssUrl: "https://rss.tempo.co/nasional",
    category: "general",
  }),
  createSource({
    id: "tempo-business",
    name: "Tempo Bisnis",
    description: "Berita bisnis dari Tempo",
    url: "https://bisnis.tempo.co",
    rssUrl: "https://rss.tempo.co/bisnis",
    category: "business",
  }),
  createSource({
    id: "tempo-sports",
    name: "Tempo Bola",
    description: "Berita olahraga dari Tempo",
    url: "https://bola.tempo.co",
    rssUrl: "https://rss.tempo.co/bola",
    category: "sports",
  }),
  createSource({
    id: "tempo-technology",
    name: "Tempo Tekno",
    description: "Berita teknologi dari Tempo",
    url: "https://tekno.tempo.co",
    rssUrl: "https://rss.tempo.co/tekno",
    category: "technology",
  }),
  createSource({
    id: "tempo-entertainment",
    name: "Tempo Seleb",
    description: "Berita hiburan dari Tempo",
    url: "https://seleb.tempo.co",
    rssUrl: "https://rss.tempo.co/seleb",
    category: "entertainment",
  }),
  createSource({
    id: "project-multatuli-general",
    name: "Project Multatuli",
    description:
      "Jurnalisme pelayanan publik dan investigasi untuk masyarakat marginal",
    url: "https://projectmultatuli.org",
    rssUrl: "https://projectmultatuli.org/feed",
    category: "general",
  }),
  createSource({
    id: "alinea-general",
    name: "Alinea.id",
    description:
      "Laporan mendalam berbasis data riset tentang isu sosial, politik, dan ekonomi",
    url: "https://www.alinea.id",
    rssUrl: "https://www.alinea.id/rss",
    category: "general",
  }),
  createSource({
    id: "validnews-general",
    name: "Validnews",
    description: "Data-driven journalism untuk isu kebijakan publik dan hukum",
    url: "https://validnews.id",
    rssUrl: googleNewsSearchUrl(
      "site:validnews.id -site:validnews.id/tag -site:validnews.id/search",
    ),
    category: "general",
  }),
  createSource({
    id: "kbr-general",
    name: "KBR",
    description:
      "Kantor Berita Radio independen untuk isu HAM, demokrasi, dan toleransi",
    url: "https://kbr.id",
    rssUrl: "https://kbr.id/rss",
    category: "general",
  }),
  createSource({
    id: "detik-general",
    name: "Detik.com",
    description:
      "Media digital Indonesia yang mengutamakan kecepatan breaking news",
    url: "https://news.detik.com",
    rssUrl: "https://news.detik.com/rss",
    category: "general",
  }),
  createSource({
    id: "detik-technology",
    name: "DetikInet",
    description: "Berita teknologi dari Detik.com",
    url: "https://inet.detik.com",
    rssUrl: "https://inet.detik.com/rss",
    category: "technology",
  }),
  createSource({
    id: "detik-sports",
    name: "DetikSport Sepakbola",
    description: "Berita sepak bola dari DetikSport",
    url: "https://sport.detik.com/sepakbola",
    rssUrl: "https://sport.detik.com/sepakbola/rss",
    category: "sports",
  }),
  createSource({
    id: "cnn-general",
    name: "CNN Indonesia Nasional",
    description:
      "Berita nasional dan internasional dengan standar penyiaran global",
    url: "https://www.cnnindonesia.com/nasional",
    rssUrl: "https://www.cnnindonesia.com/nasional/rss",
    category: "general",
  }),
  createSource({
    id: "cnn-business",
    name: "CNN Indonesia Ekonomi",
    description: "Berita ekonomi dari CNN Indonesia",
    url: "https://www.cnnindonesia.com/ekonomi",
    rssUrl: "https://www.cnnindonesia.com/ekonomi/rss",
    category: "business",
  }),
  createSource({
    id: "cnn-sports",
    name: "CNN Indonesia Olahraga",
    description: "Berita olahraga dari CNN Indonesia",
    url: "https://www.cnnindonesia.com/olahraga",
    rssUrl: "https://www.cnnindonesia.com/olahraga/rss",
    category: "sports",
  }),
  createSource({
    id: "cnn-technology",
    name: "CNN Indonesia Teknologi",
    description: "Berita teknologi dari CNN Indonesia",
    url: "https://www.cnnindonesia.com/teknologi",
    rssUrl: "https://www.cnnindonesia.com/teknologi/rss",
    category: "technology",
  }),
  createSource({
    id: "cnn-entertainment",
    name: "CNN Indonesia Gaya Hidup",
    description: "Berita gaya hidup dari CNN Indonesia",
    url: "https://www.cnnindonesia.com/gaya-hidup",
    rssUrl: "https://www.cnnindonesia.com/gaya-hidup/rss",
    category: "entertainment",
  }),
  createSource({
    id: "context-general",
    name: "Context.id",
    description: "Analisis geopolitik, makroekonomi, bisnis, dan teknologi",
    url: "https://context.id",
    rssUrl: "https://context.id",
    feedType: "html",
    articlePathIncludes: ["/read/"],
    category: "general",
  }),
  createSource({
    id: "techinasia-indonesia",
    name: "Tech in Asia Indonesia",
    description:
      "Berita teknologi, startup, AI, dan ekosistem digital Asia-Indonesia",
    url: "https://www.techinasia.com/tag/indonesia",
    rssUrl: googleNewsRssUrl("techinasia.com"),
    category: "technology",
    language: "en",
  }),
  createSource({
    id: "dailysocial-technology",
    name: "DailySocial.id",
    description:
      "Ekosistem inovasi digital, software, startup, dan bisnis teknologi lokal",
    url: "https://dailysocial.id",
    rssUrl: "https://dailysocial.id/feed",
    category: "technology",
  }),
  createSource({
    id: "tirto-general",
    name: "Tirto.id",
    description:
      "Jurnalisme presisi dengan liputan komprehensif dan data visual",
    url: "https://tirto.id",
    rssUrl: googleNewsRssUrl("tirto.id"),
    category: "general",
  }),
  createSource({
    id: "cnbc-general",
    name: "CNBC Indonesia News",
    description:
      "Rujukan berita ekonomi, bisnis, investasi, dan pergerakan pasar",
    url: "https://www.cnbcindonesia.com/news",
    rssUrl: "https://www.cnbcindonesia.com/news/rss",
    category: "general",
  }),
  createSource({
    id: "cnbc-business",
    name: "CNBC Indonesia Market",
    description: "Berita market dan bisnis dari CNBC Indonesia",
    url: "https://www.cnbcindonesia.com/market",
    rssUrl: "https://www.cnbcindonesia.com/market/rss",
    category: "business",
  }),
  createSource({
    id: "cnbc-technology",
    name: "CNBC Indonesia Tech",
    description: "Berita teknologi dari CNBC Indonesia",
    url: "https://www.cnbcindonesia.com/tech",
    rssUrl: "https://www.cnbcindonesia.com/tech/rss",
    category: "technology",
  }),
  createSource({
    id: "cnbc-entertainment",
    name: "CNBC Indonesia Lifestyle",
    description: "Berita lifestyle dari CNBC Indonesia",
    url: "https://www.cnbcindonesia.com/lifestyle",
    rssUrl: "https://www.cnbcindonesia.com/lifestyle/rss",
    category: "entertainment",
  }),
  createSource({
    id: "jakpost-general",
    name: "The Jakarta Post",
    description:
      "Media berbahasa Inggris terkemuka di Indonesia untuk audiens internasional",
    url: "https://www.thejakartapost.com",
    rssUrl: "https://www.thejakartapost.com",
    feedType: "html",
    articlePathIncludes: [
      "/business/",
      "/culture/",
      "/indonesia/",
      "/life/",
      "/world/",
    ],
    category: "general",
    language: "en",
  }),
  createSource({
    id: "kumparan-general",
    name: "Kumparan",
    description:
      "Platform media digital yang menggabungkan jurnalisme dan interaksi kreator",
    url: "https://kumparan.com",
    rssUrl: googleNewsRssUrl("kumparan.com"),
    category: "general",
  }),
  createSource({
    id: "liputan6-general",
    name: "Liputan6.com News",
    description:
      "Portal berita komprehensif yang berakar dari program berita televisi SCTV",
    url: "https://www.liputan6.com/news",
    rssUrl: "https://feed.liputan6.com/rss/news",
    category: "general",
  }),
  createSource({
    id: "liputan6-business",
    name: "Liputan6.com Bisnis",
    description: "Berita bisnis dari Liputan6.com",
    url: "https://www.liputan6.com/bisnis",
    rssUrl: "https://feed.liputan6.com/rss/bisnis",
    category: "business",
  }),
  createSource({
    id: "liputan6-sports",
    name: "Liputan6.com Bola",
    description: "Berita olahraga dari Liputan6.com",
    url: "https://www.liputan6.com/bola",
    rssUrl: "https://feed.liputan6.com/rss/bola",
    category: "sports",
  }),
  createSource({
    id: "liputan6-technology",
    name: "Liputan6.com Tekno",
    description: "Berita teknologi dari Liputan6.com",
    url: "https://www.liputan6.com/tekno",
    rssUrl: "https://feed.liputan6.com/rss/tekno",
    category: "technology",
  }),
  createSource({
    id: "liputan6-entertainment",
    name: "Liputan6.com Showbiz",
    description: "Berita hiburan dari Liputan6.com",
    url: "https://www.liputan6.com/showbiz",
    rssUrl: "https://feed.liputan6.com/rss/showbiz",
    category: "entertainment",
  }),
  createSource({
    id: "katadata-general",
    name: "Katadata.co.id",
    description:
      "Portal berita dan firma riset dengan analisis data ekonomi dan bisnis",
    url: "https://katadata.co.id",
    rssUrl: "https://katadata.co.id/rss",
    category: "general",
  }),
  createSource({
    id: "mongabay-general",
    name: "Mongabay Indonesia",
    description:
      "Jurnalisme lingkungan, deforestasi, konservasi, dan keanekaragaman hayati",
    url: "https://www.mongabay.co.id",
    rssUrl: "https://www.mongabay.co.id/feed",
    category: "general",
  }),
  createSource({
    id: "betahita-general",
    name: "Betahita.id",
    description:
      "Investigasi tata ruang, pertambangan, dan konflik sumber daya alam",
    url: "https://www.betahita.id",
    rssUrl: "https://www.betahita.id",
    feedType: "html",
    articlePathIncludes: ["/berita/", "/opini/", "/sorot/", "/sosok/"],
    category: "general",
  }),
  createSource({
    id: "idntimes-general",
    name: "IDN Times",
    description: "Media berita dan hiburan untuk audiens milenial dan Gen Z",
    url: "https://www.idntimes.com",
    rssUrl: googleNewsRssUrl("idntimes.com"),
    category: "general",
  }),
  createSource({
    id: "tribunnews-general",
    name: "Tribunnews.com",
    description:
      "Jaringan jurnalis luas dengan cakupan berita lokal daerah yang kuat",
    url: "https://www.tribunnews.com",
    rssUrl: googleNewsRssUrl("tribunnews.com"),
    category: "general",
  }),
  createSource({
    id: "bisnis-general",
    name: "Bisnis.com",
    description:
      "Sumber informasi harian seputar industri, makroekonomi, dan korporasi",
    url: "https://www.bisnis.com",
    rssUrl: googleNewsRssUrl("bisnis.com"),
    category: "general",
  }),
  createSource({
    id: "narasi-general",
    name: "Narasi",
    description:
      "Media digital dengan konten video jurnalistik, opini, dan dokumenter investigasi",
    url: "https://narasi.tv",
    rssUrl: googleNewsRssUrl("narasi.tv"),
    category: "general",
  }),
  createSource({
    id: "republika-general",
    name: "Republika",
    description:
      "Media nasional arus utama dengan porsi kuat untuk komunitas Muslim",
    url: "https://www.republika.co.id",
    rssUrl: "https://www.republika.co.id/rss",
    category: "general",
  }),
  createSource({
    id: "suara-general",
    name: "Suara.com",
    description:
      "Portal berita digital independen untuk isu sosial, politik, dan gaya hidup",
    url: "https://www.suara.com",
    rssUrl: googleNewsRssUrl("suara.com"),
    category: "general",
  }),
  createSource({
    id: "asumsi-general",
    name: "Asumsi.co",
    description:
      "Media alternatif untuk analisis politik, isu sosial, dan budaya pop",
    url: "https://asumsi.co",
    rssUrl: googleNewsRssUrl("asumsi.co"),
    category: "general",
  }),
  createSource({
    id: "viva-general",
    name: "VIVA.co.id",
    description:
      "Berita terkini, dinamika politik, dan olahraga dengan bahasa mudah dicerna",
    url: "https://www.viva.co.id",
    rssUrl: "https://www.viva.co.id/get/all",
    category: "general",
  }),
  createSource({
    id: "merdeka-general",
    name: "Merdeka.com",
    description:
      "Portal berita digital dengan beragam kanal liputan harian populer",
    url: "https://www.merdeka.com",
    rssUrl: "https://www.merdeka.com/feed",
    category: "general",
  }),
  createSource({
    id: "cna-general",
    name: "CNA Indonesia",
    description: "Berita terbaru dari CNA Indonesia",
    url: "https://www.cna.id",
    rssUrl: "https://www.cna.id/api/v1/rss-outbound-feed?_format=xml",
    category: "general",
  }),
  createSource({
    id: "cna-business",
    name: "CNA Indonesia Bisnis",
    description: "Berita bisnis dari CNA Indonesia",
    url: "https://www.cna.id",
    rssUrl:
      "https://www.cna.id/api/v1/rss-outbound-feed?_format=xml&category=3321",
    category: "business",
  }),
  createSource({
    id: "cna-sports",
    name: "CNA Indonesia Olahraga",
    description: "Berita olahraga dari CNA Indonesia",
    url: "https://www.cna.id",
    rssUrl:
      "https://www.cna.id/api/v1/rss-outbound-feed?_format=xml&category=3246",
    category: "sports",
  }),
];

function createSource(source: NewsSourceInput): NewsSource {
  return {
    ...source,
    language: source.language ?? "id",
    country: "id",
  };
}

function googleNewsRssUrl(domain: string): string {
  return googleNewsSearchUrl(`site:${domain}`);
}

function googleNewsSearchUrl(query: string): string {
  const params = new URLSearchParams({
    q: query,
    hl: "id",
    gl: "ID",
    ceid: "ID:id",
  });

  return `https://news.google.com/rss/search?${params.toString()}`;
}

export function toPublicSource(source: NewsSource): PublicNewsSource {
  return {
    id: source.id,
    name: source.name,
    description: source.description ?? `${source.name} Indonesia RSS source`,
    url: source.url,
    category: source.category,
    language: source.language,
    country: source.country,
  };
}
