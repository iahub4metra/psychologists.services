import { FaUser } from 'react-icons/fa';
import s from './UserMenu.module.css';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/slice';
import { selectUser } from '../../redux/auth/selectors';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase-config';

export default function UserMenu() {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleLogOut = () => {
        signOut(auth);
        dispatch(logout());
    };
    return (
        <div className={s.outerContainer}>
            <div className={s.internalContainer}>
                <div className={s.iconBox}>
                    <FaUser className={s.iconUser} />
                </div>
                <p className={s.usernameTitle}>{user?.name}</p>
            </div>
            <button className={s.btnLogout} onClick={handleLogOut}>
                Log out
            </button>
        </div>
    );
}
