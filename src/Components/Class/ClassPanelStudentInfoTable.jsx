import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Popconfirm, Space, Table, Tag, message, notification } from "antd";
import Highlighter from "react-highlight-words";
import { deleteClassesFromStudent } from "../../API";




const ClassPanelStudentInfoTable = ({ students, setStudents,classID,fetchStudentAndTeacherDetails }) => {
  
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [loading,setLoading]=useState(false);







  const handleDeleteStudentFromClass = async (student) => {
    try {
      setLoading(true);
      const studentRemovingDetails = {
        classList: [classID],
        studentID: student?.UserID,
      };
      const deleteResult = await deleteClassesFromStudent(
        studentRemovingDetails
      );
      if (deleteResult.status == 200) {
        fetchStudentAndTeacherDetails();
        message.success("Student Removed From class Successfully!");
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
      sorter: (a, b) => parseInt(a?.UserID?.substring(2))- parseInt(b?.UserID?.substring(2)),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "first Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "15%",
      ...getColumnSearchProps("firstName"),
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        width: "15%",
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
      dataIndex: "userStatus",
      key: "userStatus",
      render: (pic, rowData) => {
        return (
            <Popconfirm
              title="Reactivate User"
              description="Are you sure to reactivate this user?"
              onConfirm={()=>handleDeleteStudentFromClass(rowData)}
              okType="default"
              okButtonProps={{
                className: "bg-blue-500 hover:bg-blue-600 text-white",
              }}
              placement="left"
              okText="Yes"
              cancelText="No"
            >
              <Tag
                className="scalar-card flex flex-row w-full justify-around bg-red-600 hover:bg-red-700  text-white font-medium"
                
              >
                <p>Remove Student</p>
              </Tag>
            </Popconfirm>
         
        );
      },
    },
  ];
  return (
    <div className="overflow-x-auto">
      <Table pagination={{pageSize:7}}  columns={columns} dataSource={students} />
      
    </div>
  );
};




export default ClassPanelStudentInfoTable