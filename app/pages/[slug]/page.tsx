import { redirect } from "next/navigation";
import { cleanSlug, getProductBySlug } from "@/lib/products";

interface PageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

const CATEGORY_REDIRECTS: Record<string, string> = {
  "birthday-decorations": "birthday-decor",
  "kids-theme-decorations": "kids-birthday",
  "welcome-baby-decorations": "newborn-welcome",
  "baby-shower-decorations": "baby-shower",
  "romantic-decorations": "romantic",
  "ceremony-decorations": "wedding-decor",
  "anniversary-decorations": "romantic",
  "balloon-decorations": "birthday-decor",
};

export default function LegacyPagesRedirect({ params }: PageProps) {
  const targetSlug = cleanSlug(params.slug);

  if (CATEGORY_REDIRECTS[targetSlug]) {
    redirect(`/category/${CATEGORY_REDIRECTS[targetSlug]}`);
  }

  const product = getProductBySlug(targetSlug);
  redirect(`/decor/${product.slug}`);
}
