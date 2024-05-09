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
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificClass } from "../../Actions/class";
import { useSelector } from "react-redux";

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
  const [selectedClassDetails,setSelectedClassDetails]=useState("");
  const navigation=useNavigate();
  const defaultmenuSelector=useSelector((state)=>state.page);
  const [classPageIndex,setClassPageIndex]=useState("A1");
  const [collapsed, setCollapsed] = useState(false);
  const [mobilemenu, setMobileMenu] = useState(false);
  const {classID}=useParams();
  const dispatch=useDispatch();
  const [openeditingDrawer,setOpeneditingDrawer]=useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const activeUser=JSON.parse(localStorage.getItem("profile"))?.result?.role;

  useEffect(()=>{
    
    
    console.log("defualt menu selector ",defaultmenuSelector);
    setNavigationList(classNavigationPanel(activeUser));
    if (activeUser=="teacher") {
      dispatch(change_classsPage("A5"))
    }
    

  },[JSON.parse(localStorage.getItem("profile"))?.result?.role])


  useEffect(()=>{
    
    dispatch(getSpecificClass(classID));
    // const classData=getSpecificClass(classID);
    // setSelectedClassDetails(classData);
  },[classID])


  useEffect(()=>{
    if (activeUser=="teacher") {
      dispatch(change_classsPage("A5"))
    }else if(activeUser=="student"){
      dispatch(change_classsPage("A1"))
    }
  },[])

 
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
    <Layout data-aos="zoom-in" className="w-full h-screen z-40">
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
      <Content className="flex flex-col justify-center items-center bg-[#EBEEFF]  z-30">
        <Layout className="w-full  h-[95%] bg-gray-500  ">
        <div className="bg-[#4551A1] p-1  ">
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
                defaultSelectedKeys={["A5"]}
                mode="inline"
                items={navigationList}
              />
              </ConfigProvider>
            </Sider>
          </ConfigProvider>
        </div>
        <Layout>
          <Content className="w-full  mt-2">
            <div className="w-full flex flex-col items-center justify-center bg-[#EBEEFF]  h-full  overflow-y-auto">

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
