import { Grid, Autocomplete, TextField } from '@mui/material';
import { PRIORITY } from '@/constants';
import { useAppDispatch } from '@/store/dispatch';
import { setFilter } from '../slices/filterSlice';

const TopLevelFilter = () => {
  const dispatch = useAppDispatch();

  const handleSelectChange = (_event: any, value: any) => {
    dispatch(
      setFilter({
        name: 'priority',
        value: value?.id
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
