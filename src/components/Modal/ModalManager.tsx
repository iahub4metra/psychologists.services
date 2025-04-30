import { useSelector } from 'react-redux';
import { selectIsModalOpen } from '../../redux/modal/selectors';
import { useEffect } from 'react';

export default function ModalManager() {
    const isModalOpen = useSelector(selectIsModalOpen);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    return null;
}
