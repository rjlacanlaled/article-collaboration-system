import React, { useEffect, useState } from "react";
import AddIcon from "../Assets/Images/add-task.svg";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UserDetailList } from "../Types/UserDetailList";

export type Role = {
  id: number;
  name: string;
};

export type ContractDetails = {
  clientEmail: string;
  seoEmail: string;
  type: number;
  plan: number;
  status: number;
  managedBy: number;
  paymentAmount: number;
  paymentDate: string;
};

function CreateContract() {
  const [open, setOpen] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [client, setClient] = useState<UserDetailList[]>([]);
  const [seo, setSeo] = useState<UserDetailList[]>([]);
  const [contractData, setContractData] = useState<ContractDetails>({
    clientEmail: "",
    seoEmail: "",
    type: 0,
    plan: 0,
    status: 0,
    paymentAmount: 0,
    managedBy: 0,
    paymentDate: "",
  });

  const handleChange = (e: any) => {
    setContractData((prevContractData) => {
      return {
        ...prevContractData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleDateChange = (date: any) => {
    console.log({ date });
    setPaymentDate(date);
  };

  const onSubmitCreateContract = async () => {
    console.log({ contractData });
    await fetch(`${process.env.REACT_APP_BASE_URL}/Contracts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        clientEmail: contractData.clientEmail,
        seoEmail: contractData.seoEmail,
        type: contractData.type,
        plan: contractData.plan,
        status: contractData.status,
        paymentAmount: contractData.paymentAmount,
        managedBy: contractData.managedBy === 0 ? "SearchWorks" : "Client",
        paymentDate: new Date(paymentDate).toISOString(),
      }),
    });
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(`http://localhost:5143/api/v1/UserDetails/all`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     const user = await res.json();
  //     setClient(user);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const clients = await fetch(
        `${process.env.REACT_APP_BASE_URL}/Setup/users/client`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const clientUsers = await clients.json();

      const seoManager = await fetch(
        `${process.env.REACT_APP_BASE_URL}/Setup/users/seomanager`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const seoManagerUsers = await seoManager.json();
      setClient(clientUsers);
      setSeo(seoManagerUsers);
      console.log({ seoManagerUsers });
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className="rounded-lg p-5 bg-white drop-shadow-md space-y-3 dark:hover:bg-slate-300 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center space-x-3">
          <img src={AddIcon} alt="add-task" className="h-6 w-6" />
          <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
            Create Contract
          </h3>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
          size="lg"
        >
          <Typography id="basic-modal-dialog-title" component="h2">
            Create new Contract
          </Typography>
          <form>
            <Stack spacing={2}>
              <FormControl size="md">
                <FormLabel id="demo-select-small" sx={{ color: "black" }}>
                  Client
                </FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  type="text"
                  name="clientEmail"
                  value={contractData.clientEmail}
                  label="client"
                  onChange={handleChange}
                  sx={{ borderRadius: "7px", color: "black" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {client.map((clientRole) => (
                    <MenuItem value={clientRole.email}>
                      {clientRole.firstName} {clientRole.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }} size="md">
                <FormLabel id="demo-select-small" sx={{ color: "black" }}>
                  SEO
                </FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  type="text"
                  name="seoEmail"
                  value={contractData.seoEmail}
                  label="seo"
                  onChange={handleChange}
                  sx={{ borderRadius: "7px", color: "black" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {seo.map((userseo) => (
                    <MenuItem value={userseo.email}>
                      {userseo.firstName} {userseo.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                <FormLabel id="demo-select-small" sx={{ color: "black" }}>
                  Contract
                </FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  type="text"
                  name="type"
                  value={contractData.type}
                  label="Contract"
                  onChange={handleChange}
                  sx={{ borderRadius: "7px", color: "black" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>Open</MenuItem>
                  <MenuItem value={1}>6 Months</MenuItem>
                  <MenuItem value={2}>1 Year</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                <FormLabel id="demo-select-small" sx={{ color: "black" }}>
                  Payment
                </FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  type="text"
                  name="plan"
                  value={contractData.plan}
                  label="Payment"
                  onChange={handleChange}
                  sx={{ borderRadius: "7px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>Full Payment</MenuItem>
                  <MenuItem value={1}>2 Months Advance</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                <FormLabel id="demo-select-small" sx={{ color: "black" }}>
                  Payment Status
                </FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  type="text"
                  name="status"
                  value={contractData.status}
                  label="PaymentStatus"
                  onChange={handleChange}
                  sx={{ borderRadius: "7px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Paid</MenuItem>
                  <MenuItem value={0}>Not Paid</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Payment Amount</FormLabel>
                <Input
                  type="text"
                  name="paymentAmount"
                  value={contractData.paymentAmount}
                  onChange={handleChange}
                  autoFocus
                />
              </FormControl>
              <FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Payment Date"
                      value={paymentDate}
                      onChange={handleDateChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                <FormLabel id="demo-select-small" sx={{ color: "black" }}>
                  Managed
                </FormLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  type="text"
                  name="managedBy"
                  value={contractData.managedBy}
                  label="Managed"
                  onChange={handleChange}
                  sx={{ borderRadius: "7px" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>SearchWorks</MenuItem>
                  <MenuItem value={2}>Client</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={onSubmitCreateContract}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default CreateContract;
