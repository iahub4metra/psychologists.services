import { Link } from 'react-router';
import Navigation from '../Navigation/Navigation';
import s from './Header.module.css';
import Authorization from '../Authorization/Authorization';
import UserMenu from '../UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function Header() {
    const loggedIn = useSelector(selectIsLoggedIn);

    return (
        <header>
            <div className={s.container}>
                <Link to="/" className={s.logo}>
                    psychologists.<span>servises</span>
                </Link>
                <Navigation />
                {loggedIn ? <UserMenu /> : <Authorization />}
            </div>
        </header>
    );
}
