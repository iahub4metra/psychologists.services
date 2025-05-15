import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectFavPsychologists } from '../../redux/favourites/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { useEffect, useRef } from 'react';
import { fetchFavourites } from '../../redux/favourites/operations';
import FavouritesList from '../../components/FavouritesList/FavouritesList';
import Filters from '../../components/Filters/Filters';

export default function FavouritesPage() {
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);
    const favPsychologists = useSelector(selectFavPsychologists);
    const hasFetchedOnce = useRef(false);

    useEffect(() => {
        if (hasFetchedOnce.current || !user) return;

        if (favPsychologists.length === 0) {
            dispatch(fetchFavourites({ uid: user.uid }));
            hasFetchedOnce.current = true;
        }
    }, [dispatch, user, favPsychologists]);
    return (
        <div className="max-w-[1440px] w-auto mx-auto px-container">
            <Filters />
            <FavouritesList />
        </div>
    );
}
