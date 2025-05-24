'use client';

import dynamic from 'next/dynamic';

const RecipesList = dynamic(() => import('./RecipesList'));
const CommentsList = dynamic(() => import('./CommentsList'));

export default function UserClientContent({ slug }: { slug: string }) {
  return (
    <>
      
        <RecipesList slug={slug} />

      
        <CommentsList slug={slug} />

    </>
  );
}
