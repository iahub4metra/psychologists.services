import { FaUser } from "react-icons/fa"
import s from './UserMenu.module.css'

export default function UserMenu() {
  return (
        <div className={s.outerContainer}>
          <div className={s.internalContainer}>
              <div className={s.iconBox}>
                  <FaUser className={s.iconUser} />
              </div>
              <p className={s.usernameTitle}>
                  Username
              </p>
          </div>
          <button className={s.btnLogout}>Log out</button>
        </div>
  );
}