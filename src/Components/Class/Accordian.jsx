import { Collapse } from "antd";
import React, { useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NoteAddingPanel from "./NoteAddingPanel";
import SubmissionAddingPanel from "./SubmissionAddingPanel";
import NoteCard from "../UploadMaterials/NoteCard";
import SubmissionPanalCard from "../UploadMaterials/SubmissionPanalCard";

const Accordian = ({ accDetails, setSubAccID, openeditingDrawer, setOpeneditingDrawer }) => {
  const [notemodelOpen, setnotemodelOpen] = useState(false);
  const [submissionaddingpanelOpen, setSubmissionAddingPanelOpen] = useState(false);
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
    setSubAccID(accDetails.accordianID);
    setOpeneditingDrawer(true);
  };

  const handleNoteAddingPanel = () => {
    setAnchorEl(null);
    setnotemodelOpen(true);
  };

  const handleSubmissionPanelOpening = () => {
    setSubmissionAddingPanelOpen(true);
  };

  return (
    <div>
      <NoteAddingPanel accID={accDetails.accordianID} notemodelOpen={notemodelOpen} setnotemodelOpen={setnotemodelOpen} />
      <SubmissionAddingPanel submissionaddingpanelOpen={submissionaddingpanelOpen} setSubmissionAddingPanelOpen={setSubmissionAddingPanelOpen} />
      <Collapse
        items={[
          {
            key: accDetails.accordianID,
            label: (
              <div className="w-full border-2 border-red-500 flex flex-row justify-between items-center">
                <div>
                  <h1 className="text-[18px] font-inter font-semibold">
                    {accDetails.accName}
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
                      New Sub Accordian
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
            children: (
              <div>
                <p>{accDetails.accDescription}</p>
                <div>
                  {accDetails.subAcc && accDetails.subAcc.map((subac) => (
                    <Accordian
                      key={subac.accordianID}
                      accDetails={subac}
                      setSubAccID={setSubAccID}
                      openeditingDrawer={openeditingDrawer}
                      setOpeneditingDrawer={setOpeneditingDrawer}
                    />
                  ))}
                  {accDetails.learningMaterials && accDetails.learningMaterials.map((material) => {
                    console.log("material ID ",material.materialID);
                    if (material.matrialType === "note") {
                      return material.notes && material.notes.map((note, index) => (
                        <NoteCard note={note} mainMaterial={material} key={index} />
                      ));
                    } else if (material.matrialType === "submission")  {
                      return material.submission && material.submission.map((submission, index) => (
                        <SubmissionPanalCard submission={submission} mainMaterial={material} key={index} />
                      ));
                    }else{
                      return <h1>Hello world</h1>
                    }
                  })}
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Accordian;
