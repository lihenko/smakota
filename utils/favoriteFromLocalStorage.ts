/**
 * Перевіряє localStorage на наявність "pendingFavoriteRecipe".
 * Якщо є — відправляє запит на додавання до обраного і видаляє з localStorage.
 * Викликайте цю функцію після успішного логіну користувача.
 */
export async function addPendingFavoriteAfterLogin() {
  if (typeof window === "undefined") return;

  const recipeId = localStorage.getItem("pendingFavoriteRecipe");
  if (!recipeId) return;

  // Відправляємо запит на додавання до обраного
  const res = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipeId: Number(recipeId) }),
  });

  if (res.ok) {
    localStorage.removeItem("pendingFavoriteRecipe");
  }
}