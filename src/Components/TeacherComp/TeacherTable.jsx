import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteButtonPopUp from "./DeleteButtonPopUp";
import TeacherDetaileditingDrawer from "./TeacherDetaileditingDrawer";
const data = [
  {
    key: "1",
    fname: "John Brown",
    lname: "wijenayaka",
    subject: "sinhala",
    email: "john@gamil.com",
    phoneNo: "0789696988",
    action: "new",
  },
  {
    key: "2",
    fname: "Nisal thathsara",
    lname: "jayawardana",
    subject: "English",
    email: "Nisal@gamil.com",
    phoneNo: "0789645888",
    action: "old",
  },
  {
    key: "3",
    fname: "Pathum ",
    lname: "Chathuranga",
    subject: "Science",
    email: "pathum@gamil.com",
    phoneNo: "0744696988",
    action: "new",
  },
  {
    key: "4",
    fname: "Wikum",
    lname: "rasanjana",
    subject: "Maths",
    email: "wikum@gamil.com",
    phoneNo: "0789677988",
    action: "Old",
  },
];

const TeacherTable = ({ teacherData, setTeacherData,openeditingDrawer, setOpeneditingDrawer }) => {
  const [opendeleteModel, setOpendeleteModel] = useState(false);
  
  const [selectedTeacher,setSelectedTeacher]=useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const drawerConfigOpening = (rowData,type) => {
    console.log("selectd row data is ",rowData);
    setSelectedTeacher(rowData);
    if (type=="Verify") {
      setOpeneditingDrawer({...openeditingDrawer,status:true,task:"Verify"});
    }else{
      setOpeneditingDrawer({...openeditingDrawer,status:true,task:"Update"});
    }
    
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "",
      dataIndex: "photoName",
      key: "photoName",
      width: "5%",
      render: (fname) => (
        <div className="flex items-center">
          <Avatar
          className="scalar-cardlg"
            style={{ backgroundColor: "#87d068" }}
            icon={
              fname && fname.split(")")[0] && fname.split(")")[0] !== "" ? (
                <img src={`http://localhost:5000/${fname.split(")")[0]}`} />
              ) : (
                fname.split("(")[1].substring(0, 1)
              )
            }
          />
        </div>
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "20%",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.lname.length - b.lname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "20%",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.lname.length - b.lname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "25%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneno",
      ...getColumnSearchProps("phoneno"),
    },
    {
      title: "Action",
      dataIndex: "userStatus",
      
      key: "userStatus",
      render: (pic,rowData) => {
        return pic == "activated" ? (
          <div className="border-2 border-red-400 w-full flex flex-row justify-between">
            <Tag
             
              className="scalar-card flex flex-row w-[50%] text-center  bg-yellow-600 text-white font-medium hover:bg-yellow-700 "
              onClick={() => drawerConfigOpening(rowData,"Updated")}
            >
              <EditRoundedIcon className="text-[20px] text-white scalar-card" />
              <p className="ml-2">Edit</p>
            </Tag>
            <Tag
              
              className="scalar-card flex flex-row w-[50%] justify-around bg-red-600 hover:bg-red-700  text-white font-medium"
              onClick={() => setOpendeleteModel(true)}
            >
              <DeleteOutlineRoundedIcon className="text-[20px] scalar-card" />
              <p >Delete</p>
            </Tag>
          </div>
        ) : (
          <div className="border-2 border-red-400 w-full items-center justify-center">
            <Tag
              onClick={() => drawerConfigOpening(rowData,"Verify")}
              color="green"
              className="scalar-card w-[100%] font-medium text-center bg-green-700 hover:bg-green-800 text-white"
            >
              Verify Teacher
            </Tag>
          </div>
        );
      },
    },
    // ...getColumnSearchProps('action'),
  ];
  return (
    <>
      <Table columns={columns} dataSource={teacherData} />
      <DeleteButtonPopUp
        opendeleteModel={opendeleteModel}
        setOpendeleteModel={setOpendeleteModel}
      />
      <TeacherDetaileditingDrawer
      selectedTeacherData={selectedTeacher}
      teacherStatus={"owner"}
        openeditingDrawer={openeditingDrawer}
        setOpeneditingDrawer={setOpeneditingDrawer}
      />
    </>
  );
};

export default TeacherTable;
