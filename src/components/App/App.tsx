import Layout from '../Layout/Layout';
import ReactModal from 'react-modal';
import Modal from '../Modal/Modal';
import { useSelector } from 'react-redux';
import { selectModalType } from '../../redux/modal/selectors';
import LoginForm from '../AuthorizationForms/LoginForm';
import RegisterForm from '../AuthorizationForms/RegisterForm';

ReactModal.setAppElement('#root');

export default function App() {
    const modalType = useSelector(selectModalType);
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
