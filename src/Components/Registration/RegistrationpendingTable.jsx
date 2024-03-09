import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RegistrationConfirmStudentDrawer from "./RegistrationConfirmStudentDrawer";
// import DeleteButtonPopUp from "./DeleteButtonPopUp";
// import TeacherDetaileditingDrawer from "./TeacherDetaileditingDrawer";
const data = [
  {
    key: "1",
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

const RegistrationpendingTable = () => {
  const [opendeleteModel, setOpendeleteModel] = useState(false);
  const [openeditingDrawer, setOpeneditingDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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
            type="primary"
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
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
      width: "20%",
      ...getColumnSearchProps("fname"),
      sorter: (a, b) => a.fname.length - b.fname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
      width: "20%",
      ...getColumnSearchProps("lname"),
      sorter: (a, b) => a.lname.length - b.lname.length,
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
      key: "phoneno",
      ...getColumnSearchProps("phoneno"),
    },
    {
      title:"Confirmation",
      dataIndex:"confirmation",
      key:"datadonfirmation",
      render:(confstate)=>{
       return confstate?(
        <Tag color="green">
          Detail Confirmed
        </Tag>
       ):(
        <button onClick={()=>setOpeneditingDrawer(true)} className="bg-blue-600 text-white p-1 rounded-md scalar-card hover:bg-blue-700 ">Confirm Info</button>
       )
      }
    },
    {
      title:"payment",
      dataIndex:"payment",
      key:"payment",
      render:()=><button className="bg-blue-600 text-white p-1 rounded-md scalar-card hover:bg-blue-700 ">
        Proceed Payment
      </button>
      
    }
    // ...getColumnSearchProps('action'),
  ];
  return (
    <div className="w-full">
      <Table columns={columns} dataSource={data} />
      {/* <DeleteButtonPopUp
        opendeleteModel={opendeleteModel}
        setOpendeleteModel={setOpendeleteModel}
      /> */}
      <RegistrationConfirmStudentDrawer
        openeditingDrawer={openeditingDrawer}
        setOpeneditingDrawer={setOpeneditingDrawer}
      />
    </div>
  );
};

export default RegistrationpendingTable;
