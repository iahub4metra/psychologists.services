import { IoMdStar } from 'react-icons/io';
import { HiOutlineHeart } from 'react-icons/hi2';
import clsx from 'clsx';
import { Psychologist } from '../App/Types';
import s from './PsychologistCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { selectOpenCardId } from '../../redux/psychologists/selectors';
import { toggleReviews } from '../../redux/psychologists/slice';
import { selectFavPsychologists } from '../../redux/favourites/selectors';
import {
    addFavouriteToDb,
    removeFavouriteToDb,
} from '../../redux/favourites/operations';
import { selectUser } from '../../redux/auth/selectors';
import {
    addFavPsychologistToState,
    removeFavPsychologistToState,
} from '../../redux/favourites/slice';
import { openModal, setAppointmentPsychologist } from '../../redux/modal/slice';

export interface PsychologistCardProps {
    psychologist: Psychologist;
    id: number;
}

export default function PsychologistCard({
    psychologist,
    id,
}: PsychologistCardProps) {
    const dispatch: AppDispatch = useDispatch();
    const openCardId = useSelector(selectOpenCardId);
    const user = useSelector(selectUser);
    const favouritePsychologists = useSelector(selectFavPsychologists);
    const isReviewsOpen = openCardId === id;

    const isFav = favouritePsychologists.some(
        (item) => item.id === psychologist.id,
    );

    const handleToggleReviews = () => {
        dispatch(toggleReviews(id));
    };

    const handleAddFav = (id: string) => {
        if (user) {
            const index = favouritePsychologists.findIndex(
                (psychologist) => psychologist.id === id,
            );

            if (index >= 0) {
                dispatch(
                    removeFavouriteToDb({
                        uid: user.uid,
                        psychologist: psychologist,
                    }),
                );
                dispatch(removeFavPsychologistToState(psychologist.id));
            } else {
                dispatch(
                    addFavouriteToDb({
                        uid: user.uid,
                        psychologist: psychologist,
                    }),
                );
                dispatch(addFavPsychologistToState(psychologist));
            }
        }
    };

    const handleAppointment = () => {
        dispatch(setAppointmentPsychologist(psychologist));
        dispatch(openModal('appointment'));
    };

    return (
        <div
            className=" rounded-[12px] p-[24px] flex gap-6 @max-[500px]:flex-col"
            style={{ backgroundColor: 'var(--White)' }}
        >
            <div>
                <div
                    className="p-3 border-[2px] rounded-[30px] max-w-[120px]"
                    style={{ borderColor: 'var(--Photo-border)' }}
                >
                    <img
                        className=" max-w-24 w-auto max-h-24 b rounded-[15px]"
                        src={psychologist.avatar_url}
                        alt="Psychologist`s photo"
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-6 flex-wrap">
                    <div>
                        <p className="text-[#8A8A89] text-base mb-2">
                            Psychologist
                        </p>
                        <h3 className={`text-[1.5rem] ${s.psychologistName}`}>
                            {psychologist.name}
                        </h3>
                    </div>
                    <div className="flex gap-7 align-baseline">
                        <ul className="flex responsive-gap">
                            <li>
                                <p className="flex items-center">
                                    <span>
                                        <IoMdStar className="fill-[#FFC531] mr-[8px] w-[16px]" />
                                    </span>
                                    Rating: {psychologist.rating.toFixed(1)}
                                </p>
                            </li>
                            <li className="text-[#191A1533]">|</li>
                            <li>
                                <p className="text-base">
                                    Price / 1 hour:{' '}
                                    <span className="text-base text-[#38CD3E]">
                                        {psychologist.price_per_hour}$
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <button
                            className="p-0 cursor-pointer"
                            onClick={() => handleAddFav(psychologist.id)}
                        >
                            <HiOutlineHeart
                                className={`w-[26px] h-[26px] ${clsx(
                                    isFav && `stroke-[#54BE96] fill-[#54BE96]`,
                                )}`}
                            />
                        </button>
                    </div>
                </div>

                <ul
                    className={`flex flex-wrap gap-x-[4px] gap-y-[8px] w-full ${s.infoList}`}
                >
                    <li className="rounded-[24px] px-[16px] py-[8px] bg-[#F3F3F3]">
                        <p className="text-[#8A8A89] text-base">
                            Experience:
                            <span className="text-[#191A15]">
                                {psychologist.experience}
                            </span>
                        </p>
                    </li>
                    <li className="rounded-[24px] px-[16px] py-[8px] bg-[#F3F3F3]">
                        <p className="text-[#8A8A89] text-base">
                            License:
                            <span className="text-[#191A15]">
                                {psychologist.license}
                            </span>
                        </p>
                    </li>
                    <li className="rounded-[24px] px-[16px] py-[8px] bg-[#F3F3F3]">
                        <p className="text-[#8A8A89] text-base">
                            Specialization:
                            <span className="text-[#191A15]">
                                {psychologist.specialization}
                            </span>
                        </p>
                    </li>
                    <li className="rounded-[24px] px-[16px] py-[8px] bg-[#F3F3F3]">
                        <p className="text-[#8A8A89] text-base">
                            Initial consultation:
                            <span className="text-[#191A15]">
                                {psychologist.initial_consultation}
                            </span>
                        </p>
                    </li>
                </ul>
                <p
                    className={clsx(
                        'text-[#191A1580] leading-[20px] text-ellipsis overflow-hidden max-h-[80px]',
                        s.psychologistAboutText,
                        isReviewsOpen && s.psychologistAboutTextMb,
                    )}
                >
                    {psychologist.about}
                </p>

                {isReviewsOpen && (
                    <>
                        <ul className="flex flex-col gap-6">
                            {psychologist.reviews.map((review, index) => {
                                return (
                                    <li key={index}>
                                        <div className="flex gap-3 mb-4">
                                            <div className="bg-[#54BE9633] rounded-4xl w-[44px] h-[44px] text-[#54BE96] flex items-center justify-center">
                                                {review.reviewer
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <h4>{review.reviewer}</h4>
                                                <p className="flex items-center">
                                                    <span>
                                                        <IoMdStar className="fill-[#FFC531] mr-[8px] w-[16px]" />
                                                    </span>
                                                    {review.rating.toFixed(1)}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-[#191A1580] leading-[20px]">
                                            {review.comment}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>

                        <button
                            className={s.btnAppointment}
                            onClick={() => handleAppointment()}
                        >
                            Make an appointment
                        </button>
                    </>
                )}

                {!isReviewsOpen && (
                    <button
                        className="underline underline-offset-2 cursor-pointer border-none bg-none"
                        onClick={() => handleToggleReviews()}
                    >
                        Read more
                    </button>
                )}
            </div>
        </div>
    );
}
