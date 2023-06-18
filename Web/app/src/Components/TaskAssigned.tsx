import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Slide from "@mui/material/Slide";
import { ProjectTask } from "./TaskList";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/joy/FormControl";
import { UserDetail } from "../Types/UserDetails";
import { UserDetailList } from "../Types/UserDetailList";

interface MyProps {
  task: ProjectTask | null;
}

export default function TaskAssigned({ task }: MyProps) {
  const [client, setClient] = useState<UserDetailList[]>([]);
  const [detailsExpand, setDetailsExpanded] = useState(true);
  const [contractData, setContractData] = useState({
    client: "",
    seo: "",
    contract: "",
    payment: "",
    paymentStatus: "",
    paymentAmount: "",
    manageBy: "",
  });

  const handleAccordionChange = () => {
    setDetailsExpanded(!detailsExpand);
  };

  const handleChange = (e: any) => {
    setContractData((prevTaskData) => {
      return {
        ...prevTaskData,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "http://localhost:5143/api/v1/Setup/users/Client",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const roles = await res.json();
      console.log({ roles });
      setClient(roles);
    };

    fetchData();
  }, []);

  return (
    <div className="p-2 w-full mt-5">
      <Accordion
        expanded={detailsExpand}
        onChange={handleAccordionChange}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Details</Typography>
        </AccordionSummary>
        <Slide direction="up" in={detailsExpand} mountOnEnter unmountOnExit>
          <div className="p-2 flex flex-col items-start h-content relative text-sm text-slate-800 tracking-wide">
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Assignee:</label>
              <div className="flex items-center ml-2">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    type="text"
                    name="type"
                    value={client}
                    label="Type"
                    onChange={handleChange}
                    sx={{ borderRadius: "2px", height: "30px", width: "200px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Guest Post</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Uploader:</label>
              <div className="flex items-center ml-2">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    type="text"
                    name="client"
                    value={client}
                    label="Type"
                    onChange={handleChange}
                    sx={{ borderRadius: "2px", height: "30px", width: "200px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>Guest Post</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Reporter:</label>
              <div className="flex items-center ml-2">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src={""}
                  alt="Jese Leos"
                />
                <p>
                  {task?.id} {}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Type:</label>
              <p>{task?.type === 0 ? "Guest Post" : ""}</p>
              <p>{task?.type === 1 ? "Blog" : ""}</p>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Words:</label>
              <p>{task?.words}</p>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Timeliness:</label>
              {task?.timeliness === 0 ? "Pending" : ""}
              {task?.timeliness === 1 ? "Past EOD" : ""}
              {task?.timeliness === 2 ? "On Time" : ""}
            </div>
            <div className="absolute bottom-0 right-0 p-3 text-xs text-zinc-800 tracking-wider">
              <p>SEO Deadline: {task?.seoDeadline}</p>
              <p>Prod Date: {task?.productionDate}</p>
            </div>
          </div>
        </Slide>
      </Accordion>
      <Accordion
        expanded={detailsExpand}
        onChange={handleAccordionChange}
        TransitionProps={{ unmountOnExit: true }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Contract Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col items-start h-content text-sm text-slate-800 tracking-wider">
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Client:</label>
              <div className="flex items-center ml-2">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="md">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    type="text"
                    name="client"
                    value={contractData.client}
                    label="Type"
                    onChange={handleChange}
                    sx={{ borderRadius: "2px", height: "30px", width: "200px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {client.map((clients) => (
                      <MenuItem value={clients.email}>
                        {clients.firstName} {clients.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">SEO:</label>
              <div className="flex items-center ml-2">
                <img
                  className="mr-2 w-6 h-6 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Michael Gough"
                />
                <p>JR</p>
              </div>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Contract Type:</label>
              <p>{contractData.contract}</p>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Payment Plan:</label>
              <div className="flex items-center ml-2">
                <p>{contractData.payment}</p>
              </div>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Payment Status:</label>
              <p className="bg-green-500 text-white rounded-lg px-3 py-0.5 text-center">
                {contractData.paymentStatus}
              </p>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Managed By:</label>
              <p>{contractData.manageBy}</p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
