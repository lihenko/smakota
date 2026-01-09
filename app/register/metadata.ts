import { createMetadata } from "@/app/seo/createMetadata";

export const metadata = {
  ...createMetadata(
    "Реєстрація – Смакота – Кращі домашні рецепти",
  "Зареєструйтесь, щоб додавати рецепти, коментувати та зберігати улюблене.",
  "/og-image.png"
  ),
  alternates: {
    canonical: 'https://smakota.club/register',
  },
};