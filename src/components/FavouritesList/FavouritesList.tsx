import { useDispatch, useSelector } from 'react-redux';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import { Psychologist } from '../App/Types';
import { AppDispatch } from '../../redux/store';
import { getPsychologists } from '../../redux/psychologists/operations';
import s from './FavouritesList.module.css';
import {
    selectFavPsychologists,
    selectLastKeyFav,
} from '../../redux/favourites/selectors';

export default function FavouritesList() {
    const dispatch: AppDispatch = useDispatch();
    const favPsychologists = useSelector(selectFavPsychologists);
    const lastKey = useSelector(selectLastKeyFav);

    const loadMore = () => {
        if (lastKey) {
            dispatch(getPsychologists(lastKey));
        }
    };

    return (
        <>
            <ul className={`flex gap-8 flex-col ${s.psychologistsList}`}>
                {favPsychologists.map((psychologist: Psychologist, index) => {
                    return (
                        <li key={index} className="@container/card">
                            <PsychologistCard
                                psychologist={psychologist}
                                id={index}
                            />
                        </li>
                    );
                })}
            </ul>
            {lastKey && (
                <button className={s.btnLoadMore} onClick={loadMore}>
                    Load More
                </button>
            )}
        </>
    );
}
