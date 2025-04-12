import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import s from './Authorization.module.css';
import { openModal } from '../../redux/modal/slice';

export default function Authorization() {
  const dispatch: AppDispatch = useDispatch();

  return (
    <ul className={s.btnsList}>
      <li>
        <button
          className={s.btnLogin}
          onClick={() => dispatch(openModal('login'))}
        >
          Log In
        </button>
      </li>
      <li>
        <button
          className={s.btnRegister}
          onClick={() => dispatch(openModal('register'))}
        >
          Registration
        </button>
      </li>
    </ul>
  );
}
