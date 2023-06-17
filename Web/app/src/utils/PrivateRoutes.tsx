import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const useAuth = () => {
  try {
    const user = localStorage.getItem('user');

    if (user) {
      return {
        auth: true,
        role: user
      };
    } else {
      return {
        auth: false,
        role: null
      };
    }
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
    return {
      auth: false,
      role: null
    };
  }
};

const setUserAndRedirect = (userRole: string, navigate: any) => {
  localStorage.setItem('user', JSON.stringify({ role: userRole }));

  if (userRole === 'admin') {
    navigate('/pending'); // Redirect to admin page for admin role
  } else if (userRole === 'client') {
    navigate('/clientmain'); // Redirect to user page for user role
  } else {
    navigate('/'); // Redirect to default page for unknown roles
  }
};

function PrivateRoutes() {
  const { auth, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth && !role) {
      // Fetch role information for the logged-in user
      const fetchRoles = async () => {
        try {
          const token = localStorage.getItem('token');

          const roleRes = await fetch('http://localhost:5143/api/v1/Setup/roles/all', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const roleData = await roleRes.json();
          const userRole = roleData.role; // Assuming the role information is returned as "role"

          setUserAndRedirect(userRole, navigate);
        } catch (err) {
          console.log("error");
          // Handle error fetching roles or setting user information
        }
      };

      fetchRoles();
    }
  }, [auth, role, navigate]);

  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
