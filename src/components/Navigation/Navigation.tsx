import clsx from 'clsx';
import { NavLink } from 'react-router';
import s from './Navigation.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const buildingClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(s.navLink, isActive && s.activeNavLink);
};

export default function Navigation() {
    const logedIn = useSelector(selectIsLoggedIn);

    return (
        <>
            <nav className={s.navList}>
                <NavLink className={buildingClass} to="/">
                    Home
                </NavLink>
                <NavLink className={buildingClass} to="/psychologists">
                    Psychologists
                </NavLink>
                {logedIn && (
                    <NavLink className={buildingClass} to="/favourites">
                        Favourites
                    </NavLink>
                )}
            </nav>
        </>
    );
}
