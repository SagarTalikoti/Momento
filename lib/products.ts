import siteData from "./site_data.json";

export interface ProductDetail {
  slug: string;
  title: string;
  price: string;
  priceNum: number;
  originalPrice: string;
  discount: string;
  rating: string;
  reviews: string;
  image: string;
  gallery: string[];
  category: string;
  alt: string;
  description: string;
  inclusions: string[];
  setupTime: string;
  safetyNote: string;
}

export function cleanSlug(hrefOrTitle: string): string {
  if (!hrefOrTitle) return "simple-birthday-decoration";
  // Remove ./pages/ or /pages/ or /decor/ and .html
  let slug = hrefOrTitle
    .replace(/^(\.\/|\/)?(pages|decor|product)\//, "")
    .replace(/\.html$/, "")
    .trim();

  if (!slug || slug === "") {
    slug = hrefOrTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  return slug || "simple-birthday-decoration";
}

const fallbackGallery = [
  "/images/simple-birthday-decoration-1785222854831-958593.webp",
  "/images/simple-birthday-decoration-at-home-1785562375292-177235.webp",
  "/images/de3c853c-f969-4706-a549-69e17774e648.webp",
  "/images/6b732124-5506-4ca6-bb0c-40d7340ac0f4.webp",
  "/images/gold-birthday-hall-decoration-1785228066699-879821.webp",
];

// Build catalog dynamically from site_data.json
const catalogMap = new Map<string, ProductDetail>();

function parseNumber(priceStr?: string): number {
  if (!priceStr) return 1999;
  const num = parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  return isNaN(num) ? 1999 : num;
}

function processCard(card: any, categoryName: string) {
  if (!card || !card.title) return;
  const slug = cleanSlug(card.href || card.title);
  if (catalogMap.has(slug)) return;

  const priceNum = parseNumber(card.price);
  const origNum = card.originalPrice ? parseNumber(card.originalPrice) : Math.round(priceNum * 1.25);
  const discountStr = card.discount
    ? card.discount.replace(/[^0-9]/g, "") + "% OFF"
    : `${Math.round(((origNum - priceNum) / origNum) * 100)}% OFF`;

  // Gallery of 4-5 images
  const itemGallery = [
    card.image,
    ...fallbackGallery.filter((img) => img !== card.image).slice(0, 4),
  ];

  const product: ProductDetail = {
    slug,
    title: card.title,
    price: card.price || priceNum.toLocaleString("en-IN"),
    priceNum,
    originalPrice: card.originalPrice || origNum.toLocaleString("en-IN"),
    discount: discountStr,
    rating: card.rating || "4.8",
    reviews: card.reviews ? `${card.reviews}+` : "150+",
    image: card.image,
    gallery: itemGallery,
    category: categoryName,
    alt: card.alt || card.title,
    description: `Book high quality ${card.title.toLowerCase()} for your special celebration. Our professional decorators arrive with all materials including high-grade metallic balloons, fairy lights, and damage-free masking tape to create a picture-perfect surprise at your doorstep.`,
    inclusions: [
      "100+ High-grade metallic & pastel balloons (ceiling hanging & floor spread)",
      "Occasion Theme Foil Letter Banner on wall / arch frame",
      "Warm White Fairy Rice Lights (10-12 meters long)",
      "Decorative Ribbons, Rosettes & Heart/Star accents",
      "Damage-free removable painter's tape used for walls & ceilings",
      "Professional verified decorator doorstep visit & full setup included",
    ],
    setupTime: "45 – 60 minutes",
    safetyNote: "100% paint-safe removable tape used. No nails, no wall marks.",
  };

  catalogMap.set(slug, product);
}

// Populate catalog
if (siteData.carousels) {
  siteData.carousels.forEach((carousel) => {
    carousel.cards.forEach((card) => processCard(card, carousel.title));
  });
}

if (siteData.kidsSpecial) {
  siteData.kidsSpecial.forEach((card) => processCard(card, "Kids Birthday"));
}

if (siteData.romanticDecor) {
  siteData.romanticDecor.forEach((card) => processCard(card, "Romantic Anniversary"));
}

export function getAllProducts(): ProductDetail[] {
  return Array.from(catalogMap.values());
}

export function getProductBySlug(slug: string): ProductDetail {
  const normalized = cleanSlug(slug);
  if (catalogMap.has(normalized)) {
    return catalogMap.get(normalized)!;
  }

  // Loose match
  const all = Array.from(catalogMap.values());
  for (let i = 0; i < all.length; i++) {
    const item = all[i];
    if (item.slug.includes(normalized) || normalized.includes(item.slug)) {
      return item;
    }
  }

  // Fallback to "simple-birthday-decoration"
  if (catalogMap.has("simple-birthday-decoration")) {
    return catalogMap.get("simple-birthday-decoration")!;
  }

  // Default first product
  return getAllProducts()[0];
}

export function getSimilarProducts(category: string, currentSlug: string, count = 8): ProductDetail[] {
  const all = getAllProducts();
  const filtered = all.filter(
    (p) => p.slug !== currentSlug && (p.category === category || category.includes(p.category) || p.category.includes(category))
  );
  if (filtered.length >= count) return filtered.slice(0, count);

  // Fill up with others
  const others = all.filter((p) => p.slug !== currentSlug && !filtered.includes(p));
  return [...filtered, ...others].slice(0, count);
}

export function getTrendingProducts(currentSlug: string, count = 8): ProductDetail[] {
  const all = getAllProducts();
  return all.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export interface CategoryMeta {
  id: string;
  slug: string;
  title: string;
  headline: string;
  subtitle: string;
  image: string;
}

export const TOP_CATEGORIES: CategoryMeta[] = [
  {
    id: "birthday-decor",
    slug: "birthday-decor",
    title: "Birthday Decor",
    headline: "Birthday Balloon Decoration Packages",
    subtitle:
      "Explore creative birthday balloon setups at home. Same-day decorator arrival, damage-free wall tape, and picture-perfect photo backdrops.",
    image: "/images/categories/birthday-decor.webp",
  },
  {
    id: "kids-birthday",
    slug: "kids-birthday",
    title: "Kids Birthday",
    headline: "Kids Theme Birthday Balloon Decorations",
    subtitle:
      "Magical balloon themes for boys & girls — Jungle, Superhero, Princess, Cocomelon, and cartoon setups your kids will adore.",
    image: "/images/categories/kids-birthday.webp",
  },
  {
    id: "newborn-welcome",
    slug: "newborn-welcome",
    title: "Newborn Welcome",
    headline: "Newborn Baby Welcome Home Balloon Decorations",
    subtitle:
      "Welcome your little prince or princess home with tender pastel balloons, baby foil letters, and heartfelt doorstep setups.",
    image: "/images/categories/newborn-welcome.webp",
  },
  {
    id: "baby-shower",
    slug: "baby-shower",
    title: "Baby Shower",
    headline: "Baby Shower & Mom-to-Be Decorations",
    subtitle:
      "Celebrate the mom-to-be with elegant pastel balloon arches, teddy props, mom-to-be sashes, and floral ring backdrops.",
    image: "/images/categories/baby-shower.webp",
  },
  {
    id: "romantic",
    slug: "romantic",
    title: "Romantic",
    headline: "Romantic & Anniversary Balloon Decorations",
    subtitle:
      "Surprise your partner with heart arches, cabana tents, red rose petals, and warm fairy lights for an unforgettable date night.",
    image: "/images/categories/romantic.webp",
  },
  {
    id: "wedding-decor",
    slug: "wedding-decor",
    title: "Wedding Decor",
    headline: "Wedding, Haldi & Ceremony Decorations",
    subtitle:
      "Traditional floral and contemporary balloon backdrops for Haldi, Mehendi, Sangeet, and intimate celebration ceremonies.",
    image: "/images/categories/wedding-decor.webp",
  },
];

export function getCategoryMeta(categorySlug: string): CategoryMeta {
  const norm = categorySlug.toLowerCase().replace(/-decorations?$/, "").replace(/-decor$/, "");
  const found = TOP_CATEGORIES.find(
    (c) => c.slug === categorySlug || c.slug.includes(norm) || norm.includes(c.id.replace(/-decor$/, ""))
  );
  if (found) return found;

  return {
    id: categorySlug,
    slug: categorySlug,
    title: categorySlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    headline: `${categorySlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Decorations`,
    subtitle: "Professional balloon decoration services at your doorstep with 100% paint-safe removable tape.",
    image: "/images/categories/birthday-decor.webp",
  };
}

export function getProductsByCategory(categorySlug: string): ProductDetail[] {
  const all = getAllProducts();
  const slug = categorySlug.toLowerCase().replace(/-decorations?$/, "").replace(/-decor$/, "");

  if (slug.includes("birthday") && !slug.includes("kids")) {
    return all.filter(
      (p) =>
        p.category.toLowerCase().includes("birthday") ||
        p.title.toLowerCase().includes("birthday") ||
        p.slug.includes("birthday")
    );
  }

  if (slug.includes("kids")) {
    return all.filter(
      (p) =>
        p.category.toLowerCase().includes("kids") ||
        p.title.toLowerCase().includes("kids") ||
        p.title.toLowerCase().includes("champion") ||
        p.slug.includes("kids")
    );
  }

  if (slug.includes("newborn") || slug.includes("welcome")) {
    return all.filter(
      (p) =>
        p.category.toLowerCase().includes("newborn") ||
        p.category.toLowerCase().includes("welcome") ||
        p.title.toLowerCase().includes("welcome") ||
        p.title.toLowerCase().includes("baby boy") ||
        p.title.toLowerCase().includes("baby girl")
    );
  }

  if (slug.includes("baby") || slug.includes("shower")) {
    return all.filter(
      (p) =>
        p.category.toLowerCase().includes("baby shower") ||
        p.title.toLowerCase().includes("baby shower") ||
        p.title.toLowerCase().includes("shower")
    );
  }

  if (slug.includes("romantic") || slug.includes("anniversary")) {
    return all.filter(
      (p) =>
        p.category.toLowerCase().includes("romantic") ||
        p.category.toLowerCase().includes("anniversary") ||
        p.title.toLowerCase().includes("anniversary") ||
        p.title.toLowerCase().includes("romantic") ||
        p.title.toLowerCase().includes("couple") ||
        p.title.toLowerCase().includes("cabana")
    );
  }

  if (slug.includes("wedding") || slug.includes("ceremony")) {
    const list = all.filter(
      (p) =>
        p.category.toLowerCase().includes("wedding") ||
        p.category.toLowerCase().includes("ceremony") ||
        p.title.toLowerCase().includes("wedding") ||
        p.title.toLowerCase().includes("hall") ||
        p.title.toLowerCase().includes("gold") ||
        p.title.toLowerCase().includes("backdrop")
    );
    if (list.length >= 6) return list;
    return all.slice(0, 8);
  }

  const filtered = all.filter(
    (p) => p.category.toLowerCase().includes(slug) || p.title.toLowerCase().includes(slug)
  );
  return filtered.length > 0 ? filtered : all.slice(0, 8);
}
