import s from "./Authorization.module.css"

export default function Authorization() {
  return (
    <ul className={s.btnsList}>
        <li>
            <button className={s.btnLogin}>
                Log In
            </button>
        </li>
        <li>
            <button className={s.btnRegister}>
                Registration
            </button>
        </li>
    </ul>
  );
}