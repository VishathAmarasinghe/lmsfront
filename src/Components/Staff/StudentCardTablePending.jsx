import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import StaffDetailEditingDrawer from "./StaffDetailEditingDrawer";
import StudentCardSheedCreationModel from "./StudentCardSheedCreationModel";

const StudentCardTablePending = ({ pendingCards,fetchPendingStudentCards }) => {

  const [studentCardSheedModelOpen,setStudentCardSheetModelOpen]=useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedCardContent,setSelectedCardContent]=useState([]);


  const handleOpenSheetModel=()=>{
    setStudentCardSheetModelOpen(true);
  }

  useEffect(()=>{

  },[])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };


  useEffect(()=>{
    // const contentArray=selectedRowKeys.map((key)=>)
    console.log("const array  ",selectedRowKeys);
    findImagesByIdArray(selectedRowKeys,pendingCards);
  },[selectedRowKeys])


  useEffect(()=>{
    console.log("selected card content ",selectedCardContent);
  },[selectedCardContent])



  const findImagesByIdArray = (idArray, data) => {
    const foundObjects = [];
    idArray.forEach((id) => {
      const foundObject = data.find((item) => item.UserID === id);
      if (foundObject) {
        foundObjects.push(foundObject);
      }
    });
    setSelectedCardContent(foundObjects);
    // return foundObjects;
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
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);

    },
    getCheckboxProps: (record) => ({
      disabled: record.cardStatus !== "pending", // Disable row selection for non-pending rows
    }),
  };

  const handleTagClick = (record) => {
    if (record.cardStatus === "pending") {
      const updatedSelectedRowKeys = [...selectedRowKeys];
      if (!selectedRowKeys.includes(record.key)) {
        updatedSelectedRowKeys.push(record.key);
      } else {
        const index = updatedSelectedRowKeys.indexOf(record.key);
        updatedSelectedRowKeys.splice(index, 1);
      }
      setSelectedRowKeys(updatedSelectedRowKeys);
    }
  };

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
      render: (status) => <Tag color={status === "pending" ? "blue" : "default"}>{status}</Tag>, // Render status as a Tag component
    },
    {
      title: "Action",
      width: "15%",
      dataIndex: "cardStatus",
      render: (pic, rowData) => {
        return pic === "pending" ? (
          <Tag
            className="scalar-card flex flex-row w-full text-center  bg-blue-600 text-white font-medium hover:bg-blue-700 "
            onClick={() => handleTagClick(rowData)}
          >
            <p className="ml-2">Proceed for Manufacturing</p>
          </Tag>
        ) : pic === "manufacturing" ? (
          <Tag className="scalar-card flex flex-row w-full justify-around bg-green-600 hover:bg-green-700  text-white font-medium">
            <p>Card Returned</p>
          </Tag>
        ) : pic === "CardReturned" ? (
          <Tag className="scalar-card flex flex-row w-[50%] justify-around bg-purple-600 hover:bg-purple-700  text-white font-medium">
            <p>HandOver Card</p>
          </Tag>
        ) : (
          <></>
        );
      },
    },
  ];

  return (
    <div className="w-full ">
      <StudentCardSheedCreationModel selectedRowKeys={selectedRowKeys} fetchPendingStudentCards={fetchPendingStudentCards} selectedCardContent={selectedCardContent} studentCardSheedModelOpen={studentCardSheedModelOpen} setStudentCardSheetModelOpen={setStudentCardSheetModelOpen}/>
      <Table
        pagination={{ pageSize: 4 }}
        columns={columns}
        dataSource={pendingCards}
        rowSelection={rowSelection} 
      />
      {
        selectedRowKeys.length>0?<div data-aos="fade-up"  className="w-full  flex flex-row">
        <div className="w-[80%]  ">
          <Form layout="vertical" className="w-full">
            <Form.Item
            style={{fontWeight:"bold"}}
            label="Selected Users"
            help="for one A4 size paper can have maximum 10 studentIDs"
            >
              <div className="w-full  p-2 bg-slate-200 grid grid-cols-12">
                {
                  selectedRowKeys.map((row)=><Tag  className="p-1 text-center bg-blue-600 hover:bg-blue-700 text-white">
                    {row}
                  </Tag>)
                }
              </div>

            </Form.Item>
          </Form>
        </div>
        <div className="w-[20%]  flex flex-col justify-center text-center text-white font-medium "> 
              <button onClick={handleOpenSheetModel} className="bg-green-600 p-1 rounded-md hover:bg-green-700 scalar-card">
                Create Paper/Proceed
              </button>
        </div>
      </div>:<></>
      }
      
    </div>
  );
};

export default StudentCardTablePending;
