import type { AuthUserData } from "@store/services/recipesApi";
import styles from "./auth-user.module.scss";

type AuthUserProps = {
  user: AuthUserData;
  logout: () => void;
  className?: string;
};

const AuthUser = ({ user, logout, className }: AuthUserProps) => {
  const { displayName, email } = user;
  return (
    <>
      {user ? (
        <div
          className={`${className} flex items-center gap-4 ml-auto shrink-0`}
        >
          <div className={styles.userPill}>
            <div className={styles.avatar}>{displayName?.slice(0, 1)}</div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{displayName}</div>
              <div className={styles.userEmail}>{email}</div>
            </div>
          </div>
          <button
            className={`${styles.btnAuth} ${styles.logout}`}
            type="button"
            onClick={logout}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M5 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3M10 10l3-3-3-3M13 7H5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Log Out
          </button>
        </div>
      ) : (
        <button
          className={`${styles.btnAuth} ${styles.logout}`}
          type="button"
          onClick={logout}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3M10 10l3-3-3-3M13 7H5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Log Out
        </button>
      )}
    </>
  );
};

export default AuthUser;
