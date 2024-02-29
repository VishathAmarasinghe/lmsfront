import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import { logo, logoicon } from "../../assets";
import HeaderBar from "../../Components/Header";
import InstitutionInfo from "../../InnerPages/InstitutionInfo";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
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

const PageStructure = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobilemenu, setMobileMenu] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const openMobilePanel = () => {
    setMobileMenu((pre) => !pre);
  };

  const handleMenuclick=(e)=>{
    console.log("clicked e ",e);
  }

  return (
    <div className="flex flex-row border-2 border-red-700 h-screen overflow-hidden ">
      <div className="h-[40px] mt-5 flex md:hidden z-50  border-2 border-black">
        {/* <div className=" border-2 border-green-800 h-[40px]">
          <MenuRoundedIcon onClick={openMobilePanel} />
        </div> */}
        <div
        
          className={`${
            mobilemenu ? "flex" : "hidden"
          } md:hidden absolute w-1/2 h-screen border-2 border-yellow-700 mt-12`}
        >
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </div>
      </div>
      <Layout
        style={{
          minHeight: "100vh",
          border:"2px solid yellow"
        }}
      >
        <div className={`hidden md:flex`}>
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
              <div className="w-full my-4 flex flex-col justify-center items-center">
                <img
                  src={collapsed ? logoicon : logo}
                  className={collapsed ? "w-1/3" : "w-2/3"}
                  alt="logo"
                />
              </div>
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
        <Layout className="bg-[#EBEEFF]">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <HeaderBar openMobilePanel={openMobilePanel} />
          </Header>
          <Content
            style={{
              margin: "15px 16px",
              backgroundColor: "#EBEEFF",
            }}
          >
            <div
            className="h-[100%] border-2 border-green-500"
              style={{
                padding: 4,
                // minHeight: "100%",
                
                background: "#EBEEFF",
                borderRadius: borderRadiusLG,
              }}
            >
              <InstitutionInfo/>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default PageStructure;
