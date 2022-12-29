import styles from '../styles/settings.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components/';
import { useAuth } from '../hooks';
const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(flase);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();
  const auth = useAuth();

  console.log('userId', userId);
  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      console.log(response);
      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return history.push('/');
      }

      setLoading(false);
    };
    getUser();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;

    const frinedIds = friends.map((friend) => friend.to_user._id);
    const index = frinedIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleRemoveFriendClick = async (userId) => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userId
      );
      auth.updateUserFriends(false, friendship[0]);
      addToast('Friend removed successfully', {
        appearance: 'success',
      });
    } else {
      addToast('response.message', {
        appearance: 'error',
      });
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;

      auth.updateUserFriends(true, friendship);
      addToast('Friend added successfully', {
        appearance: 'success',
      });
    } else {
      addToast('response.message', {
        appearance: 'error',
      });
    }
    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.editBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Removing friend...' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
