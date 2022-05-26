import { Snackbar as MuiSnackbar } from '@mui/material'
import React from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { unsetError } from '../../store/action-creators/errorActions';

const SnackBar = () => {
  const error = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(unsetError());
  };

  return (
    <MuiSnackbar open={!!error.message} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error.message}
      </Alert>
    </MuiSnackbar>
  )
}

export default SnackBar