import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPsychologists } from '../../redux/psychologists/operations';
import { AppDispatch } from '../../redux/store';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList';

export default function Psychologists() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPsychologists(null));
  }, [dispatch]);

  return (
    <div className="max-w-[1440px] w-auto mx-auto px-container">
      <PsychologistsList />
    </div>
  );
}
