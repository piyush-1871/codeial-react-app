import PropTypes from 'prop-types';
import { toggleLike } from '../api';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/home.module.css';

const Comment = ({ comment }) => {
  const { addToast } = useToasts();
  const handleCommentLikeClick = async () => {
    const response = await toggleLike(comment._id, 'Comment');
    if (response.success) {
      if (response.data.deleted) {
        addToast('Unliked successfully!!', {
          appearance: 'success',
        });
      } else {
        addToast('Liked successfully!!', {
          appearance: 'success',
        });
      }
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };
  return (
    <div className={styles.postCommentsItem}>
      <div className={styles.postCommentHeader}>
        <span className={styles.postCommentAuthor}>{comment.user.name}</span>
        <span className={styles.postCommentTime}>a minute ago</span>
        <button className={styles.likeButton} onClick={handleCommentLikeClick}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
            alt=""
          />
        </button>
        <span className={styles.postCommentLikes}>{comment.likes.length}</span>
      </div>

      <div className={styles.postCommentContent}>{comment.content}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
