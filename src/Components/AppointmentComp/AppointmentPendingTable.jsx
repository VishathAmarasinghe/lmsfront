import React, { useEffect, useRef, useState } from "react";
import { DeleteFilled, SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Tag,Alert, message, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";


import { useDispatch } from "react-redux";
import TeacherAppointmentUpdateModel from "./TeacherAppointmentUpdateModel";
import { deleteAppoinment } from "../../API";
import { setPendingAppointments } from "../../Actions/appointments";
import dayjs from "dayjs";




const AppointmentPendingTable = ({appointment}) => {
 
  const [openeditingDrawer, setOpeneditingDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedAppointment,setSelectedAppointment]=useState(null);
  const searchInput = useRef(null);
  const dispatch=useDispatch();





  const formattedData = appointment.map((appointment, index) => ({
    ...appointment,
    key: appointment.appointmentID, 
  }));

  const handleConfirmInfo=(rowdata)=>{
    console.log("selected Row data ",rowdata);
    setSelectedAppointment(rowdata);
    setOpeneditingDrawer(true);
    
  }


  const deleteOverDueAppoinemnt=async(rowData)=>{
    try {
      const deleteResult=await deleteAppoinment(rowData?.appointmentID);
      if (deleteResult.status==200) {
        message.success("Appintment deleted Successfully!")
        dispatch(setPendingAppointments(JSON.parse(localStorage.getItem("profile"))?.result?.UserID));
      }
    } catch (error) {
      console.log("error ",error);
      message.error("Overdue Appointment Deleting Error!")
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
      title: "AppointmentID",
      dataIndex: "appointmentID",
      key: "appointmentID",
      width: "10%",
      ...getColumnSearchProps("AppointmentID"),
      sorter: (a, b) => {
        const numA = parseInt(a.appointmentID.replace(/^\D+/g, ''), 10);
        const numB = parseInt(b.appointmentID.replace(/^\D+/g, ''), 10);
        return numA - numB;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Publish Date",
      dataIndex: "publishdate",
      key: "publishdate",
      width: "10%",
      ...getColumnSearchProps("publishdate"),
      sorter: (a, b) => {
        const dateA = dayjs(a.publishdate);
        const dateB = dayjs(b.publishdate);
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Parent Name",
      dataIndex: "parentName",
      key: "parentName",
      width: "15%",
      ...getColumnSearchProps("parentName"),
      sorter: (a, b) => {
        if (a.parentName !== null && b.parentName !== null) {
          return a.parentName.length - b.parentName.length;
        } else {
          if (a.parentName === null && b.parentName === null) return 0;
          if (a.parentName === null) return 1;
          return -1;
        }
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Parent Phone No",
      dataIndex: "parentPhoneNo",
      key: "parentPhoneNo",
      width: "15%",
      ...getColumnSearchProps("parentPhoneNo"),
    },
   
    {
      title: "StudentName",
      dataIndex: "studentName",
      key: "studentName",
      width: "20%",
      ...getColumnSearchProps("studentName"),
    },
    {
      title: "Status",
      dataIndex: "currentStatus",
      key: "currentStatus",
      width: "15%",
      ...getColumnSearchProps("currentStatus"),
      render:(datas,rowData)=>{
        return datas=="Pending"?(
         <Tag className={`w-[100%] font-medium text-center bg-yellow-600 hover:bg-yellow-700 text-white`}>
           Pending
         </Tag>
        ):datas=="Overdue"?
        (
          <div className="w-full flex flex-row">
          <Tag  className={`w-[100%] font-medium text-center bg-red-600 hover:bg-red-700 text-white`}>
          Overdue
        </Tag>
        <Popconfirm
            title="Delete Overdue Appointment"
            description="Are you sure to delete the overdue appointment?"
            onConfirm={()=>deleteOverDueAppoinemnt(rowData)}
            okType="default"
            okButtonProps={{
              className: "bg-blue-500 hover:bg-blue-600 text-white",
            }}
            placement="left"
            okText="Yes"
            cancelText="No"
          >
        <Tag color="red">
          <DeleteFilled />
        </Tag>
        </Popconfirm>
        </div>
        ):datas=="Upcomming"?
        (
          <Tag color="green" className={`w-[100%] font-medium text-center bg-blue-600 hover:bg-blue-700 text-white`}>
          Upcomming
        </Tag>
        ):<></>

       }
    },
    {
      title:"Confirmation",
      dataIndex:"userStatus",
      key:"datadonfirmation",
      render:(datas,rowData)=>{
       return (
        <Tag onClick={()=>handleConfirmInfo(rowData)} color="green" className={`w-[100%] font-medium text-center ${datas=="Created"?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700"} text-white`}>
          {datas=="Created"?"Accept Now":"View"}
        </Tag>
       )
      }
    },
   
  ];
  return (
    <div className="w-full p-2 mt-2">
        <TeacherAppointmentUpdateModel selectedAppointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment} openeditingDrawer={openeditingDrawer} setOpeneditingDrawer={setOpeneditingDrawer}/>
      <Table columns={columns} dataSource={formattedData} pagination={{pageSize:7}}  />

    </div>
  );
};

export default AppointmentPendingTable;



















