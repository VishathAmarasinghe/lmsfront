import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Popconfirm, Space, Table, Tag, message } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { activateDeactivateHall } from "../../API";
import DeactivateHallConfirmClassmodel from "./DeactivateHallConfirmClassmodel";
import SMSTempEditingModel from "./SMSTempEditingModel";
import EmailTemplateEditingModel from "./EmailTemplateEditingModel";





const EmailTemplateTable = ({emailTempData }) => {
  
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [emailTempEditingModelOpen,setEmailTempEditingModelOpen]=useState(false);
  const [selectedEmailTemplate,setSelectedEmailTemplate]=useState(null);



  const handleOpenSMSEditingModel=(rowdata)=>{
    setEmailTempEditingModelOpen(true);
    setSelectedEmailTemplate(rowdata);
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
      title: "Email ID",
      dataIndex: "eTempID",
      key: "eTempID",
      width: "10%",
      ...getColumnSearchProps("eTempID"),
      sorter: (a, b) => a.eTempID.length - b.eTempID.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
        title: "subject",
        dataIndex: "subject",
        key: "subject",
        width: "15%",
        ...getColumnSearchProps("subject"),
        sorter: (a, b) => a.subject.length - b.subject.length,
        sortDirections: ["descend", "ascend"],
      },
    
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: "35%",
      ...getColumnSearchProps("message"),
      sorter: (a, b) => a.message.length - b.message.length,
      sortDirections: ["descend", "ascend"],
    },
    {
        title: "Update Date",
        dataIndex: "updateDate",
        key:"updateDate",
        width:"12%",
        ...getColumnSearchProps("updateDate"),
      },
      {
        title: "Update Time",
        dataIndex: "updateTime",
        key: "updateTime",
        width: "10%",
      },
    {
      title: "Action",
      dataIndex: "SMStempID",
      key: "SMStempID",
      render: (pic,rowData) => {
        return (
            <Tag
           onClick={()=>handleOpenSMSEditingModel(rowData)}
            color="green"
              className=" flex flex-col w-full text-center   font-medium bg-green-600 text-white hover:bg-green-700 scalar-card"
            >
              <p className="ml-2">Edit Message</p>
            </Tag>
        ) 
      },
    },
  ];


  
  return (
    <>
    
      <Table columns={columns} dataSource={emailTempData} pagination={{pageSize:5}} />
      <EmailTemplateEditingModel  selectedSMSTemplate={selectedEmailTemplate} setSelectedSMSTemplate={setSelectedEmailTemplate} smsTempEditingModelOpen={emailTempEditingModelOpen} setSmsTempEditingModelOpen={setEmailTempEditingModelOpen}/>
      
    </>
  );
};



export default EmailTemplateTable