import { useDispatch, useSelector } from 'react-redux';
import {
    selectFilter,
    selectHasMoreNormal,
    selectLastKey,
    selectLoading,
    selectPsychologists,
} from '../../redux/psychologists/selectors';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import { Psychologist } from '../App/Types';
import { AppDispatch } from '../../redux/store';
import { getPsychologists } from '../../redux/psychologists/operations';
import s from './PsychologistsList.module.css';
import { Filter } from '../../redux/psychologists/slice';

export default function PsychologistsList() {
    const dispatch: AppDispatch = useDispatch();
    const psychologists = useSelector(selectPsychologists);
    const lastKey = useSelector(selectLastKey);
    const loading = useSelector(selectLoading);
    const filter = useSelector(selectFilter);
    const hasMore = useSelector(selectHasMoreNormal);
    const filterPsychologists = (
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

    const filteredPsychologists = filterPsychologists(psychologists, filter);
    const loadMore = () => {
        if (lastKey) {
            dispatch(getPsychologists(lastKey));
        }
    };

    return (
        <>
            <ul className={`flex gap-8 flex-col ${s.psychologistsList}`}>
                {filteredPsychologists.map(
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
            {loading ? (
                <p>Loading...</p>
            ) : (
                hasMore && (
                    <button className={s.btnLoadMore} onClick={loadMore}>
                        Load More
                    </button>
                )
            )}
        </>
    );
}
