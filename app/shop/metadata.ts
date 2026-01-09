import { createMetadata } from "@/app/seo/createMetadata";

export const metadata = {
  ...createMetadata(
    "Крамниця – Смакота – Кращі домашні рецепти",
    "Обирайте товари для кухні на Smakota.club — українському кулінарному сайті, де можна створювати власну книгу рецептів, зберігати улюблені страви та готувати із задоволенням.",
    "/og-image.png"
  ),
  alternates: {
    canonical: 'https://smakota.club/shop',
  },
};