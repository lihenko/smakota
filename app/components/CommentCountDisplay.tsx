'use client';

type CommentCountDisplayProps = {
  count: number;
};

function getUkrainianPlural(count: number): string {
  const rem10 = count % 10;
  const rem100 = count % 100;

  if (rem10 === 1 && rem100 !== 11) return 'відгук';
  if ([2, 3, 4].includes(rem10) && ![12, 13, 14].includes(rem100)) return 'відгуки';
  return 'відгуків';
}

export default function CommentCountDisplay({ count }: CommentCountDisplayProps) {
  return (
    <div className="text-sm">
      {count} {getUkrainianPlural(count)}
    </div>
  );
}
