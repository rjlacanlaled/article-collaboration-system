import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export interface State extends SnackbarOrigin {
  open: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SuccessNotification() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };


  return (
    <div>
      <Button
        onClick={handleClick({
          vertical: 'bottom',
          horizontal: 'right',
        })}
      >
        Bottom-Right
      </Button>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Successfully Updated
        </Alert>
      </Snackbar>
    </div>
  );
}