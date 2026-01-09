import { createMetadata } from "@/app/seo/createMetadata";

export const metadata = {
  ...createMetadata(
    "Про нас – Смакота – Кращі домашні рецепти",
    "Smakota.club — український кулінарний сайт, де ви можете створити власну книгу рецептів, зберігати улюблені страви, ділитися ними та шукати рецепти за інгредієнтами. Усе — виключно українською мовою.",
    "/og-image.png"
  ),
  alternates: {
    canonical: 'https://smakota.club/about',
  },
};