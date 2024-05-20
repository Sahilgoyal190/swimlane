import { Autocomplete, TextField } from '@mui/material';
import { PRIORITY } from '@/constants';
import { useAppDispatch } from '@/store/dispatch';
import { setFilter } from '../slices/filterSlice';
import { Priority } from '@/types';
import { SyntheticEvent } from 'react';

const TopLevelFilter = () => {
  const dispatch = useAppDispatch();

  const handleSelectChange = (
    _event: SyntheticEvent<Element, Event>,
    value: Priority | null
  ) => {
    dispatch(
      setFilter({
        name: 'priority',
        value: value?.id || ''
      })
    );
  };

  return (
    <Autocomplete
      disablePortal
      id='priority'
      options={PRIORITY}
      getOptionLabel={option => option.label}
      renderInput={params => <TextField {...params} label='Priority' />}
      onChange={handleSelectChange}
    />
  );
};

export default TopLevelFilter;
