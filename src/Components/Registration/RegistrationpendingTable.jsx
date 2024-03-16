import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RegistrationConfirmStudentDrawer from "./RegistrationConfirmStudentDrawer";
import { useDispatch } from "react-redux";
import { get_pending_confirmed_students } from "../../Actions/user";
import { useSelector } from "react-redux";

const data = [
  {
    key: "1",
    userID:"US001",
    fname: "John Brown",
    lname: "wijenayaka",
    email: "john@gamil.com",
    phoneNo: "0789696988",
    confirmation:true,
    payment:"pay"
  },
  {
    key: "2",
    fname: "Nisal thathsara",
    lname: "jayawardana",
    email: "Nisal@gamil.com",
    phoneNo: "0789645888",
    confirmation:true,
    payment:"pay"
  },
  {
    key: "3",
    fname: "Pathum ",
    lname: "Chathuranga",
    email: "pathum@gamil.com",
    phoneNo: "0744696988",
    confirmation:false,
    payment:"pay"
  },
  {
    key: "4",
    fname: "Wikum",
    lname: "rasanjana",
    email: "wikum@gamil.com",
    phoneNo: "0789677988",
    confirmation:false,
    payment:"pay"
  },
];

const RegistrationpendingTable = ({pendingUsers}) => {
  const [selectedStudent,setSelectedStudent]=useState(null);
  const [statusChanger,setStatusChanger]=useState(false);
  const [openeditingDrawer, setOpeneditingDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);


  const formattedData = pendingUsers.map((user, index) => ({
    ...user,
    key: user.UserID, 
  }));

  const handleConfirmInfo=(rowdata)=>{
    console.log("selected Row data ",rowdata);
    setSelectedStudent(rowdata);
    // setStatusChanger(true);
    setOpeneditingDrawer(true)
  }




  const drawerConfigOpening = () => {
    setOpeneditingDrawer(true);
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
            className="bg-[#065AD8] text-white "
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
      title: "UserID",
      dataIndex: "UserID",
      key: "UserID",
      width: "10%",
      ...getColumnSearchProps("UserID"),
      sorter: (a, b) => a.UserID.length - b.UserID.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "15%",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "15%",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => {
        if (a.lastName !== null && b.lastName !== null) {
          return a.lastName.length - b.lastName.length;
        } else {
          if (a.lastName === null && b.lastName === null) return 0;
          if (a.lastName === null) return 1;
          return -1;
        }
      },
      sortDirections: ["descend", "ascend"],
    },
   
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
      ...getColumnSearchProps("phoneNo"),
    },
    {
      title:"Confirmation",
      dataIndex:"userStatus",
      key:"datadonfirmation",
      render:(confstate,rowData)=>{
       return confstate!=="pending"?(
        <Tag color="green" className="w-[100%] font-medium text-center bg-green-700 text-white">
          Detail Confirmed
        </Tag>
       ):(
        <Tag onClick={()=>handleConfirmInfo(rowData)} className="w-[100%] font-medium text-center bg-blue-600 text-white  scalar-card hover:bg-blue-700 ">Confirm Info</Tag>
       )
      }
    },
    {
      title:"payment",
      dataIndex:"email",
      key:"email",
      render:()=><Tag className="bg-blue-600 w-[100%] text-center font-medium text-white scalar-card hover:bg-blue-700 ">
        Proceed Payment
      </Tag>
    }
  ];
  return (
    <div className="w-full">
      <Table columns={columns} dataSource={formattedData} pagination={{pageSize:7}}  />
      
      <RegistrationConfirmStudentDrawer
      // statusChanger={statusChanger}
      setSelectedStudent={setSelectedStudent}
        selectedStudent={selectedStudent}
        openeditingDrawer={openeditingDrawer}
        setOpeneditingDrawer={setOpeneditingDrawer}
      />
    </div>
  );
};

export default RegistrationpendingTable;
