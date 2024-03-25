import { Layout, theme,ConfigProvider,Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import HeaderBar from "../../Components/Header";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StudentProfileDrawer from "../../Components/Student/StudentProfileDrawer";
import React, { useEffect, useState } from "react";
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
import { classNavigationPanel } from "../../Utils/ClassNavigationList";
import ClassPageLoader from "./ClassPageLoader";
import { useDispatch } from "react-redux";
import { change_classsPage } from "../../Actions/PageNumbers";
import { useNavigate } from "react-router-dom";

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
  const [navigationList,setNavigationList]=useState([]);
  const navigation=useNavigate();
  const [classPageIndex,setClassPageIndex]=useState("A1");
  const [collapsed, setCollapsed] = useState(false);
  const [mobilemenu, setMobileMenu] = useState(false);
  const dispatch=useDispatch();
  const [openeditingDrawer,setOpeneditingDrawer]=useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(()=>{
    
    setNavigationList(classNavigationPanel(JSON.parse(localStorage.getItem("profile"))?.result?.role));

  },[JSON.parse(localStorage.getItem("profile"))?.result?.role])

 
  const openMobilePanel = () => {
    setMobileMenu((pre) => !pre);
  };

  const closeClassPanel=()=>{
    navigation("/")
  }


  const handleMenuclick=(e)=>{
    console.log("clicked e ",e);
    setClassPageIndex(e.key);
    dispatch(change_classsPage(e.key));
  }
  return (
    <Layout className="w-full h-screen z-40">
      <StudentProfileDrawer openprofileeditingDrawer={openeditingDrawer} setProfileOpeneditingDrawer={setOpeneditingDrawer} />
      <Header
        style={{
          padding: 0,
          position:"sticky",
          top:0,
          zIndex:20,
          lineHeight:0,
          background: colorBgContainer,
        }} 
      >
        <HeaderBar classMode={true} openprofileeditingDrawer={openeditingDrawer} setProfileOpeneditingDrawer={setOpeneditingDrawer} openMobilePanel={openMobilePanel} />
      </Header>
      <Content className="flex flex-col justify-center items-center bg-[#EBEEFF] border-2 border-black z-30">
        <Layout className="w-[96%] mt-3   h-[95%] bg-gray-500 rounded-xl border-2 border-black">
        <div className="bg-[#4551A1] p-1  rounded-tl-xl rounded-tr-xl">
          <button onClick={closeClassPanel}>
            <CloseRoundedIcon  className="text-white scalar-card hover:text-black"/>
          </button>
          
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
                items={navigationList}
              />
              </ConfigProvider>
            </Sider>
          </ConfigProvider>
        </div>
        <Layout>
          <Content className="w-full border-2 border-red-600 mt-2">
            <div className="w-full flex flex-col  h-full border-2 border-yellow-500 overflow-y-auto">

              
              {/* <ClassContent/> */}
              {/* <ClassParticipants/> */}
                {/* <GradeBook/> */}
                <ClassPageLoader innerPageKey={classPageIndex}/>


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
