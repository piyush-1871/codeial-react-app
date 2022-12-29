import styles from '../styles/settings.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchUserProfile } from '../api';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components/';
import { useAuth } from '../hooks';
const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
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
  const showAddFriendsBtn = checkIfUserIsAFriend();

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
          <button className={`button ${styles.editBtn}`}>Remove Friend</button>
        ) : (
          <button className={`button ${styles.editBtn}`}>Add Friend</button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
