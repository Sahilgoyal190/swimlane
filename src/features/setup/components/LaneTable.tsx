import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { deleteLaneAction } from '@/slices/lanesSlice';
import CustomTable from '@/components/Table';
import { RootState } from '@/store';
import { Lane, Rule } from '@/types';
import { useAppDispatch } from '@/store/dispatch';

const COLUMNS = [
  { title: 'Name', field: 'name' },
  {
    title: 'Rules',
    field: 'rules',
    render: (value: Rule[]) => value.map(({ label }) => label).join(', ')
  }
];

const LaneTable = () => {
  const lanes = useSelector((state: RootState) => state.lanes);
  const dispatch = useAppDispatch();
  const handleDeleteLane = (id: string) => dispatch(deleteLaneAction(id));

  const updatedColumns = [
    ...COLUMNS,
    {
      title: 'Actions',
      field: 'actions',
      render: (_value: undefined, _index: number, row: Lane) => {
        return (
          <Button
            size='small'
            variant='outlined'
            color='primary'
            onClick={() => handleDeleteLane(row.id)}
          >
            Delete
          </Button>
        );
      }
    }
  ];

  return (
    <>
      <Typography variant='h5' gutterBottom>
        Existing lanes
      </Typography>
      <CustomTable rows={lanes} columns={updatedColumns} isCompact />
    </>
  );
};

export default LaneTable;
