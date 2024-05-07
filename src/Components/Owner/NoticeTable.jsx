import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Descriptions, Input, Popconfirm, Space, Table, Tag, message } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { activateDeactivateHall, deleteAnnouncement } from "../../API";
import DeactivateHallConfirmClassmodel from "./DeactivateHallConfirmClassmodel";





const NoticeTable = ({ annoucementData,fetchAllAnnouncements}) => {
  
  
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [loading,setLoading]=useState(false);


 

  


  const deleteConfirmTask = async(rowData,activatedStatus) => {
    try {
        setLoading(true);
        const deleteResult=await deleteAnnouncement(rowData?.announcementID);
        if (deleteResult.status==200) {
            message.success("Announcement Deleted Successfully")
        }
        setLoading(false)
    } catch (error) {
        setLoading(false);
        message.error("Anouncement deleting error!")
    }
    fetchAllAnnouncements();


  };

  const popConfirmcancel = (e) => {
    console.log(e);
    
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
      title: "ID",
      dataIndex: "announcementID",
      key: "announcementID",
      width: "10%",
      ...getColumnSearchProps("announcementID"),
      sorter: (a, b) => a.announcementID.length - b.announcementID.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      width: "15%",
      ...getColumnSearchProps("createdDate"),
      sorter: (a, b) => a.createdDate.length - b.createdDate.length,
      sortDirections: ["descend", "ascend"],
    },
    
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
      ...getColumnSearchProps("title"),
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend", "ascend"],
    },
    {
        title: "Description",
        dataIndex: "description",
        key:"description",
        width:"15%",
        ...getColumnSearchProps("description"),
      },
      {
        title: "Sent Mode",
        dataIndex: "mode",
        key: "mode",
        width: "15%",
        ...getColumnSearchProps("mode"),
      },
      {
        title: "Audience",
        dataIndex: "audience",
        key: "audience",
        width: "15%",
        ...getColumnSearchProps("audience"),
      },
      {
        title: "Sender ID",
        dataIndex: "userID",
        key: "userID",
        width: "15%",
        ...getColumnSearchProps("userID"),
      },
      {
        title: "Related Class List",
        dataIndex: "classIDs",
        key: "classIDs",
        width: "15%",
        ...getColumnSearchProps("classIDs"),
      },
    {
      title: "Action",
      dataIndex: "hallStatus",
      key: "hallStatus",
      render: (pic,rowData) => {
        return (
            <Popconfirm
            
              title="Delete Notice"
              description="Are you sure to delete this notice?"
              onConfirm={() => deleteConfirmTask(rowData,"deactivated")}
              onCancel={popConfirmcancel}
              okType="default"
              okButtonProps={{
                className: "bg-blue-500 hover:bg-blue-600 text-white",
                loading:loading
              }}
              okText="Yes"
              cancelText="No"
              placement="leftTop"
            >
            <Tag
            color="green"
              className=" flex flex-col w-full text-center   font-medium bg-red-600 text-white hover:bg-red-700 scalar-card"
            >
              <p className="ml-2">Delete Announcement</p>
            </Tag>
            </Popconfirm>
        ) 
      },
    },
  ];


  const expandedRowRender = (record) => {
    const Senderitems = [
        {
          key: '1',
          label: 'UserID',
          children: record?.senderInfo?.UserID
        },
        {
          key: '2',
          label: 'Name',
          children: record?.senderInfo?.firstName+" "+ record?.senderInfo?.lastName,
        },
        {
          key: '3',
          label: 'Role',
          children:record?.senderInfo?.role ,
        },
        {
          key: '4',
          label: 'Email',
          children: record?.senderInfo?.email,
        },
        {
          key: '5',
          label: 'Phone No',
          children: record?.senderInfo?.phoneNo,
          span: 2,
        },
    ]




    return (
      <div>
        <Descriptions title="Sender Info" bordered items={Senderitems} />
        {record?.classList.length>0?<p className="text-[16px] font-medium">Class Details:</p>:<></>}
        <ul>
        {record.classList.map((classInfo, index) => (
          <li className="w-full flex flex-row bg-gray-300 p-2" key={index}>
            <p className="w-[10%]">Class ID: {classInfo.classID}</p>
           <p className="w-[20%]"> Class Name: {classInfo?.classInfo?.ClassName}</p>
            <p className="w-[10%]">Grade : {classInfo?.classInfo?.gradeName}</p>
            <p className="w-[20%]">Subject Name: {classInfo?.classInfo?.subjectName}</p>
          </li>
        ))}
        </ul>
      </div>
    );
  };

  



  
  return (
    <>
    
      <Table 
      expandable={{
        expandedRowRender: expandedRowRender,
        rowExpandable: (record) => record.userID!=null,
      }}

      columns={columns} dataSource={annoucementData} pagination={{pageSize:5}} />
    </>
  );
};




export default NoticeTable