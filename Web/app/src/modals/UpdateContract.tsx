import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "@mui/joy/Modal";
import Input from "@mui/joy/Input";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import UpdateIcon from "../Assets/Images/edit-icon.svg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UserDetailList } from "../Types/UserDetailList";
import { ContractDetails } from "./CreateContract";
import dayjs from "dayjs";

interface MyUserRoleProps {
  updateHandler: any;
  contractDetails: ContractDetails;
}

function UpdateContract({ updateHandler, contractDetails }: MyUserRoleProps) {
  const [open, setOpen] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [client, setClient] = useState<UserDetailList[]>([]);
  const [seo, setSeo] = useState<UserDetailList[]>([]);
  const [contractData, setContractData] = useState<ContractDetails>({
    clientEmail: contractDetails.clientEmail,
    seoEmail: contractDetails.seoEmail,
    type: contractDetails.type,
    plan: contractDetails.plan,
    paymentStatus: contractDetails.paymentStatus,
    paymentAmount: contractDetails.paymentAmount,
    managedBy: contractDetails.managedBy,
    paymentDate: contractDetails.paymentDate,
  });

  const handleChange = (e: any) => {
    setContractData((prevContractData) => {
      return {
        ...prevContractData,
        [e.target.name]: e.target.value,
      };
    });
  };

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

  const handleUpdateContractSubmit = async () => {
    console.log({ contractData });
    await fetch(`${process.env.REACT_APP_BASE_URL}/Contracts`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        clientEmail: contractData.clientEmail,
        seoEmail: contractData.seoEmail,
        type: contractData.type,
        plan: contractData.plan,
        status: contractData.paymentStatus,
        paymentAmount: contractData.paymentAmount,
        managedBy: contractData.managedBy,
        paymentDate: contractData.paymentDate,
      }),
    });
    // isUpdateSuccess(true);
    await updateHandler();
    setOpen(false);
  };

  const handleDateChange = (date: any) => {
    setPaymentDate(date);
    console.log(contractData.paymentDate);
    console.log(new Date(date).toISOString());
    contractData.paymentDate = new Date(date).toISOString();
    setContractData(contractData);
  };

  return (
    <>
      <div className="mr-2">
        <Button
          variant="solid"
          color="primary"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <img src={UpdateIcon} alt="update" className="h-4 w-4 mr-1.5" />
          Update
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
            size="lg"
          >
            <Typography id="basic-modal-dialog-title" component="h2">
              Update Contract
            </Typography>
            <Typography
              id="basic-modal-dialog-description"
              textColor="text.tertiary"
            >
              Fill in the information of the contract.
            </Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
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
                    <MenuItem value={-1}>
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
                    name="paymentStatus"
                    value={contractData.paymentStatus}
                    label="PaymentStatus"
                    onChange={handleChange}
                    sx={{ borderRadius: "7px" }}
                  >
                    <MenuItem value={-1}>
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
                        value={dayjs(contractData.paymentDate)}
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
                    <MenuItem value={"SearchWorks"}>SearchWorks</MenuItem>
                    <MenuItem value={"Client"}>Client</MenuItem>
                  </Select>
                </FormControl>
                <Button onClick={handleUpdateContractSubmit}>Submit</Button>
              </Stack>
            </form>
          </ModalDialog>
        </Modal>
      </div>
    </>
  );
}

export default UpdateContract;
