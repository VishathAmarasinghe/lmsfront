import { Layout, theme,ConfigProvider,Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import HeaderBar from "../../Components/Header";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ClassHeaderPageStructure from "../../Components/Class/ClassHeaderPageStructure";
import ClassContent from "../../Components/Class/ClassContent";
import ClassParticipants from "../../InnerPages/ClassParticipants";
import GradeBook from "../../InnerPages/GradeBook";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const {Sider}=Layout;
const ClassPageStructure = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobilemenu, setMobileMenu] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
  ];

  const openMobilePanel = () => {
    setMobileMenu((pre) => !pre);
  };

  const handleMenuclick=(e)=>{
    console.log("clicked e ",e);
  }
  return (
    <Layout className="w-full h-screen">
      <Header
        style={{
          padding: 0,
          position:"sticky",
          top:0,
          background: colorBgContainer,
        }}
      >
        <HeaderBar classMode={true} openMobilePanel={openMobilePanel} />
      </Header>
      <Content className="flex flex-col justify-center items-center bg-[#EBEEFF]">
        <Layout className="w-[96%] mt-3   h-[95%] bg-gray-500 rounded-xl">
        <div className="bg-[#4551A1] p-1  rounded-tl-xl rounded-tr-xl">
          <CloseRoundedIcon className="text-white scalar-card hover:text-black"/>
        </div>
        <Layout>
          <Header  style={{
          padding: 0,
          position:"sticky",
          top:0,
          background: colorBgContainer,
        }}>
            <ClassHeaderPageStructure/>
          </Header>
          <Layout>
          <div className={`hidden md:flex mt-2`}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#5B6BD4",
              },
            }}
          >
            <Sider
              theme="light"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              
              <ConfigProvider 
                theme={{
                    components:{
                        Menu:{
                            fontFamily:"inter",
                            
                            itemSelectedColor:"black",
                            itemSelectedBg:"rgba(91,107,212,0.45)",
                            
                        }
                    }
                }}
              >
              <Menu
              onClick={handleMenuclick}
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
              />
              </ConfigProvider>
            </Sider>
          </ConfigProvider>
        </div>
        <Layout>
          <Content className="w-full border-2 border-red-600 mt-2">
            <div className="w-full flex flex-col  h-full">

              
              {/* <ClassContent/> */}
              {/* <ClassParticipants/> */}
                <GradeBook/>


            </div>
          </Content>
        </Layout>
          </Layout>
        </Layout>
            
        </Layout>
      </Content>
    </Layout>
  );
};

export default ClassPageStructure;
