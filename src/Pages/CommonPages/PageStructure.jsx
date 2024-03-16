import React, { useEffect, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LineChartOutlined,
  CalendarOutlined,
  SolutionOutlined,
  ContactsOutlined,
  ContainerOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from "antd";
import { logo, logoicon } from "../../assets";
import HeaderBar from "../../Components/Header";
import InstitutionInfo from "../../InnerPages/InstitutionInfo";
import NewAppointment from "../../InnerPages/NewAppointment";
import PastAppointments from "../../InnerPages/PastAppointments";
import NotiesParents from "../../InnerPages/NotiesParents";
import ParentProfile from "../../InnerPages/ParentProfile";
import MainClassPage from "../../InnerPages/MainClassPage";
import OwnerPageTeacherPanel from "../../InnerPages/OwnerPageTeacherPanel";
import RegistrationPending from "../../InnerPages/RegistrationPending";
import RegistrationPaymentProceeder from "../../InnerPages/RegistrationPaymentProceeder";
import ClassPayments from "../../InnerPages/ClassPayments";
import { UserRelatedNavigationPanel } from "../../Utils/LeftNavigationlist";
import InnerPageLoader from "./InnerPageLoader";





const { Header, Content, Footer, Sider } = Layout;


const PageStructure = () => {
  const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("profile"))?.result?.role);
  const [pageIndex,setPageIndex]=useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const [mobilemenu, setMobileMenu] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(()=>{
    const userValue=JSON.parse(localStorage.getItem("profile"))?.result?.role;
    setCurrentUser(userValue);
    console.log("current user ",userValue);
  },[JSON.parse(localStorage.getItem("profile"))?.result?.role])

  const openMobilePanel = () => {
    setMobileMenu((pre) => !pre);

  };

  const handleMenuclick=(e)=>{
    console.log("clicked e ",e.key);
    setPageIndex(e.key);
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
          onClick={handleMenuclick}
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={UserRelatedNavigationPanel(currentUser)}
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
                items={UserRelatedNavigationPanel(currentUser)}
              />
              </ConfigProvider>
            </Sider>
          </ConfigProvider>
        </div>
        <Layout className="bg-[#EBEEFF]">
          <Header
            style={{
              padding: 0,
              lineHeight:0,
              background: colorBgContainer,
            }}
          >
            <HeaderBar classMode={false}  openMobilePanel={openMobilePanel} />
          </Header>
          <Content
            style={{
              margin: "0",
              backgroundColor: "#EBEEFF",
            }}
          >
            <div
            className="h-[100%] border-2 border-black"
              style={{
                padding: 4,
                // minHeight: "100%",
                
                background: "#EBEEFF",
                borderRadius: borderRadiusLG,
              }}
            >
              {/* <InstitutionInfo/> */}
              {/* <NewAppointment/> */}
              {/* <PastAppointments/> */}
              {/* <NotiesParents/> */}
              {/* <ParentProfile/> */}
              {/* <MainClassPage/> */}
              {/* <OwnerPageTeacherPanel/> */}
              {/* <RegistrationPending/> */}
              {/* <RegistrationPaymentProceeder/> */}
              {/* <ClassPayments/> */}
              <InnerPageLoader innerPageKey={pageIndex}/>
              
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default PageStructure;
