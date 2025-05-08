// app/components/RecipeCard.tsx

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    slug: string;
    imageUrl?: string | null;
    createdAt: Date;
    user: {
      name: string;
    };
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <a
      href={`/recipe/${recipe.slug}`}
      className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
    >
      <img
        src={recipe.imageUrl || "/placeholder.webp"}
        alt={recipe.title}
        className="w-full aspect-[3/2] object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{recipe.title}</h2>
        <p className="text-sm text-gray-500">Автор: {recipe.user.name}</p>
        <p className="text-sm text-gray-400">
          {new Date(recipe.createdAt).toLocaleDateString("uk-UA")}
        </p>
      </div>
    </a>
  );
}
