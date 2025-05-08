interface StarDisplayProps {
    rating: number;
  }
  
  export default function StarDisplay({ rating }: StarDisplayProps) {
    return (
      <div className="text-yellow-500 text-lg leading-none">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>{star <= rating ? '★' : '☆'}</span>
        ))}
      </div>
    );
  }
  