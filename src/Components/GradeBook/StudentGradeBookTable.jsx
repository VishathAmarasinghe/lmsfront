import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import GradeDeleteButtonPopUp from "./GradeDeleteBtnPopUp";
import GradeDetailedEditingDrawer from "./GradeDetailedEditingDrawer";
import StudentGradeShowingModel from "./StudentGradeShowingModel";


const StudentGradeBookTable = ({studentResult}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [openGradeShower, setOpenGradeShower]=useState(false);
  const [selectedMarks,setSelectedMarks]=useState(null);



  const handleOpenModel=(result)=>{
    setSelectedMarks(result);
    setOpenGradeShower(true);
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
            type="primary"
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
      sorter: (a, b) => a.resultID.length - b.resultID.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Result Title",
      dataIndex: "resultTitle",
      key: "resultTitle",
      width: "20%",
      ...getColumnSearchProps("resultTitle"),
      sorter: (a, b) => a.resultTitle.length - b.resultTitle.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      key: "publishDate",
      width: "15%",
      ...getColumnSearchProps("publishDate"),
    },
    {
      title: "Mark",
      dataIndex: "mark",
      key: "mark",
      width: "10%",
      ...getColumnSearchProps("mark"),
    },
    {
      title: "FeedBack",
      dataIndex: "markfeedback",
      key: "markfeedback",
      ...getColumnSearchProps("markfeedback"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (pic,resultData) => {
       return (
            <Tag  onClick={()=>handleOpenModel(resultData)}  className="mr-2 bg-green-500 hover:bg-green-600 text-white w-full text-center scalar-card " >
              View
            </Tag>
        )
      },
    },
    // ...getColumnSearchProps('action'),
  ];
  return (
    <>
      <Table columns={columns} dataSource={studentResult} />
      <StudentGradeShowingModel selectedMarks={selectedMarks} openGradeShower={openGradeShower} setOpenGradeShower={setOpenGradeShower} />
    </>
  );
};


export default StudentGradeBookTable