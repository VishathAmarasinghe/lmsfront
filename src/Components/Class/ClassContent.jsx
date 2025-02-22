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
import ClassAddingModel from "./ClassAddingModel";

const ClassContent = () => {
  const [openeditingDrawer, setOpeneditingDrawer] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile")).result;
  const dispatch = useDispatch();
  const [subAccID, setSubAccID] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const { classID } = useParams();
  const classInside = useSelector((state) => state.classes.selectedClass);
  const [anchorEl, setAnchorEl] = useState(null);
  const [classInfoEditionDrawerOpen,setClassInfoEditingDrawerOpen]=useState(false);

  const open = Boolean(anchorEl);


  const handleOpenClassItemEditingModel=()=>{
    setClassInfoEditingDrawerOpen(true);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const newAccordianAdder = () => {
    setAnchorEl(null);
    setOpeneditingDrawer(true);
  };

  useEffect(() => {
    setSelectedClass(classInside);
    dispatch(getAllAccordianByClassID(classID));
  }, [classInside]);

  return (
    <div className="w-full h-[100%] flex flex-col items-center shadow-2xl overflow-y-auto">
      <div className="w-full">
      <NewAccordianAdder
              subAccID={subAccID}
              setSubAccID={setSubAccID}
              openeditingDrawer={openeditingDrawer}
              setOpeneditingDrawer={setOpeneditingDrawer}  
            />
        <h1 className="font-inter font-semibold text-[18px] ml-8 my-2 text-gray-500">
          Class Content
        </h1>
      </div>

      <div
        data-aos="fade-right"
        className="w-[95%] bg-white h-[90%]  flex flex-col lg:flex-col items-center rounded-xl p-1 shadow-xl ring-1 ring-gray-300"
      >
        <div className="w-[95%] mt-2 overflow-y-auto ">
          <div className="w-[95%] mt-2 flex flex-col">
            
            <div className="w-full flex flex-row">
              <div className="w-[95%]  p-3">
                <ClassContentDescription  classDetails={selectedClass} />
              </div>
              {user?.role === "teacher" && (
                <div className=" w-[5%] flex flex-col justify-center items-center">
                  <button onClick={handleClick} className="my-2">
                    <AddBoxRoundedIcon className="text-[#9b9b9b] text-[20px] scalar-cardlg hover:text-black mb-1" />
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
                  <button onClick={handleOpenClassItemEditingModel} className="my-2">
                    <BorderColorRoundedIcon  className="text-[#9b9b9b] text-[20px] scalar-cardlg hover:text-black" />
                  </button>
                </div>
              )}
            </div>
            <ChangingclassInnerCards
              setSubAccID={setSubAccID}
              openeditingDrawer={openeditingDrawer}
              setOpeneditingDrawer={setOpeneditingDrawer}
            />
            <ClassAddingModel classEditingData={selectedClass} addingCompOpen={classInfoEditionDrawerOpen} setAddingCompOpen={setClassInfoEditingDrawerOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassContent;
