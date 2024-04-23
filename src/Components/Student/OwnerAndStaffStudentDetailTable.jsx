import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";



const OwnerAndStaffStudentDetailTable = ({ studentDetails,studentProfileOpener,setStudentProfileOpener,selectedStudent,setSelectedStudent }) => {
  
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);


  const handleEditStudent=(studentData)=>{
    setSelectedStudent(studentData);
    setStudentProfileOpener(true);
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
                fname && fname.split(")")[0] && fname.split(")")[0] !== "" && fname.split(")")[0]!=null && fname.split(")")[0]!="null"  ? (
                  <img src={`http://localhost:5000/${fname.split(")")[0]}`} />
                ) : (
                  fname.split("(")[1]?.substring(0, 1)
                )
              }
            />
          </div>
        ),
      },
    {
      title: "User ID",
      dataIndex: "UserID",
      key: "UserID",
      width: "12%",
      ...getColumnSearchProps("UserID"),
      sorter: (a, b) => parseInt(a.UserID.substring(2))- parseInt(b.UserID.substring(2)),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Student ID",
      dataIndex: "studentID",
      key: "studentID",
      width: "12%",
      ...getColumnSearchProps("studentID"),
      sorter: (a, b) => a.studentID.length - b.studentID.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "first Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "10%",
      ...getColumnSearchProps("firstName"),
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        width: "10%",
        ...getColumnSearchProps("lastName"),
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "12%",
        ...getColumnSearchProps("email"),
    },
    {
        title: "Phone No",
        dataIndex: "phoneNo",
        key: "phoneNo",
        width: "12%",
        ...getColumnSearchProps("phoneNo"),
      },
    {
        title: "User Status",
        dataIndex: "userStatus",
        key: "userStatus",
        width: "15%",
        ...getColumnSearchProps("userStatus"),
    },
    {
      title: "Action",
      dataIndex: "issuerName",
      key: "issuerName",
      render: (pic,rowData) => {
        return (
            <div className="w-full  flex flex-row  ">
            <Tag
            onClick={()=>handleEditStudent(rowData)}
              className="scalar-card  flex flex-row justify-center w-[50%] text-center  bg-yellow-600 text-white font-medium hover:bg-yellow-700 "
            >
              <p className="ml-2">View/Edit</p>
            </Tag>
            <Tag
            // onClick={()=>handleOpenModel(rowData)}
              className="scalar-card flex flex-row justify-center  w-[50%] text-center  bg-red-600 text-white font-medium hover:bg-red-700 "
            >
              <p className="ml-2">Delete</p>
            </Tag>
            </div>
        );
      },
    },
  ];
  return (
    <>
      <Table pagination={{pageSize:5}} columns={columns} dataSource={studentDetails} />
    </>
  );
};



export default OwnerAndStaffStudentDetailTable