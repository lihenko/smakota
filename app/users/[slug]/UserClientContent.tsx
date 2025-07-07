'use client';

import dynamic from 'next/dynamic';

const RecipesList = dynamic(() => import('./RecipesList'));
const CommentsList = dynamic(() => import('./CommentsList'));

interface UserClientContentProps {
  slug: string;
  currentUserId: number | null;
  favoriteIds: number[];
}

export default function UserClientContent({
  slug,
  currentUserId,
  favoriteIds,
}: UserClientContentProps) {
  return (
    <>
      <RecipesList
        slug={slug}
        currentUserId={currentUserId}
        favoriteIds={favoriteIds}
      />
      <CommentsList slug={slug} />
    </>
  );
}
