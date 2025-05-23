import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPsychologists } from '../../redux/psychologists/operations';
import { AppDispatch } from '../../redux/store';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList';
import { selectUser } from '../../redux/auth/selectors';
import { fetchFavourites } from '../../redux/favourites/operations';
import Filters from '../../components/Filters/Filters';

export default function Psychologists() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUser);

    useEffect(() => {
        dispatch(getPsychologists(null));
    }, [dispatch]);
    useEffect(() => {
        if (user) {
            dispatch(fetchFavourites({ uid: user.uid }));
        }
    }, [dispatch, user]);

    return (
        <div className="max-w-[1440px] w-auto mx-auto px-container">
            <Filters />
            <PsychologistsList />
        </div>
    );
}
