import { Collapse } from "antd";
import React, { useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NoteAddingPanel from "./NoteAddingPanel";
import SubmissionAddingPanel from "./SubmissionAddingPanel";

const Accordian = () => {
  const [notemodelOpen, setnotemodelOpen] = useState(false);
  const [submissionaddingpanelOpen, setSubmissionAddingPanelOpen]=useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleaddbtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const newAccordianAdder = () => {
    setAnchorEl(null);
    setOpeneditingDrawer(true);
  };


  const handleNoteAddingPanel=()=>{
    setAnchorEl(null);
    setnotemodelOpen(true);
  }

  const handleSubmissionPanelOpening=()=>{
    setSubmissionAddingPanelOpen(true);
  }
  return (
    <div>
      <NoteAddingPanel notemodelOpen={notemodelOpen} setnotemodelOpen={setnotemodelOpen}/>
      <SubmissionAddingPanel submissionaddingpanelOpen={submissionaddingpanelOpen} setSubmissionAddingPanelOpen={setSubmissionAddingPanelOpen}/>
      <Collapse
        items={[
          {
            key: "1",
            label: (
              <div className="w-full border-2 border-red-500 flex flex-row justify-between items-center">
                <div>
                  <h1 className="text-[18px] font-inter font-semibold">
                    Hello this is title
                  </h1>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <button onClick={handleaddbtnClick}>
                    <AddBoxRoundedIcon className="text-[#9C9C9C] text-[20px] scalar-cardlg hover:text-blue-700 mr-1" />
                  </button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={newAccordianAdder}>
                      New Innter Accordien
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Quiz</MenuItem>
                    <MenuItem onClick={handleNoteAddingPanel}>Notes</MenuItem>
                    <MenuItem onClick={handleSubmissionPanelOpening}>Submission Panel</MenuItem>
                  </Menu>
                  <button>
                    <EditRoundedIcon className="text-[#9C9C9C] text-[20px] scalar-cardlg hover:text-blue-700" />
                  </button>
                </div>
              </div>
            ),
            children: <p>Inside Content</p>,
          },
        ]}
      />
    </div>
  );
};

export default Accordian;
