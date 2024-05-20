import { Button } from '@mui/material';
import { toggleBlockForm } from '@/features/swimLaneBoard/slices/blockSlice';
import { useAppDispatch } from '@/store/dispatch';

const CreateNewBlock = () => {
  const dispatch = useAppDispatch();

  const handleAddCard = () => {
    dispatch(
      toggleBlockForm({
        open: true,
        blockData: {},
        isEditFlow: false
      })
    );
  };

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={handleAddCard}
      fullWidth
    >
      Add New Card
    </Button>
  );
};

export default CreateNewBlock;
