import Layout from '../Layout/Layout';
import ReactModal from 'react-modal';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectAppointmentPsychologist,
    selectAppointmentSnackBar,
    selectErrorAppointmentSnackBar,
    selectIsModalOpen,
    selectModalType,
} from '../../redux/modal/selectors';
import LoginForm from '../AuthorizationForms/LoginForm';
import RegisterForm from '../AuthorizationForms/RegisterForm';
import { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebase-config';
import { logout, setError, setUser } from '../../redux/auth/slice';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import ModalManager from '../Modal/ModalManager';
import { selectError } from '../../redux/auth/selectors';
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { resetAppointmentSnackBars } from '../../redux/modal/slice';

ReactModal.setAppElement('#root');

export default function App() {
    const modalType = useSelector(selectModalType);
    const isModalOpen = useSelector(selectIsModalOpen);
    const appointmentPsychologist = useSelector(selectAppointmentPsychologist);
    const dispatch: AppDispatch = useDispatch();
    const error = useSelector(selectError);
    const appointmentError = useSelector(selectErrorAppointmentSnackBar);
    const appointmentSnackBarSuccess = useSelector(selectAppointmentSnackBar);

    const handleClose = (_: unknown, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setError(false));
        dispatch(resetAppointmentSnackBars());
    };

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
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Something went wrong. Try reloading the page.
                </Alert>
            </Snackbar>
            <Snackbar
                open={appointmentError}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Something went wrong. Try reloading the page.
                </Alert>
            </Snackbar>
            <Snackbar
                open={appointmentSnackBarSuccess}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Success! A psychologist will contact you shortly.
                </Alert>
            </Snackbar>
        </div>
    );
}
