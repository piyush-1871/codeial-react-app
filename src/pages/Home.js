import { useEffect, useState } from 'react';
// shub0107@gmail.com 123456
import { Link } from 'react-router-dom';
import { Comment, CreatePost, FriendsList, Loader } from '../components';
import { getPosts } from '../api';
import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';

const Home = () => {
  const auth = useAuth();
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
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />

        {posts.map((post) => (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
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
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
                    alt=""
                  />
                  <span>
                    {post.likes.length}
                  </span>
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
      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
