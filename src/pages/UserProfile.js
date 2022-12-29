import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const user = {};


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
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user?.name}</div>
      </div>

      <div className={styles.btnGrp}>
        <button className={`button ${styles.editBtn}`}>Add Friend</button>
        <button className={`button ${styles.editBtn}`}>Remove Friend</button>
      </div>
    </div>
  );
};

export default UserProfile;
