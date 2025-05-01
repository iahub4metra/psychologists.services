import { useDispatch, useSelector } from 'react-redux';
import {
    selectError,
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
import { Skeleton } from '@mui/material';

export default function PsychologistsList() {
    const dispatch: AppDispatch = useDispatch();
    const psychologists = useSelector(selectPsychologists);
    const lastKey = useSelector(selectLastKey);
    const loading = useSelector(selectLoading);
    const filter = useSelector(selectFilter);
    const hasMore = useSelector(selectHasMoreNormal);
    const error = useSelector(selectError);
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
            {error ? (
                <p className="text-[18px] text-[#d32f2f] text-center">
                    {error}
                </p>
            ) : (
                <>
                    <ul
                        className={`flex gap-8 flex-col ${s.psychologistsList}`}
                    >
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
                    {loading
                        ? Array.from({ length: 3 }).map((_, index) => (
                              <div key={index} className="@container/card mb-8">
                                  <div
                                      className="rounded-[12px] p-[24px] flex gap-6 @max-[500px]:flex-col"
                                      style={{
                                          backgroundColor: 'var(--White)',
                                      }}
                                  >
                                      <div>
                                          <div
                                              className="p-3 border-[2px] rounded-[30px] max-w-[120px]"
                                              style={{
                                                  borderColor:
                                                      'var(--Photo-border)',
                                              }}
                                          >
                                              <Skeleton
                                                  variant="rounded"
                                                  width={96}
                                                  height={96}
                                                  sx={{ borderRadius: '15px' }}
                                              />
                                          </div>
                                      </div>

                                      <div className="flex-1 w-full">
                                          <div className="flex justify-between mb-6 flex-wrap">
                                              <div className="flex flex-col gap-2">
                                                  <Skeleton
                                                      width={100}
                                                      height={20}
                                                  />
                                                  <Skeleton
                                                      width={160}
                                                      height={28}
                                                  />
                                              </div>
                                              <div className="flex gap-4 items-center">
                                                  <Skeleton
                                                      width={120}
                                                      height={20}
                                                  />
                                                  <Skeleton
                                                      variant="circular"
                                                      width={26}
                                                      height={26}
                                                  />
                                              </div>
                                          </div>

                                          <div className="flex flex-wrap gap-2 mb-4">
                                              {Array.from({ length: 4 }).map(
                                                  (_, idx) => (
                                                      <Skeleton
                                                          key={idx}
                                                          variant="rounded"
                                                          width={140}
                                                          height={36}
                                                      />
                                                  ),
                                              )}
                                          </div>

                                          <Skeleton height={60} />
                                      </div>
                                  </div>
                              </div>
                          ))
                        : hasMore && (
                              <button
                                  className={s.btnLoadMore}
                                  onClick={loadMore}
                              >
                                  Load More
                              </button>
                          )}
                </>
            )}
        </>
    );
}
