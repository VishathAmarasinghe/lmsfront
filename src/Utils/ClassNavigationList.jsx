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

  function getItem(label, key, icon, children) {
    return {
      key,
      icon: icon,
      children,
      label
    };
  }


const studentClassItems = [
    getItem("Course Content", "A1", <AppstoreOutlined/>),
    getItem("Participants", "A2", <TeamOutlined />),
    getItem("Grade Book", "A3", <PieChartOutlined/>),
    getItem("Anouncements", "A4", <CalendarOutlined />),
   
  ];


  const teacherClassItems = [
    getItem("Course Content", "A5", <AppstoreOutlined/>),
    getItem("Participants", "A6", <TeamOutlined />),
    getItem("Grade Book", "Asub7", <PieChartOutlined/>,[
        getItem("Marks", "A7", <AppstoreOutlined/>),
        getItem("Mark Analytics", "A8", <LineChartOutlined/>),
    ]),
    getItem("Anouncements", "A9", <CalendarOutlined />),
   
  ];


  const classNavigationPanel=(usertype)=>{
    switch (usertype) {
      case "teacher":
        return teacherClassItems;
      case "student":
        return studentClassItems;
      default:
        return [];
    }
  }

export {classNavigationPanel};