import { Link } from "react-router";
import Navigation from "../Navigation/Navigation";
import s from './Header.module.css'
import Authorization from "../Authorization/Authorization";
import UserMenu from "../UserMenu/UserMenu";

export default function Header() {
    const logedIn = false
  return (
      <header>
          <div className={s.container}>
                <Link to="/" className={s.logo}>psychologists.<span>servises</span></Link>
              <Navigation />
              {logedIn ? <UserMenu/> : <Authorization/>}
          </div>
      </header>
  );
}