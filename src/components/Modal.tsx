import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

type ModalProps = {
  openModal?: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
};

const Modal = ({
  openModal = false,
  handleClose,
  children,
  title,
  maxWidth,
  fullScreen = false
}: ModalProps) => {
  return (
    <BootstrapDialog
      open={openModal}
      onClose={handleClose}
      maxWidth={maxWidth || 'sm'}
      fullWidth
      aria-labelledby='form-dialog-title'
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ m: 0, p: 1.5 }}>
        {title}
        {handleClose ? (
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </BootstrapDialog>
  );
};

export default Modal;
