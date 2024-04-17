import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";



const ParentMarksTable = ({ studentResult,selectedClassResult,setSelectedClassResult,openingResultPanel,setOpeningResultPanel }) => {
  const [selectedTeacher,setSelectedTeacher]=useState(null);
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
      title: "Result ID",
      dataIndex: "resultID",
      key: "resultID",
      width: "15%",
      ...getColumnSearchProps("resultID"),
      sorter: (a, b) => parseInt(a.resultID.substring(2))- parseInt(b.resultID.substring(2)),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Publish Data",
      dataIndex: "publishDate",
      key: "publishDate",
      width: "15%",
      ...getColumnSearchProps("publishDate"),
      sorter: (a, b) => a.publishDate.length - b.publishDate.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "class ID",
      dataIndex: "classID",
      key: "classID",
      width: "10%",
      ...getColumnSearchProps("classID"),
    },
    {
        title: "class Name",
        dataIndex: "className",
        key: "className",
        width: "15%",
        ...getColumnSearchProps("className"),
    },
    {
        title: "Subject",
        dataIndex: "subject",
        key: "subject",
        width: "10%",
        ...getColumnSearchProps("subject"),
    },
    {
        title: "Grade",
        dataIndex: "grade",
        key: "grade",
        width: "10%",
        ...getColumnSearchProps("grade"),
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
            
            <Tag
            // onClick={()=>handleOpenModel(rowData)}
              className="scalar-card flex flex-row justify-center w-full text-center  bg-green-600 text-white font-medium hover:bg-green-700 "
            >
              <p className="ml-2">View Info</p>
            </Tag>
        );
      },
    },
  ];
  return (
    <>
      <Table pagination={{pageSize:2}} columns={columns} dataSource={studentResult} />
    </>
  );
};


export default ParentMarksTable