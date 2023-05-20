import React, {useState, useEffect} from 'react';
import FormControl from "@mui/joy/FormControl";
import { MenuItem } from '@mui/material';
import Select from "@mui/material/Select";

export type UserDetail = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  registrationDate: number;
};

export default function SelectUser() {
  const [user, setUser] = useState()
  const [assign, setAssign] = useState<UserDetail[]>([]);

  const handleChange = (event: any) => {
    setUser(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5143/api/v1/UserDetails/all");
      const roles = await res.json();
      setAssign(roles);
    };

    fetchData();
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="sm">
        <Select
          type="text"
          label="Role"
          value={user}
          onChange={handleChange}
          required
          sx={{ borderRadius: "2px",  border: "none", color: "black", fontSize: "12px", padding: "4px", minWidth: "180px",  maxHeight: "33px"}}
          size='small'
        >
          <MenuItem value="" sx={{fontSize: "15px"}}>
            <em>None</em>
          </MenuItem>
          {assign.map((users) => (
            <MenuItem value={users.id} sx={{fontSize: "15px"}}>{users.firstName} {users.lastName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}