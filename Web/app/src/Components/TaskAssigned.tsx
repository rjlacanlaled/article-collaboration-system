import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import Slide from "@mui/material/Slide";
import { ProjectTask } from "./TaskList";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/joy/FormControl";
import { UserDetailList } from "../Types/UserDetailList";
import { UserDetail } from "../Types/UserDetails";

interface MyProps {
  task: ProjectTask;
  columnId: any;
}

export type Assignee = {
  email: string;
  name: string;
  role: string;
};

export type AssigneeRaw = {
  id: number;
  projectTaskId: number;
  roleName: string;
  userEmail: string;
};

export default function TaskAssigned({ columnId, task }: MyProps) {
  const [client, setClient] = useState<UserDetailList[]>([]);
  const [allUsers, setAllUsers] = useState<UserDetailList[]>([]);
  const [uploader, setUploader] = useState<UserDetailList[]>([]);
  const [assignee, setAssignee] = useState<Assignee[]>([]);
  const [detailsExpand, setDetailsExpanded] = useState(true);
  const [contractData, setContractData] = useState({
    assignUser: "",
    assignUploader: "",
    assignClient: "",
    assignSeo: "",
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

  //GET ALL APPROVED USERS
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/UserData/users/approved`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const users = await res.json();
      setAllUsers(users);
      setUploader(users);
    };

    fetchData();
  }, []);

  //GET CLIENT
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/Setup/users/client`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const roles = await res.json();
      setClient(roles);
    };

    fetchData();
  }, []);

  //GET TASK ASSIGNED REPORTER
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/ProjectTaskAssignees/assignees/${task.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const assigneesRaw: AssigneeRaw[] = await res.json();
      const assignees: Assignee[] = [];

      console.log({ assigneesRaw });

      for (const assigneeRaw of assigneesRaw) {
        console.log({ assigneeRaw });
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/UserData/email/${encodeURI(
            assigneeRaw.userEmail
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const populatedAssigneeRaw: UserDetail = await res.json();

        assignees.push({
          email: populatedAssigneeRaw.user.email,
          name:
            populatedAssigneeRaw.user.firstName +
            " " +
            populatedAssigneeRaw.user.lastName,
          role: assigneeRaw.roleName,
        });
      }

      console.log({ assignees });

      setAssignee(assignees);
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
                    name="assignUser"
                    value={contractData.assignUser}
                    label="Type"
                    onChange={handleChange}
                    sx={{ borderRadius: "2px", height: "30px", width: "200px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {allUsers
                      .filter(
                        (user) =>
                          user.roles[0] === "SeoSpecialist" ||
                          user.roles[0] === "ContentWriter"
                      )
                      .map((user) => (
                        <MenuItem value={user.email}>
                          {user.firstName} {user.lastName}
                        </MenuItem>
                      ))}
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
                    name="assignUploader"
                    value={contractData.assignUploader}
                    label="Type"
                    onChange={handleChange}
                    sx={{ borderRadius: "2px", height: "30px", width: "200px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {uploader
                      .filter(
                        (user) =>
                          user.roles[0] === "SeoManager" ||
                          user.roles[0] === "WebDeveloper" ||
                          user.roles[0] === "SeoSpecialist"
                      )
                      .map((user) => (
                        <MenuItem value={user.email}>
                          {user.firstName} {user.lastName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex items-center">
              <label className="p-2 ml-2 font-semibold">Reporter:</label>
              <div className="flex items-center ml-2">
                <Avatar alt="user-profile" sx={{ width: 24, height: 24 }} />
                <p className="ml-2">
                  {assignee.find((x) => x.role === "Reporter")?.name ??
                    "Assign Reporter"}
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
              {columnId === "4" && task?.timeliness === 2 && "On Time"}
            </div>
            <div className="absolute bottom-0 right-0 p-3 text-xs text-zinc-800 tracking-wider">
              <p>
                SEO Deadline:{" "}
                {new Date(task?.seoDeadline.toString()).toLocaleDateString()}
              </p>
              <p>
                Prod Date:{" "}
                {new Date(
                  task?.productionDeadline.toString()
                ).toLocaleDateString()}
              </p>
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
                    name="assignClient"
                    value={contractData.assignClient}
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
                <Avatar alt="user-profile" sx={{ width: 24, height: 24 }} />
                <p className="ml-2">JR</p>
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
