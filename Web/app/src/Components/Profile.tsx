import React, {useState}  from 'react'
import UserData from '../Data/UserData.json'
import DashboardPage from '../Pages/DashboardPage'
import { Avatar, IconButton } from '@mui/material';
import EditProfile from '../modals/EditProfile';
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

export interface State extends SnackbarOrigin {
  open: boolean;
}

function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUpdateProfileSuccess, setUpdateProfileSuccess] = useState(false)

  const handleProfileUpdateClose = () => {
    setUpdateProfileSuccess(prevState => !prevState)
  }

  const handleFileChange = (e:any) => {
    setSelectedFile(e.target.files[0]);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleProfileUploadSubmit = () => {
    if (selectedFile) {
      // Perform upload logic here
      console.log('Uploading file:', selectedFile);
    } else {
      console.log('No file selected.');
    }
  };

  const filteredUserData = UserData.filter((user) => user.id === 1);

  return (
    <DashboardPage>
        <div className="bg-gray-100 flex justify-center flex-col items-center">
          {filteredUserData.map((user) => (
          <div className="max-w-7xl mx-auto pb-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow rounded-lg divide-gray-200">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className='flex justify-between'>
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <EditProfile isUpdateProfileSuccess={isUpdateProfileSuccess}/>
              </div>
              <div className='flex justify-start items-center w-content mt-4'>
              <input
                type="file"
                accept="image/*"
                id="profile-image-input"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="profile-image-input" className='rounded-full hover:bg-white mr-4 relative'>
                <IconButton component="span">
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 70, height: 70, borderRadius: '12px'}} // Added borderRadius
                    onClick={handleProfileUploadSubmit}
                  />
                </IconButton>
              </label>
              <div className='flex justify-center flex-col items-center'>
                <h2 className='text-zinc-700 tracking-widest text-base font-semibold'>{user.firstname} {user.lastname}</h2>
                <h2 className='text-zinc-700 tracking-wider text-xs'>Content Manager</h2>
            </div>
            </div>
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Update your personal information and settings.</p>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-zinc-500">First Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.firstname}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-zinc-500">Middle Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">Farne</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-zinc-500">Last Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.lastname}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-zinc-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
        {/* UPDATE PROFILE NOTIFICATION */}
        {isUpdateProfileSuccess && (
          <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isUpdateProfileSuccess}
            onClose={handleProfileUpdateClose}
          >
            <Alert onClose={handleProfileUpdateClose} severity="info">
              Profile Successfully Updated!
            </Alert>
          </Snackbar>
        )}
    </DashboardPage>
  )
}

export default Profile