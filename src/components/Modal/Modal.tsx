import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsModalOpen } from '../../redux/modal/selectors';
import { AppDispatch } from '../../redux/store';
import { closeModal } from '../../redux/modal/slice';
import { IoIosClose } from 'react-icons/io';
import s from './Modal.module.css';

interface ModalProps {
    children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
    const isModalOpen = useSelector(selectIsModalOpen);
    const dispatch: AppDispatch = useDispatch();

    const handleClose = () => dispatch(closeModal());

    return (
        <ReactModal
            isOpen={isModalOpen}
            onRequestClose={handleClose}
            style={{
                overlay: { backgroundColor: '#191A1599' },
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(1)',
                    display: 'flex',
                },
            }}
            className={`w-full bg-[#FBFBFB] rounded-[30px] ${s.modal}`}
        >
            <button>
                <IoIosClose
                    className="w-8 h-8 absolute top-[20px] right-[20px] cursor-pointer transition-all ease-[cubic-bezier(0.445, 0.05, 0.55, 0.95)] duration-300 hover:rotate-[180deg]"
                    onClick={() => handleClose()}
                />
            </button>
            {children}
        </ReactModal>
    );
}
