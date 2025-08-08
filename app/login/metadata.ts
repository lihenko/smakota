import { createMetadata } from "@/app/seo/createMetadata";

export const metadata = {
  ...createMetadata(
    "Вхід – Смакота – Кращі домашні рецепти",
  "Увійдіть до свого акаунта, щоб додавати рецепти, коментувати та зберігати улюблене.",
  "/og-image.png"
  ),
  alternates: {
    canonical: 'https://www.smakota.club/login',
  },
};