import React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export interface State extends SnackbarOrigin {
  open: boolean;
}

interface notifications {
  open: any;
  onClose: any;
  severity: any;
  label: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SuccessDeleted({open, onClose, severity, label}: notifications) {

  return (
    <div className="fixed bottom-4 right-4">
      <Snackbar
        open={open}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%'}}>
            {label}
        </Alert>
      </Snackbar>
    </div>
  );
}