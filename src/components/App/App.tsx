import Layout from '../Layout/Layout';
import ReactModal from 'react-modal';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAppointmentPsychologist,
    selectIsModalOpen,
    selectModalType,
} from '../../redux/modal/selectors';
import LoginForm from '../AuthorizationForms/LoginForm';
import RegisterForm from '../AuthorizationForms/RegisterForm';
import { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase-config';
import { logout, setUser } from '../../redux/auth/slice';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import ModalManager from '../Modal/ModalManager';

ReactModal.setAppElement('#root');

export default function App() {
    const modalType = useSelector(selectModalType);
    const isModalOpen = useSelector(selectIsModalOpen);
    const appointmentPsychologist = useSelector(selectAppointmentPsychologist);
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
                        uid: user.uid,
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
            <ModalManager />
            <Layout />
            <Modal>
                {isModalOpen && modalType === 'login' && <LoginForm />}
                {isModalOpen && modalType === 'register' && <RegisterForm />}
                {isModalOpen && modalType === 'appointment' && (
                    <AppointmentForm psychologist={appointmentPsychologist} />
                )}
            </Modal>
        </div>
    );
}
