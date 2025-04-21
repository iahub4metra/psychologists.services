import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPsychologists } from '../../redux/psychologists/operations';
import { AppDispatch } from '../../redux/store';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList';
import { selectUser } from '../../redux/auth/selectors';
import { fetchFavourites } from '../../redux/favourites/operations';

export default function Psychologists() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);
    useEffect(() => {
        if (user) {
            dispatch(fetchFavourites(user.uid));
        }
        dispatch(getPsychologists(null));
    }, [dispatch, user]);

    return (
        <div className="max-w-[1440px] w-auto mx-auto px-container">
            <PsychologistsList />
        </div>
    );
}
