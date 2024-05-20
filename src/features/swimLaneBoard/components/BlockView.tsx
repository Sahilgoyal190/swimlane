import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import { BLOCK_PRIORITY_COLORS_MAP } from '../../../constants';
import { useDispatch } from 'react-redux';
import { toggleBlockForm } from '@/features/swimLaneBoard/slices/blockSlice';
import { Block } from '@/types';

const BlockView = ({ block }: { block: Block }) => {
  const dispatch = useDispatch();
  return (
    <Card
      variant='outlined'
      sx={{
        margin: '16px 0 ',
        backgroundColor:
          BLOCK_PRIORITY_COLORS_MAP[block.priority?.id] || 'white',
        cursor: 'pointer'
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {block.name}
        </Typography>
        <Typography variant='h5' component='div'></Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'></Typography>
        <Typography variant='body2'>{block.description}</Typography>
        <Divider />
        <Grid
          container
          sx={{
            marginTop: 2
          }}
        >
          {block.priority?.label && (
            <Grid item xs={3}>
              <Chip label={block.priority?.label} color='primary' />
            </Grid>
          )}
          {block.releaseDate && (
            <Grid item xs={9}>
              <Paper
                variant='outlined'
                elevation={10}
                sx={{
                  padding: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }}
                square={false}
              >
                Release Date: {block.releaseDate}
              </Paper>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          sx={{ marginLeft: 'auto' }}
          variant='outlined'
          color='primary'
          onClick={() => {
            dispatch(
              toggleBlockForm({
                open: true,
                blockData: block,
                isEditFlow: true
              })
            );
          }}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default BlockView;
