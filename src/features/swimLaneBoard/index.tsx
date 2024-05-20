import { Divider, Grid } from '@mui/material';
import Block from './Block';
import SwimLane from './Swimlane';
import TopLevelFilter from './components/TopLevelFilters';
import Paper from '@/components/Paper';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/dispatch';
import { fetchLanesAction } from '../../slices/lanesSlice';
import CreateNewBlock from './components/CreateNewBlock';

const SwimLaneBoard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLanesAction());
  }, [dispatch]);

  return (
    <>
      <Paper>
        <Grid container spacing={2} justifyContent='space-between'>
          <Grid item xs={4}>
            <TopLevelFilter />
          </Grid>
          <Grid item xs={2}>
            <CreateNewBlock />
          </Grid>
        </Grid>
      </Paper>
      <Divider />
      <SwimLane />
      <Block />
    </>
  );
};

export default SwimLaneBoard;
