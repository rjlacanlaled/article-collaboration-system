import React, { useState, useEffect } from "react";
import DashboardPage from "../Pages/DashboardPage";
import { Avatar, IconButton } from "@mui/material";
import EditProfile from "../modals/UpdateProfile";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { UserLogin } from "../Types/UserLogin";
import { UserDetail } from "../Types/UserDetails";
import { TabTitle } from '../utils/GeneralFunctions';

export interface State extends SnackbarOrigin {
  open: boolean;
}

function Profile({ userDetail, isSignedIn }: UserLogin) {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isUpdateProfileSuccess, setUpdateProfileSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState<UserDetail>()

  //Page Title
  TabTitle('Profile - SearchWorks')

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleProfileUpdateClose = async () => {
    setUpdateProfileSuccess((prevState) => !prevState);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (image) {
      // Perform upload logic here
      console.log("Uploading file:", image);
      // Reset the selectedImage and previewImage state after upload
      setImage(null);
      setPreviewImage("");
    } else {
      console.log("No file selected.");
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/UserData/email/${userDetail.user.email}`, 
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userDetails = await res.json();
      setUserProfile(userDetails);
    };

    fetchData();
  };

  return (
    <DashboardPage user={userDetail} isSignedIn={isSignedIn}>
      <div className="bg-gray-100 flex justify-center flex-col items-center">
        <div className="max-w-7xl mx-auto pb-6 px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg divide-gray-200">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                <EditProfile user={userDetail} isUpdateProfileSuccess={setUpdateProfileSuccess} updateHandler={refreshData}/>
              </div>
              <div className="flex justify-start items-center w-content mt-4">
                <input
                  type="file"
                  name="profile"
                  accept="image/*"
                  id="profile-image-input"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="profile-image-input"
                  className="rounded-full hover:bg-white mr-4 relative"
                >
                  <IconButton component="span">
                    <Avatar
                      alt="Display Photo"
                      src={previewImage}
                      sx={{ width: 90, height: 90, maxWidth: "100%" }}
                      onClick={handleUpload}
                    >
                        {userProfile?.user.firstName.charAt(0).toUpperCase()}
                        {userProfile?.user.lastName.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </label>
                <div className="flex justify-center flex-col items-center">
                  <h2 className="text-zinc-700 tracking-widest text-base font-semibold">
                    {userProfile?.user.firstName + " " + userProfile?.user.lastName}
                  </h2>
                  <h2 className="text-zinc-700 tracking-wider text-xs">
                    {userProfile?.roles[0].replace(/([a-z])([A-Z])/g, '$1 $2')}
                  </h2>
                </div>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Update your personal information.
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">
                      First Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 tracking-wider">
                      {userProfile?.user.firstName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">
                      Middle Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 tracking-wider">
                      {userProfile?.user.middleName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">
                      Last Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 tracking-wider">
                      {userProfile?.user.lastName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-zinc-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 tracking-wider">
                      {userProfile?.user.email}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
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
  );
}

export default Profile;
