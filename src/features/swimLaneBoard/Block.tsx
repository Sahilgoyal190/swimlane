import { useSelector, useDispatch } from 'react-redux';
import Modal from '@/components/Modal';
import { RootState } from '@/store';
import { toggleBlockForm } from './slices/blockSlice';
import BlockForm from './components/BlockForm';

export const AddOrEditBlock = () => {
  const dispatch = useDispatch();
  const { showBlockForm, blockData, isEditFlow } = useSelector(
    (state: RootState) => state.block
  );
  const handleClose = () => {
    dispatch(toggleBlockForm({ open: false }));
  };

  return (
    <>
      {showBlockForm && (
        <Modal
          openModal={showBlockForm}
          handleClose={handleClose}
          title='Add New Card'
          maxWidth={'lg'}
        >
          <BlockForm
            blockData={blockData}
            handleClose={handleClose}
            isEditFlow={isEditFlow}
          />
        </Modal>
      )}
    </>
  );
};

export default AddOrEditBlock;
