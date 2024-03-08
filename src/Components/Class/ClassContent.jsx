import React, { useState } from "react";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NewAccordianAdder from "./NewAccordianAdder";

const ClassContent = () => {
    const [ openeditingDrawer,setOpeneditingDrawer ]=useState(false);
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

  return (
    <div className="w-full border-2 border-black flex flex-col items-center">
      <div className="w-[95%] border-2 border-green-600 mt-2 flex flex-row">
        <NewAccordianAdder  openeditingDrawer={openeditingDrawer }setOpeneditingDrawer={setOpeneditingDrawer}/>
        <div className="w-[95%] border-2 border-yellow-500 p-3">
          <p>hello this is new classroom</p>
          <p>hello this is next new classroom</p>
        </div>
        <div className="border-2 border-blue-600 w-[5%] flex flex-col justify-center items-center">
          <button onClick={handleClick}>
            <AddBoxRoundedIcon className="text-[#9C9C9C] text-[20px] scalar-cardlg hover:text-black mb-1" />
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

          <button>
            <BorderColorRoundedIcon className="text-[#9C9C9C] text-[20px] scalar-cardlg hover:text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassContent;
