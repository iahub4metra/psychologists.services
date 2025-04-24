import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { Filter, setFilter } from '../../redux/psychologists/slice';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../../redux/psychologists/selectors';

export default function Filters() {
    const dispatch: AppDispatch = useDispatch();
    const filter = useSelector(selectFilter);

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setFilter(event.target.value as Filter));
    };

    return (
        <div className="mb-8">
            <p className="text-[#8A8A89] text-[14px]">Filters</p>
            <FormControl
                sx={{
                    backgroundColor: '#54BE96',
                    borderRadius: '14px',
                    width: '226px',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    '& .MuiSelect-select': {
                        color: '#FBFBFB',
                    },
                }}
            >
                <Select
                    value={filter}
                    onChange={handleChange}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: '#fff',
                                color: '#191A15',
                                borderRadius: '14px',
                                boxShadow:
                                    '0px 20px 69px 0px rgba(0, 0, 0, 0.07)',
                                mt: 1,
                                '& .MuiMenuItem-root': {
                                    fontSize: '16px',
                                    color: '#191A154D',
                                    transition:
                                        'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                        color: '#191A15',
                                    },
                                    '&.Mui-selected': {
                                        bgcolor: 'transparent',
                                        color: '#191A15',
                                        transition:
                                            'all 250ms cubic-bezier(0.4, 0.2, 0, 0.1)',
                                        '&:hover': {
                                            bgcolor: 'transparent',
                                        },
                                    },
                                },
                            },
                        },
                    }}
                >
                    <MenuItem value="all">Show all</MenuItem>
                    <MenuItem value="a-z">A to Z</MenuItem>
                    <MenuItem value="z-a">Z to A</MenuItem>
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="not-popular">Not popular</MenuItem>
                    <MenuItem value="lower-price">Lower price</MenuItem>
                    <MenuItem value="higher-price">Higher price</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
