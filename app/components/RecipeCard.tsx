import Image from 'next/image';
import StarDisplay from "./StarDisplay";
import CommentCountDisplay from "./CommentCountDisplay";
import styles from './RecipeCard.module.css';
import FavoriteButton from "./FavoriteButton";
import Link from 'next/link';

interface RecipeCardProps {
  recipe: {
    privaterecipe: boolean;
    moderated: boolean;
    id: number;
    title: string;
    slug: string;
    imageUrl?: string | null;
    createdAt: Date;
    averageRating: number | null;
    commentCount: number | null;
    user: {
      name: string;
      slug: string;
    };
  };
  userId: number | null;
  isInitiallyFavorite: boolean;
}

export default function RecipeCard({ recipe, userId, isInitiallyFavorite }: RecipeCardProps) {
  const imageSrc = recipe.imageUrl || "/recipes/placeholder.webp";

  return (
    <Link
      href={`/recipe/${recipe.slug}`}
      className="block bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative"
    >
      <div className="relative w-full aspect-[3/2]">
        <Image
          src={imageSrc}
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <FavoriteButton
          recipeId={recipe.id}
          userId={userId}
          isInitiallyFavorite={isInitiallyFavorite}
        />
        {recipe.privaterecipe && (
          <span className={styles.recipelabel}>Приватний</span>
        )}
        {!recipe.moderated && !recipe.privaterecipe && (
          <span className={styles.recipelabel}>На модерації</span>
        )}
      </div>

      <div className="px-4 pt-4 pb-10">
        <h2 className="text-lg font-semibold">{recipe.title}</h2>
        <p className="text-sm text-gray-500">Автор: {" "}
          <Link
            href={`/users/${recipe.user.slug}`}
            className="hover:text-black transition"
          >
            {recipe.user.name}
          </Link>
        </p>
        <p className="text-sm text-gray-400">
          {new Date(recipe.createdAt).toLocaleDateString("uk-UA")}
        </p>
        <div className="absolute bottom-4 flex gap-2 items-center">
          {typeof recipe.averageRating === 'number' && recipe.averageRating > 0 && typeof recipe.commentCount === 'number' && (
            <>
              <StarDisplay rating={recipe.averageRating} />
              <CommentCountDisplay count={recipe.commentCount} />
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
