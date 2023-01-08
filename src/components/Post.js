import React from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './';
import { useState } from 'react';

function Post({ post }) {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        addToast('Comment created successfully!!', {
          appearance: 'success',
        });
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }
      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, 'Post');
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
  console.log(post);
  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />

          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button className={styles.likeButton} onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
                alt=""
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
              alt=""
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
