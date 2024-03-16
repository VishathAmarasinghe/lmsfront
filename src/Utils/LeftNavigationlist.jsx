import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  AppstoreOutlined,
  LineChartOutlined,
  CalendarOutlined,
  SolutionOutlined,
  ContactsOutlined,
  ContainerOutlined,
  ProfileOutlined,
  ShoppingOutlined,
  TransactionOutlined,
  TranslationOutlined,
  ScheduleOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import MainClassPage from "../InnerPages/MainClassPage";
import StudentDashboard from "../InnerPages/StudentDashboard";

function getItem(label, key, icon, children) {
  return {
    key,
    icon: icon,
    children,
    label
  };
}

const Parentitems = [
  getItem("Dashboard", "1", <AppstoreOutlined/>),
  getItem("Performance", "2", <LineChartOutlined />),
  getItem("Appointments", "sub1", <CalendarOutlined />, [
    getItem("New Appointments", "3", <ContainerOutlined />),
    getItem("Past Appointments", "4", <ContactsOutlined />)
  ]),
  getItem("Notices", "5", <ProfileOutlined />),
  getItem("Profile", "6", <SolutionOutlined />)
];

const studentitems = [
  getItem("Dashboard", "7", <AppstoreOutlined/>),
  getItem("Classes", "8", <TeamOutlined />),
  getItem("Time Table", "9", <CalendarOutlined />),
  getItem("Notices", "10", <ProfileOutlined />),
  // getItem("Profile", "6", <SolutionOutlined />)
];

const teacheritems = [
  getItem("Dashboard", "11", <AppstoreOutlined/>),
  getItem("Classes", "12", <TeamOutlined />),
  getItem("Time Table", "13", <CalendarOutlined />),
  getItem("Notices", "14", <ProfileOutlined />),
  getItem("Appointments", "15", <SolutionOutlined />)
];

const staffitems = [
  getItem("Dashboard", "16", <AppstoreOutlined/>),
  getItem("Payments", "sub3", <ShoppingOutlined />,[
    getItem("Registration", "17", <TranslationOutlined />),
    getItem("Class Payment", "18", <TransactionOutlined />),
    getItem("Past Payments", "19", <ShoppingOutlined />)
  ]),
  getItem("Classes", "20", <TeamOutlined />),
  getItem("Time Table", "21", <CalendarOutlined />),
  getItem("Notices", "22", <ProfileOutlined />),
];

const owneritems = [
  getItem("Dashboard", "23", <AppstoreOutlined/>),
  getItem("Teachers", "24", <TeamOutlined />),
  getItem("Students", "25", <SolutionOutlined/>),
  getItem("Staff", "26", <UserOutlined />),
  getItem("Payments", "27", <ShoppingOutlined/>),
  getItem("Classes", "28", <ScheduleOutlined />),
  getItem("Reports", "29", <FileTextOutlined />),
  
];

const UserRelatedNavigationPanel=(usertype)=>{
  switch (usertype) {
    case "teacher":
      return teacheritems;
    case "student":
      return studentitems;
    case "staff":
      return staffitems;
    case "owner":
      return owneritems;
    case "parent":
      return Parentitems;  
    default:
      return [];
  }
}

const SubContentChanger=(key)=>{
  switch (key) {
    case 7:
      console.log("came here");
      return StudentDashboard
    case 8:
      return MainClassPage
    default:
      break;
  }
}

export {UserRelatedNavigationPanel};
