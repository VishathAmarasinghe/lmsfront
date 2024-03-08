import { BellOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Badge, ConfigProvider, Space } from "antd";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import React, { useState } from "react";
import Search from "antd/es/input/Search";
import logo from '../assets/logo.png';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";

const Header = ({openMobilePanel,classMode}) => {
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElUser, setAnchorElUser] = useState(null);

      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

  return (
    <div className="w-full h-full border-2 border-red-600 flex flex-row justify-between">
      <div className="flex flex-row items-center justify-center align-middle border-2 border-gray-600">
        {classMode?<div className="border-2 border-green-600 ">
          <img src={logo} alt="logo" className="w-[65%] md:w-[70%] ml-5"/>
        </div>:<></>}
        {!classMode?<div className="flex md:hidden">
          <MenuRoundedIcon onClick={openMobilePanel} />
        </div>:<></>}
        {!classMode?<div className="hidden md:flex justify-center mx-5 ">
        <ConfigProvider theme={{
        token:{
            colorPrimary:"#5B6BD4",
            colorBgContainer:"#EBEEFF"
        }
    }}>
            <Search placeholder="search here" />
          </ConfigProvider>
        </div>:<></>}
      </div>
      <div className="flex flex-row h-full border-2 border-green-300 items-center mr-4">
        <div className="hidden md:flex">
        <Badge count={10} overflowCount={20} size="5px">
          {/* <NotificationsRoundedIcon style={{ fontSize: "27px" }} /> */}
          <BellOutlined className="text-[20px] text-gray-500"/>
        </Badge>
        </div>
        
        
        <Space className="border-2 border-red-500 h-full mx-5 flex flex-col justify-center align-middle items-center">
        <p className="font-semibold text-[15px]  ">Vishath</p>
        {/* <p>sds</p> */}
        </Space>
        <Box sx={{flexGrow:0}}>
            <Tooltip title="Open Settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} >
                <Avatar size={40} icon={<UserAddOutlined />} />
                </IconButton>
            </Tooltip>
           
                
           
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
