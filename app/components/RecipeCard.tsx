// app/components/RecipeCard.tsx

import StarDisplay from "./StarDisplay";
import CommentCountDisplay from "./CommentCountDisplay";
import styles from './RecipeCard.module.css';

interface RecipeCardProps {
  recipe: {
    privaterecipe: any;
    moderated: any;
    id: number;
    title: string;
    slug: string;
    imageUrl?: string | null;
    createdAt: Date;
    averageRating: number | null;
    commentCount: number | null;
    user: {
      name: string;
    };
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <a
      href={`/recipe/${recipe.slug}`}
      className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
    >
      <div className="relative">
        <img
            src={recipe.imageUrl || "/recipes/placeholder.webp"}
            alt={recipe.title}
            className="w-full aspect-[3/2] object-cover"
          />
          {recipe.privaterecipe && (
              <span className={styles.recipelabel}>
                Приватний
              </span>
          )}
          {!recipe.moderated && !recipe.privaterecipe && (
            <span className={styles.recipelabel}>
              На модерації
            </span>
          )}
      </div>
      
      
      <div className="px-4 pt-4 pb-10">
        <h2 className="text-lg font-semibold">{recipe.title}</h2>
        <p className="text-sm text-gray-500">Автор: {recipe.user.name}</p>
        <p className="text-sm text-gray-400">
          {new Date(recipe.createdAt).toLocaleDateString("uk-UA")}
        </p>
        <div className="absolute bottom-4 flex gap-2 items-center">
          { typeof recipe.averageRating === 'number' && recipe.averageRating > 0 && typeof recipe.commentCount === 'number'  && (
            <>
              <StarDisplay rating={recipe.averageRating} />
              <CommentCountDisplay count={recipe.commentCount} />
            </>
            
          )}
          
        </div>
      </div>
    </a>
  );
}
