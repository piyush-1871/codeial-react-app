import { useEffect, useState } from 'react';
// shub0107@gmail.com 123456
import { Link } from 'react-router-dom';
import { Comment, Loader } from '../components';
import { getPosts } from '../api';
import styles from '../styles/home.module.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              <Link to={`/user/${post.user._id}`}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt=""
              />
              </Link>
              <div>
                <Link
                  to={`/user/${post.user._id}`}
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.conent}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
                  alt=""
                />
                <span>5</span>
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
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
