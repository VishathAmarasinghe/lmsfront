import { BellOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Badge, ConfigProvider, Space } from "antd";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import React, { useEffect, useState } from "react";
import Search from "antd/es/input/Search";
import logo from "../assets/logo.png";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import StudentProfileDrawer from "./Student/StudentProfileDrawer";
import { useDispatch } from "react-redux";
import { logout } from "../Actions/auth";
import { useNavigate } from "react-router-dom";
import TeacherDetaileditingDrawer from "./TeacherComp/TeacherDetaileditingDrawer";

const Header = ({
  openMobilePanel,
  classMode,
  openprofileeditingDrawer,
  setProfileOpeneditingDrawer,
}) => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("profile"))?.result
  );
  const navigation = useNavigate();

  const settings = ["Profile", "Settings", "Logout"];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const open = Boolean(anchorElUser);
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (type) => {
    console.log("dettingg type ", type);
    switch (type) {
      case "Logout":
        dispatch(logout(navigation));
        break;
      case "Profile":
        setAnchorElUser(null);
        setProfileOpeneditingDrawer(true);
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };







  return (
    <div className="w-full h-full border-2 border-red-600 flex flex-row justify-between">
      <div className="flex flex-row items-center justify-center align-middle border-2 border-gray-600">
        <TeacherDetaileditingDrawer
          openeditingDrawer={openprofileeditingDrawer}
          setOpeneditingDrawer={setProfileOpeneditingDrawer}
        />
        {classMode ? (
          <div className="border-2 border-green-600 ">
            <img src={logo} alt="logo" className="w-[60%] md:w-[57%] ml-5" />
          </div>
        ) : (
          <></>
        )}
        {!classMode ? (
          <div className="flex md:hidden">
            <MenuRoundedIcon onClick={openMobilePanel} />
          </div>
        ) : (
          <></>
        )}
        {!classMode ? (
          <div className="hidden md:flex justify-center mx-5 ">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#5B6BD4",
                  colorBgContainer: "#EBEEFF",
                },
              }}
            >
              <Search placeholder="search here" />
            </ConfigProvider>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-row h-full border-2 border-green-300 items-center mr-4">
        <div className="hidden md:flex">
          <Badge count={10} overflowCount={20} size="5px">
            {/* <NotificationsRoundedIcon style={{ fontSize: "27px" }} /> */}
            <BellOutlined className="text-[20px] text-gray-500" />
          </Badge>
        </div>
        <Space className="border-2 border-red-500 h-full mx-5 flex flex-col justify-center  items-center">
          <p className="font-semibold text-[15px] font-inter ">
            {userDetails.firstName}
          </p>
          <p className="font-inter mt-1 text-[12px]">{userDetails.role}</p>
          {/* <p>sds</p> */}
        </Space>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open Settings">
            <IconButton 
            aria-controls={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                size={40}
                className="bg-[#5B6BD4] text-white border-2 border-[#5B6BD4]"
                icon={
                  userDetails.photo == null || userDetails.photo == ""
                    ? userDetails.firstName.substring(0, 1).toUpperCase()
                    : <img src={`http://localhost:5000/${userDetails.photo}`}/>
                }
              />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            // keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
    </div>
  );
};

export default Header;
