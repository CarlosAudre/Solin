import { useState } from "react";
import styles from "./CommentSection.module.css";
import { MessageCircle, Send } from "lucide-react";

function CommentSection({ user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user_name: user?.full_name || "Anonymous",
      created_date: new Date(),
      content: newComment.trim(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MessageCircle className={styles.icon} />
        <h2 className={styles.title}>
          Comments ({comments.length})
        </h2>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          placeholder="Share your thoughts about this book..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={styles.textarea}
        />
        <div className={styles.buttonWrapper}>
          <button
            type="submit"
            disabled={!newComment.trim()}
            className={styles.postButton}
          >
            <Send className={styles.sendIcon} />
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className={styles.commentList}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.avatar}>
                {(comment.user_name || "U").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className={styles.username}>{comment.user_name}</p>
                <p className={styles.date}>
                  {comment.created_date.toLocaleDateString()}
                </p>
                <p className={styles.content}>{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <MessageCircle className={styles.emptyIcon} />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
