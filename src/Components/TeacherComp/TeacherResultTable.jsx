import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Popconfirm, Space, Table, Tag, message } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { deleteResults } from "../../API";



const TeacherResultTable = ({fetchClassResults, classResult,selectedClassResult,setSelectedClassResult,openingResultPanel,setOpeningResultPanel }) => {
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


 const  handleOpenModel=(rowData)=>{
  console.log("roow data of selected resut ",rowData);
    setSelectedClassResult(rowData);
    setOpeningResultPanel(true);
 }

 const handleDeleteResult=async(rowData)=>{
  try {

    const deleteStatus=await deleteResults(rowData?.resultID);
    if (deleteStatus.status==200) {
      message.success("Results deleted successfully!")
      fetchClassResults();
    }
  } catch (error) {
    message.error("Result Deletion Error!")
    console.log("error ",error);
  }
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
      title: "Result ID",
      dataIndex: "resultID",
      key: "resultID",
      width: "15%",
      ...getColumnSearchProps("resultID"),
      sorter: (a, b) => a.lname.length - b.lname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Publish Data",
      dataIndex: "publishDate",
      key: "publishDate",
      width: "20%",
      ...getColumnSearchProps("publishDate"),
      sorter: (a, b) => a.lname.length - b.lname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "class ID",
      dataIndex: "classID",
      key: "classID",
      width: "15%",
      ...getColumnSearchProps("classID"),
    },
    {
      title: "Result Title",
      dataIndex: "resultTitle",
      key: "resultTitle",
      width: "30%",
      ...getColumnSearchProps("resultTitle"),
    },
    {
      title: "Action",
      dataIndex: "userStatus",
      key: "userStatus",
      render: (pic,rowData) => {
        return (
            <div className="w-full  flex flex-row justify-between">
            <Tag
            onClick={()=>handleOpenModel(rowData)}
              className="scalar-card flex flex-row justify-center w-full text-center  bg-yellow-600 text-white font-medium hover:bg-yellow-700 "
            >
              <p className="ml-2">Edit Info</p>
            </Tag>
            <Popconfirm
              title="Deleting Result"
              description="Are you sure you want to delete entire results?"
              onConfirm={()=>handleDeleteResult(rowData)}
              okType="default"
              okButtonProps={{
                className: "bg-blue-500 hover:bg-blue-600 text-white",
              }}
              placement="left"
              okText="Yes"
              cancelText="No"
            >
            <Tag

              className="scalar-card flex flex-row justify-center w-full text-center  bg-red-600 text-white font-medium hover:bg-red-700 "
            >
              <p className="ml-2">Delete</p>
            </Tag>
            </Popconfirm>
            </div>
        );
      },
    },
  ];
  return (
    <>
      <Table pagination={{pageSize:4}} columns={columns} dataSource={classResult} />
      
      
    </>
  );
};


export default TeacherResultTable