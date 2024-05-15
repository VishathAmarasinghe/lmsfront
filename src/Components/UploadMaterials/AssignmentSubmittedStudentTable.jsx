import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Popconfirm, Space, Table, Tag, notification } from "antd";
import Highlighter from "react-highlight-words";


const AssignmentSubmittedStudentTable = ({ submissionData }) => {
  
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);


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
                fname.split("(")[1].substring(0, 1)
              )
            }
          />
        </div>
      ),
    },
    {
        title: "UserID",
        dataIndex: "UserID",
        key: "UserID",
        width: "20%",
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
        title: "Submission Date",
        dataIndex: "submissionDate",
        key: "submissionDate",
        ...getColumnSearchProps("submissionDate"),
    },
    {
        title: "Submission Time",
        dataIndex: "submissionTime",
        key: "submissionTime",
        ...getColumnSearchProps("submissionTime"),
    },
    {
      title: "Action",
      dataIndex: "userStatus",
      
      key: "userStatus",
      render: (pic, rowData) => {
        return (
            <Tag
              className="scalar-card flex flex-row w-[50%] text-center  bg-yellow-600 text-white font-medium hover:bg-yellow-700 "
           
            >
              <p className="ml-2">Edit Info</p>
            </Tag>
        );
      },
    },
    // ...getColumnSearchProps('action'),
  ];
  return (
    <>
      <Table columns={columns} dataSource={submissionData} />
   
    </>
  );
};



export default AssignmentSubmittedStudentTable