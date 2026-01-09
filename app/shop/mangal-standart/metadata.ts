import { createMetadata } from "@/app/seo/createMetadata";

export const metadata = {
  ...createMetadata(
    "Мангал Стандарт",
    "Мангал Стандарт — міцний та надійний мангал товщиною 3 мм і вагою 19 кг. Знімні ніжки, дві решітки гриль та одна топка. Ідеально для приготування м’яса, риби та овочів вдома або на природі.",
    "shop/MangalStandart-700x700-social.png",
  ),
  alternates: {
    canonical: 'https://smakota.club/shop/mangal-standart',
  },
};