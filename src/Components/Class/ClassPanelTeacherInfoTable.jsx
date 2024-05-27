import React, { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
  message,
  notification,
} from "antd";
import Highlighter from "react-highlight-words";
import { addNewTeachertoTheClass, deleteClassesFromTeacher, getAllTeachers } from "../../API";
import AppointmentTeacherCard from "../AppointmentComp/AppointmentTeacherCard";

const ClassPanelTeacherInfoTable = ({
  teachers,
  setTeachers,
  classID,
  fetchStudentAndTeacherDetails
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [teacherArray, setTeacherArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickedTeacher, setClickedTeacher] = useState([]);
  const [viewTeacherPanal,setViewTeacherPanel]=useState(false);

  useEffect(() => {
    fetchTeachers();
  }, [teachers]);

  const handleViewTeacherListPanel=()=>{
    setViewTeacherPanel(true);
    setClickedTeacher(null);
  }




  const handleAddingTeachertoClass=async()=>{
    console.log("selected user ",clickedTeacher,"    ",classID);
    try {
      const classData={
        classID:classID,
        teacherID:clickedTeacher?.UserID
      }
      const teacherAddingResult=await addNewTeachertoTheClass(classData);
      if (teacherAddingResult.status==200) {
        message.success("Teacher added to class Successfully")
        fetchTeachers();
        fetchStudentAndTeacherDetails();
        setClickedTeacher(null);
        setViewTeacherPanel(false);
      }
    } catch (error) {
      console.log("error ",error);
      message.error("Teacher adding error!")
    }
  }




  const fetchTeachers = async () => {
    try {
      const teacherResult = await getAllTeachers();
      console.log("current teachers ",teachers);
      console.log("fetching teachers ",teacherResult);

      const filteredUserIDs = new Set(teachers.map(user => user.UserID));

      const usersNotInFiltered = teacherResult.data?.filter(user => !filteredUserIDs.has(user.UserID));

      setTeacherArray(usersNotInFiltered);
    } catch (error) {
      console.log("error ", error);
      message.error("Teacher details  fetching error!");
    }
  };


  const handleCancelTeachersAdding=()=>{
    setViewTeacherPanel(false);
  }

  const handleDeleteTeacherFromClass = async (teacher) => {
    try {
      setLoading(true);
      const TeacherRemovingDetails = {
        classList: [classID],
        studentID: teacher?.UserID,
      };
      const deleteResult = await deleteClassesFromTeacher(
        TeacherRemovingDetails
      );
      if (deleteResult.status == 200) {
        fetchStudentAndTeacherDetails();
        message.success("Teacher Removed From class Successfully!");
        setLoading(false);
      }
    } catch (error) {
      console.log("error ", error);
      message.error("Error occured from ");
      setLoading(false);
    }
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
              fname && fname.split(")")[0] && fname.split(")")[0] !== "" ? (
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
      title: "User ID",
      dataIndex: "UserID",
      key: "UserID",
      width: "12%",
      ...getColumnSearchProps("UserID"),
      sorter: (a, b) =>
        parseInt(a?.UserID?.substring(2)) - parseInt(b?.UserID?.substring(2)),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "15%",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "15%",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.lastName.length - b.lastName.length,
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
      title: "User Status",
      dataIndex: "userStatus",
      key: "userStatus",
      width: "15%",
      ...getColumnSearchProps("userStatus"),
    },
    {
      title: "Action",
      dataIndex: "userStatus",
      key: "userStatus",
      render: (pic, rowData) => {
        return (
          <Popconfirm
            title="Reactivate User"
            description="Are you sure to reactivate this user?"
            onConfirm={() => handleDeleteTeacherFromClass(rowData)}
            okType="default"
            okButtonProps={{
              className: "bg-blue-500 hover:bg-blue-600 text-white",
            }}
            placement="left"
            okText="Yes"
            cancelText="No"
          >
            <Tag className="scalar-card flex flex-row w-full justify-around bg-red-600 hover:bg-red-700  text-white font-medium">
              <p>Remove Teacher</p>
            </Tag>
          </Popconfirm>
        );
      },
    },
    // ...getColumnSearchProps('action'),
  ];
  return (
    <div className="w-full border-green-500 border-2 flex flex-col">
      <div className="w-full flex flex-col items-end ">
        {
          !viewTeacherPanal?
          <Button onClick={handleViewTeacherListPanel} className="bg-blue-500 text-white hover:bg-blue-600">
            Add Teacher
          </Button>:<></>
        }
       
      </div>
      {
        viewTeacherPanal?
        <>
        <div className=" w-full max-h-[53%] lg:max-h-[43%] overflow-y-auto mb-2 ">
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-4">
            {teacherArray.map((teacher, index) => (
              <AppointmentTeacherCard
                key={index}
                clickedTeacher={clickedTeacher}
                setClickedTeacher={setClickedTeacher}
                teacher={teacher}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-row justify-end ">
        <Button onClick={handleCancelTeachersAdding} type="default" >
            Cancel
          </Button>
          {
            clickedTeacher!=null?<Button onClick={handleAddingTeachertoClass} className="bg-blue-500 text-white hover:bg-blue-600 ml-2">
            Add Selected Teachers
          </Button>:<></>
          }
          
        </div>
        </>:<></>
      }
     
      <div className="overflow-x-auto">
        <Table
          pagination={{ pageSize: 2 }}
          columns={columns}
          dataSource={teachers}
        />
      </div>
    </div>
  );
};

export default ClassPanelTeacherInfoTable;
