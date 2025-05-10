import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
    selectFavPsychologists,
    selectWasFetched,
} from '../../redux/favourites/selectors';
import { selectUser } from '../../redux/auth/selectors';
import { useEffect } from 'react';
import { fetchFavourites } from '../../redux/favourites/operations';
import FavouritesList from '../../components/FavouritesList/FavouritesList';
import Filters from '../../components/Filters/Filters';

export default function FavouritesPage() {
    const dispatch: AppDispatch = useDispatch();
    const favPsychologists = useSelector(selectFavPsychologists);
    const user = useSelector(selectUser);
    const wasFetched = useSelector(selectWasFetched);

    useEffect(() => {
        if (favPsychologists.length === 0 && !wasFetched && user) {
            dispatch(fetchFavourites({ uid: user!.uid, lastTimeStamp: null }));
        }
    }, [dispatch, user, wasFetched, favPsychologists]);
    return (
        <div className="max-w-[1440px] w-auto mx-auto px-container">
            <Filters />
            <FavouritesList />
        </div>
    );
}
