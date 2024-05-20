import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Popconfirm, Space, Table, Tag, message } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import StaffDetailEditingDrawer from "./StaffDetailEditingDrawer";
import { reCreateStudentCard } from "../../API";


const StudentCardTableIssued = ({   pastCards,fetchHandOveredStudentCards }) => {
  const [opendeleteModel, setOpendeleteModel] = useState(false);
  
  const [selectedStaffMember,setSelectedTeacher]=useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleRecreateCard=async(rowData)=>{
    try {
      const reCreateResult=await reCreateStudentCard(rowData?.UserID);
      if (reCreateResult.status==200) {
        message.success("Send To pending list to recreate Card!")
      }
    } catch (error) {
      console.log("re creation Error!");
      message.error("Re creation Error!")
    }
    fetchHandOveredStudentCards();
  }


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
      title: "User ID",
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
      width: "20%",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "20%",
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneno",
      width: "15%",
      ...getColumnSearchProps("phoneno"),
    },
    {
      title: "Status",
      dataIndex: "cardStatus",
      width: "15%",
     
    },
    
    {
      title: "Action",
      width: "15%",
      dataIndex: "cardStatus",
      render: (pic,rowData) => {
        return pic == "handOvered" ? (
          <Popconfirm
              title="Re Create Student Card"
              description="Are you sure to Recreate Student Card?"
              onConfirm={()=>handleRecreateCard(rowData)}
              okType="default"
              okButtonProps={{
                className: "bg-blue-500 hover:bg-blue-600 text-white",
              }}
              placement="left"
              okText="Yes"
              cancelText="No"
            >
            <Tag
            className="scalar-card flex flex-row w-full justify-around bg-purple-600 hover:bg-purple-700  text-white font-medium"
          >
            <p>ReCreate Card</p>
          </Tag>
          </Popconfirm>
          ):<></>
      },
    },
  ];
  return (
    <>
      <Table pagination={{pageSize:6}} columns={columns} dataSource={pastCards} />
   
    </>
  );
};




export default StudentCardTableIssued