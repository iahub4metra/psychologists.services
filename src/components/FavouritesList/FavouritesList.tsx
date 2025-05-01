import { useDispatch, useSelector } from 'react-redux';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import { Psychologist } from '../App/Types';
import { AppDispatch } from '../../redux/store';
import s from './FavouritesList.module.css';
import {
    selectFavPsychologists,
    selectFetchError,
    selectHasMore,
    selectLastTimeStampFav,
} from '../../redux/favourites/selectors';
import { Filter } from '../../redux/psychologists/slice';
import { selectFilter } from '../../redux/psychologists/selectors';
import { fetchFavourites } from '../../redux/favourites/operations';
import { selectUser } from '../../redux/auth/selectors';

export default function FavouritesList() {
    const dispatch: AppDispatch = useDispatch();
    const favPsychologists = useSelector(selectFavPsychologists);
    const filter = useSelector(selectFilter);
    const lastTimeStamp = useSelector(selectLastTimeStampFav);
    const hasMore = useSelector(selectHasMore);
    const user = useSelector(selectUser);
    const fetchError = useSelector(selectFetchError);

    const filterFavPsychologists = (
        psychologists: Psychologist[],
        filter: Filter,
    ) => {
        switch (filter) {
            case 'all':
                return psychologists;
            case 'a-z':
                return psychologists
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name));
            case 'z-a':
                return psychologists
                    .slice()
                    .sort((a, b) => b.name.localeCompare(a.name));
            case 'popular':
                return psychologists
                    .slice()
                    .sort((a, b) => b.rating - a.rating);
            case 'not-popular':
                return psychologists
                    .slice()
                    .sort((a, b) => a.rating - b.rating);
            case 'higher-price':
                return psychologists
                    .slice()
                    .sort((a, b) => b.price_per_hour - a.price_per_hour);
            case 'lower-price':
                return psychologists
                    .slice()
                    .sort((a, b) => a.price_per_hour - b.price_per_hour);
            default:
                return psychologists;
        }
    };

    const filteredFavPsychologists = filterFavPsychologists(
        favPsychologists,
        filter,
    );

    const loadMore = () => {
        if (lastTimeStamp) {
            dispatch(fetchFavourites({ uid: user!.uid, lastTimeStamp }));
        }
    };

    return (
        <>
            {fetchError ? (
                <p className="text-[18px] text-[#d32f2f] text-center">
                    {typeof fetchError === 'string'
                        ? fetchError
                        : 'Failed to load favourites'}
                </p>
            ) : filteredFavPsychologists.length === 0 ? (
                <p className="text-[18px] text-center">
                    You don't have any favourite psychologists yet.
                </p>
            ) : (
                <>
                    <ul
                        className={`flex gap-8 flex-col ${s.psychologistsList}`}
                    >
                        {filteredFavPsychologists.map(
                            (psychologist: Psychologist, index) => {
                                return (
                                    <li key={index} className="@container/card">
                                        <PsychologistCard
                                            psychologist={psychologist}
                                            id={index}
                                        />
                                    </li>
                                );
                            },
                        )}
                    </ul>
                    {hasMore && (
                        <button className={s.btnLoadMore} onClick={loadMore}>
                            Load More
                        </button>
                    )}
                </>
            )}
        </>
    );
}
