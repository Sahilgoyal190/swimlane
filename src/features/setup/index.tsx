import { Divider, Grid } from '@mui/material';
import LaneTable from './components/LaneTable';
import SetupForm from './components/SetupForm';
import Paper from '@/components/Paper';
import { useEffect } from 'react';
import { fetchLanesAction } from '../../slices/lanesSlice';
import { useAppDispatch } from '@/store/dispatch';

const Setup = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLanesAction());
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Paper>
            <SetupForm />
          </Paper>
        </Grid>
      </Grid>

      <Divider style={{ margin: '20px 0' }} />
      <Paper>
        <LaneTable />
      </Paper>
    </>
  );
};

export default Setup;
