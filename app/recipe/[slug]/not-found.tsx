// app/recipe/[slug]/not-found.tsx
export default function NotFound() {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Рецепт не знайдено</h1>
        <p className="text-gray-500">Перевір URL або оберіть інший рецепт.</p>
      </div>
    );
  }
  