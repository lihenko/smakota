import { createMetadata } from "@/app/seo/createMetadata";

export const metadata = {
  ...createMetadata(
    'Автоклав "ЧЕ" - Газовий',
    "Автоклав &#39;ЧЕ&#39; газовий для домашньої консервації. Надійний, безпечний, на 8-40 банок. Зберігайте смак та корисні властивості продуктів.",
    "shop/che8gazikonka-1400x1400.webp",
  ),
  alternates: {
    canonical: 'https://www.smakota.club/shop/autoclav-che-gas',
  },
};