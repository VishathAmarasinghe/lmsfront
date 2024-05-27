import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Popconfirm, Space, Table, Tag, message } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import OwnerClassDetailsShowerModel from "./OwnerClassDetailsShowerModel";
import { classStatusChange } from "../../API";




const OwnerClassTable = ({ classData,classDetailedPanelOpen,setClassDetailedPanelOpen,fetchClassInfo }) => {
  const [opendeleteModel, setOpendeleteModel] = useState(false);
  const [selectedClass,setSelectedClass]=useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);


  const reactivateDeactivateClass=async(classData,status)=>{
    try {
      const classStatusData={
        classStatus:status,
        classID:classData?.classID
      }
      const classStatusChangingResult=await classStatusChange(classStatusData);
      if (classStatusChangingResult.status==200) {
        fetchClassInfo();
        message.success(`Class ${status} Successfully!`)
      }
    } catch (error) {
      message.error(`${status} process faild, Please try again later.`)
      console.log("error ",error);
    }
  }

 



  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };


  const handleOpenClassDetailModel=(rowData)=>{
    console.log("selected class is ",rowData);
    setSelectedClass(rowData);
    setClassDetailedPanelOpen(true);
    
  }


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
      title: "Class ID",
      dataIndex: "classID",
      key: "classID",
      width: "15%",
      ...getColumnSearchProps("classID"),
      sorter: (a, b) => a.lname.length - b.lname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Class Name",
      dataIndex: "ClassName",
      key: "ClassName",
      width: "20%",
      ...getColumnSearchProps("ClassName"),
      sorter: (a, b) => a.lname.length - b.lname.length,
      sortDirections: ["descend", "ascend"],
    },
    
    {
      title: "Subject",
      dataIndex: "subjectName",
      key: "subjectName",
      width: "15%",
      ...getColumnSearchProps("subjectName"),
    },
    {
        title: "Grade",
        dataIndex: "gradeName",
        key:"gradeName",
        width:"15%",
        ...getColumnSearchProps( "gradeName"),
      },
      {
        title: "Class Mode",
        dataIndex: "ClassMode",
        key: "ClassMode",
        width: "15%",
        ...getColumnSearchProps("ClassMode"),
      },
      {
        title: "Status",
        dataIndex: "classStatus",
        key: "classStatus",
        width: "15%",
        ...getColumnSearchProps("classStatus"),
      },
    {
      title: "Action",
      dataIndex: "classStatus",
      key: "classStatus",
      render: (pic,rowData) => {
        return pic=="activated"? (
          <div className="w-full flex flex-row">
            <Tag
            onClick={()=>handleOpenClassDetailModel(rowData)}
            color="green"
              className=" flex flex-col w-full text-center   font-medium bg-green-600 text-white hover:bg-green-700 scalar-card"
             
            >
              <p className="">View More Info</p>
            </Tag>
            <Popconfirm
            title="Deactivate Class"
            description="Are you sure to deactivate this class?"
            onConfirm={() => reactivateDeactivateClass(rowData,"deactivated")}
            okType="default"
            okButtonProps={{
              className: "bg-blue-500 hover:bg-blue-600 text-white",
            }}
            placement="left"
            okText="Yes"
            cancelText="No"
          >
            <Tag
            color="green"
              className=" flex flex-col w-full text-center   font-medium bg-red-600 text-white hover:bg-red-700 scalar-card"
             
            >
              <p className="">Deactivate Class</p>
            </Tag>
            </Popconfirm>
            </div>
        ):pic=="deactivated"?
        <Popconfirm
            title="Reactivate Class"
            description="Are you sure to Reactivate this class?"
            onConfirm={() => reactivateDeactivateClass(rowData,"activated")}
            okType="default"
            okButtonProps={{
              className: "bg-blue-500 hover:bg-blue-600 text-white",
            }}
            placement="left"
            okText="Yes"
            cancelText="No"
          >
        <Tag
        color="green"
          className=" flex flex-col w-full text-center   font-medium bg-purple-600 text-white hover:bg-purple-700 scalar-card"
         
        >
          <p>Reactivate Class</p>
        </Tag>
        </Popconfirm>
        :<></>
      },
    },
  ];


  
  return (
    <>
    <OwnerClassDetailsShowerModel selectedClass={selectedClass} classDetailedPanelOpen={classDetailedPanelOpen} setClassDetailedPanelOpen={setClassDetailedPanelOpen}/>
      <Table columns={columns} dataSource={classData} pagination={{pageSize:5}} />
    </>
  );
};

export default OwnerClassTable;
