import { useDispatch, useSelector } from 'react-redux';
import {
    selectLastKey,
    selectLoading,
    selectPsychologists,
} from '../../redux/psychologists/selectors';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import { Psychologist } from '../App/Types';
import { AppDispatch } from '../../redux/store';
import { getPsychologists } from '../../redux/psychologists/operations';
import s from './PsychologistsList.module.css';

export default function PsychologistsList() {
    const dispatch: AppDispatch = useDispatch();
    const psychologists = useSelector(selectPsychologists);
    const lastKey = useSelector(selectLastKey);
    const loading = useSelector(selectLoading);

    const loadMore = () => {
        if (lastKey) {
            dispatch(getPsychologists(lastKey));
        }
    };

    return (
        <>
            <ul className={`flex gap-8 flex-col ${s.psychologistsList}`}>
                {psychologists.map((psychologist: Psychologist, index) => {
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
            {loading ? (
                <p>Loading...</p>
            ) : (
                lastKey && (
                    <button className={s.btnLoadMore} onClick={loadMore}>
                        Load More
                    </button>
                )
            )}
        </>
    );
}
//  <PsychologistCard psychologist={psychologist} id={index} />
