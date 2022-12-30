import React from 'react';
import styles from '../styles/home.module.css';
import { useState } from 'react';
import { addPost } from '../api';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';

function CreatePost() {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();
  const {addToast} = useToasts();

  const handleAddPostClick = async() => {
    setAddingPost(true);

    const response = await addPost(post);

    if(response.success){
        setPost('');
        posts.addPostToState(response.data.post);
        addToast('Post created successfully!',{
            appearance: 'success'
        });
    }else{
        addToast(response.message,{
            appearance: 'error'
        });
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
      placeholder='Create your post!!'
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding Post..' : 'Add Post'}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
