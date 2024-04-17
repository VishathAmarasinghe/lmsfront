import React, { useEffect, useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NewAccordianAdder from "./NewAccordianAdder";
import ChangingclassInnerCards from "./ChangingclassInnerCards";
import ClassContentDescription from "./ClassContentDescription";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllAccordianByClassID } from "../../Actions/class";
import { useParams } from "react-router-dom";

const ClassContent = () => {
    const [ openeditingDrawer,setOpeneditingDrawer ]=useState(false);
    const user=JSON.parse(localStorage.getItem("profile")).result;
    const dispatch=useDispatch();
    const [subAccID,setSubAccID]=useState(null);
    const [selectedClass,setSelectedClass]=useState("");
    const {classID}=useParams();
    const classInside=useSelector(state=>state.classes.selectedClass);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const newAccordianAdder=()=>{
    setAnchorEl(null);
    setOpeneditingDrawer(true);
  }

  useEffect(()=>{
    setSelectedClass(classInside);
    dispatch(getAllAccordianByClassID(classID))
  },[classInside])

  return (
    <div className="w-full border-2 border-black flex flex-col items-center">
      <div className="w-[95%] border-2 border-green-600 mt-2 flex flex-col">
        <NewAccordianAdder subAccID={subAccID} setSubAccID={setSubAccID}  openeditingDrawer={openeditingDrawer }setOpeneditingDrawer={setOpeneditingDrawer}/>
        <div className="w-full flex flex-row">
        <div className="w-[95%] border-2 border-yellow-500 p-3">
          <ClassContentDescription classDetails={selectedClass}/>
        </div>
        {
          user?.role=="teacher"?
        <div className="border-2 border-blue-600 w-[5%] flex flex-col justify-center items-center">
          <button onClick={handleClick} className="my-2">
            <AddBoxRoundedIcon className="text-[#bebebe] text-[20px] scalar-cardlg hover:text-black mb-1" />
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
            <MenuItem onClick={newAccordianAdder}>New Accordien</MenuItem>
            <MenuItem onClick={handleClose}>Content Box</MenuItem>
            
          </Menu>

          <button className="my-2">
            <BorderColorRoundedIcon className="text-[#bebebe] text-[20px] scalar-cardlg hover:text-black" />
          </button>
        </div>:<></>
}
        </div>
        <ChangingclassInnerCards setSubAccID={setSubAccID}  openeditingDrawer={openeditingDrawer }setOpeneditingDrawer={setOpeneditingDrawer}/>

      </div>
    </div>
  );
};

export default ClassContent;
