import { useEffect, useRef, useState } from "react";
import type { AuthUserData } from "@store/services/recipesApi";
import { useWindowResize } from "@hooks/useWindowResize";
import styles from "./auth-user.module.scss";

type AuthUserProps = {
  user: AuthUserData;
  logout: () => void;
  className?: string;
};

const AuthUser = ({ user, logout, className }: AuthUserProps) => {
  const { displayName, email } = user;
  const { isMobile } = useWindowResize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const initial = displayName?.slice(0, 1) ?? email?.slice(0, 1) ?? "U";

  const containerClassName = [
    styles.container,
    isMobile ? styles.mobileContainer : styles.desktopContainer,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const avatarClassName = [
    styles.avatar,
    isMobile ? styles.mobileAvatar : styles.desktopAvatar,
  ].join(" ");

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isMenuOpen]);

  const handleToggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  return (
    <>
      {user ? (
        <div ref={menuRef} className={containerClassName}>
          {isMobile ? (
            <button
              type="button"
              className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ""}`}
              onClick={handleToggleMenu}
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              aria-label="Account"
            >
              <span className={avatarClassName}>{initial}</span>
            </button>
          ) : (
            <button className={styles.userPill} type="button">
              <div className={avatarClassName}>{initial}</div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>{displayName}</div>
                <div className={styles.userEmail}>{email}</div>
              </div>
            </button>
          )}

          {isMobile && isMenuOpen && (
            <div className={styles.mobileMenu}>
              <div className={styles.mobileMenuHeader}>
                <div className={styles.mobileMenuAvatar}>{initial}</div>
                <div className={styles.mobileMenuInfo}>
                  <div className={styles.mobileMenuName}>{displayName}</div>
                  <div className={styles.mobileMenuEmail}>{email}</div>
                </div>
              </div>
              <button
                className={styles.mobileLogoutButton}
                type="button"
                onClick={handleLogout}
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
          )}

          {!isMobile && (
            <button
              className={`${styles.btnAuth} ${styles.logout}`}
              type="button"
              onClick={handleLogout}
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
        </div>
      ) : (
        <button
          className={`${styles.btnAuth} ${styles.logout}`}
          type="button"
          onClick={handleLogout}
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
