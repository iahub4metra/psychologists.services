import { Psychologist } from '../App/Types';
import s from './AppointmentForm.module.css';
import { appointmentSchema } from '../../utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField } from '@mui/material';
import './TimePicker.css';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modal/slice';

interface AppointmentFormProps {
    psychologist: Psychologist | null;
}

interface FormValues {
    name: string;
    phone: string;
    time: Date;
    email: string;
    comment: string;
}

export default function AppointmentForm({
    psychologist,
}: AppointmentFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(appointmentSchema),
        defaultValues: {},
    });

    const dispatch: AppDispatch = useDispatch();

    const onSubmit = (data: FormValues) => {
        console.log(
            `name: ${data.name}; email: ${data.email}; phone: ${data.phone}; time: ${data.time}; comment: ${data.comment}`,
        );
        reset();
        dispatch(closeModal());
    };

    return (
        <div>
            <h3 className={s.title}>
                Make an appointment with a psychologists
            </h3>
            <p className="text-[#191A1580] leading-normal max-[476px]:text-[12px]">
                You are on the verge of changing your life for the better. Fill
                out the short form below to book your personal appointment with
                a professional psychologist. We guarantee confidentiality and
                respect for your privacy.
            </p>
            <div className="flex my-[30px] items-center">
                <img
                    src={psychologist?.avatar_url}
                    className="w-[44px] h-[44px] rounded-[15px] mr-[14px]"
                />
                <div className="flex-col gap-[4px] items-start">
                    <p className="text-[#8A8A89] text-[12px]">
                        Your psychologists
                    </p>
                    <h4 className="text-[16px]">{psychologist?.name}</h4>
                </div>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="false"
            >
                <div className="mb-[16px]">
                    <TextField
                        {...register('name')}
                        variant="outlined"
                        error={Boolean(errors.name?.message)}
                        label="Name"
                        helperText={errors.name?.message}
                        sx={{
                            maxWidth: '472px',
                            width: '100%',
                            '& .MuiInputBase-root': {
                                borderRadius: '12px',
                                borderColor: '#191A151A',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                transition:
                                    'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                            },
                        }}
                    />
                </div>
                <div className="flex flex-wrap gap-[8px] mb-[16px]">
                    <div className="max-[656px]:w-full">
                        <TextField
                            {...register('phone')}
                            variant="outlined"
                            label="Phone"
                            error={Boolean(errors.phone?.message)}
                            helperText={errors.phone?.message}
                            sx={{
                                width: '232px',
                                '@media screen and (max-width: 655px)': {
                                    width: '100%',
                                    maxWidth: '472px',
                                },
                                '& .MuiInputBase-root': {
                                    borderRadius: '12px',
                                    borderColor: '#191A151A',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    transition:
                                        'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                                },
                            }}
                        />
                    </div>
                    <div className="max-[656px]:w-full">
                        <DatePicker
                            showPopperArrow={false}
                            selected={watch('time') || null}
                            onChange={(date) => {
                                if (date) {
                                    setValue('time', date);
                                }
                            }}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            dateFormat="HH:mm"
                            placeholderText="Meeting time"
                            className={`timePicker ${errors.time && 'error'}`}
                            popperClassName={'timePickerPopper'}
                            minTime={new Date(0, 0, 0, 9, 0)}
                            maxTime={new Date(0, 0, 0, 16, 0)}
                        />
                        {errors.time && (
                            <p className={s.errorTime}>{errors.time.message}</p>
                        )}
                    </div>
                </div>
                <div className="mb-[16px]">
                    <TextField
                        {...register('email')}
                        variant="outlined"
                        label="Email"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        sx={{
                            maxWidth: '472px',
                            width: '100%',
                            '& .MuiInputBase-root': {
                                borderRadius: '12px',
                                borderColor: '#191A151A',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                transition:
                                    'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                            },
                        }}
                    />
                </div>
                <div className="mb-[16px]">
                    <TextField
                        {...register('comment')}
                        variant="outlined"
                        label="Comment"
                        error={Boolean(errors.comment?.message)}
                        helperText={errors.comment?.message}
                        multiline
                        rows={4}
                        sx={{
                            maxWidth: '472px',
                            width: '100%',

                            '& .MuiInputBase-root': {
                                borderRadius: '12px',
                                borderColor: '#191A151A',
                                height: '116px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                transition:
                                    'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                            },
                        }}
                    />
                </div>

                <button type="submit" className={s.btnSubmit}>
                    Send
                </button>
            </form>
        </div>
    );
}
