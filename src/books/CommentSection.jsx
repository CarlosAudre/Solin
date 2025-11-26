import { useState } from "react";
import styles from "./CommentSection.module.css";
import { MessageCircle, Send, Loader2, ChevronDown } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBookComments, createComment, getCurrentUser } from "../services/api";

const COMMENTS_PER_PAGE = 5;

function CommentSection({ bookId }) {
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  // Busca usuário atual
  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  // Busca comentários com paginação
  const { data: comments = [], isLoading, isFetching } = useQuery({
    queryKey: ["comments", bookId, page],
    queryFn: () => getBookComments(bookId, COMMENTS_PER_PAGE, page * COMMENTS_PER_PAGE),
    enabled: !!bookId,
  });

  // Mutation para criar comentário
  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", bookId]);
      setNewComment("");
      setPage(0); // Volta para a primeira página ao adicionar novo comentário
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    createCommentMutation.mutate({
      book_key: bookId,
      content: newComment.trim(),
    });
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "agora mesmo";
    if (diffInSeconds < 3600) return `há ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `há ${Math.floor(diffInSeconds / 3600)} horas`;
    if (diffInSeconds < 604800) return `há ${Math.floor(diffInSeconds / 86400)} dias`;

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MessageCircle className={styles.icon} />
        <h2 className={styles.title}>
          Comments {!isLoading && `(${comments.length}${comments.length === COMMENTS_PER_PAGE ? '+' : ''})`}
        </h2>
      </div>

      {/* Add Comment Form */}
      {user && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            placeholder="Share your thoughts about this book..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={styles.textarea}
            maxLength={2000}
          />
          <div className={styles.buttonWrapper}>
            <span className={styles.charCount}>
              {newComment.length}/2000
            </span>
            <button
              type="submit"
              disabled={!newComment.trim() || createCommentMutation.isPending}
              className={styles.postButton}
            >
              {createCommentMutation.isPending ? (
                <>
                  <Loader2 className={`${styles.sendIcon} animate-spin`} />
                  Posting...
                </>
              ) : (
                <>
                  <Send className={styles.sendIcon} />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Comments List */}
      <div className={styles.commentList}>
        {isLoading && page === 0 ? (
          <div className={styles.loadingContainer}>
            <Loader2 size={32} className="animate-spin" style={{ color: '#6b1830' }} />
            <p>Loading comments...</p>
          </div>
        ) : comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.avatar}>
                  {(comment.username || "U").charAt(0).toUpperCase()}
                </div>
                <div className={styles.commentContent}>
                  <div className={styles.commentHeader}>
                    <p className={styles.username}>{comment.username}</p>
                    <p className={styles.date}>
                      {formatDate(comment.created_at)}
                    </p>
                  </div>
                  <p className={styles.content}>{comment.content}</p>
                </div>
              </div>
            ))}

            {/* Load More Button */}
            {comments.length === COMMENTS_PER_PAGE && (
              <div className={styles.loadMoreContainer}>
                <button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className={styles.loadMoreButton}
                >
                  {isFetching ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} />
                      Load More Comments
                    </>
                  )}
                </button>
              </div>
            )}
          </>
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
