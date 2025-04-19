import Layout from '../Layout/Layout';
import ReactModal from 'react-modal';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalType } from '../../redux/modal/selectors';
import LoginForm from '../AuthorizationForms/LoginForm';
import RegisterForm from '../AuthorizationForms/RegisterForm';
import { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase-config';
import { logout, setUser } from '../../redux/auth/slice';

ReactModal.setAppElement('#root');

export default function App() {
    const modalType = useSelector(selectModalType);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();

                dispatch(
                    setUser({
                        name: user.displayName,
                        email: user.email,
                        token: token,
                    }),
                );
            } else {
                dispatch(logout());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);
    return (
        <div>
            <Layout />
            <Modal>
                {modalType === 'login' && <LoginForm />}
                {modalType === 'register' && <RegisterForm />}
            </Modal>
        </div>
    );
}
