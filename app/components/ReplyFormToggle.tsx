'use client';

import { useState } from 'react';
import CommentForm from './CommentForm';

interface ReplyFormToggleProps {
  recipeId: number;
  commentId: number;
}

const ReplyFormToggle: React.FC<ReplyFormToggleProps> = ({ recipeId, commentId }) => {
  const [isReplyFormVisible, setIsReplyFormVisible] = useState(false);

  const toggleReplyForm = () => {
    setIsReplyFormVisible(!isReplyFormVisible);
  };

  return (
    <div className="py-3">
      <button
        onClick={toggleReplyForm}
        className="text-blue-500 hover:underline"
      >
        {isReplyFormVisible ? 'Сховати форму' : 'Залишити відповідь'}
      </button>
      {isReplyFormVisible && (
        <div className="mt-4">
          <CommentForm recipeId={recipeId} parentId={commentId} />
        </div>
      )}
    </div>
  );
};

export default ReplyFormToggle;
