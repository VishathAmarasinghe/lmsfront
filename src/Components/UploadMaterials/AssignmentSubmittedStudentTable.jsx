import React, { useRef, useState } from "react";
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
import { getnotes } from "../../API";
import fileDownload from "js-file-download";

const AssignmentSubmittedStudentTable = ({ allStudentSubmissions }) => {
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


  const handleDownloadSubmissionSingleStudent=async(submissionInfo)=>{
    try {
      const download = await getnotes(submissionInfo?.submisionDoc);
      if (download.status == 200) {
        fileDownload(download.data,submissionInfo?.submisionDoc);
      }
    } catch (error) {
      message.error("single student submission downloading error!")
      console.log("single student submission downloading error!");
    }
  }

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
              fname &&
              fname.split(")")[0] &&
              fname.split(")")[0] !== "" &&
              fname.split(")")[0] != null &&
              fname.split(")")[0] != "null" ? (
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
      title: "UserID",
      dataIndex: "UserID",
      key: "UserID",
      width: "5%",
      ...getColumnSearchProps("UserID"),
      sorter: (a, b) => a.UserID.length - b.UserID.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "10%",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.lname.length - b.lname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "10%",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.lname.length - b.lname.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneno",
      ...getColumnSearchProps("phoneno"),
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      key: "submissionDate",
      ...getColumnSearchProps("submissionDate"),
    },
    {
      title: "Submission Time",
      dataIndex: "submissionTime",
      key: "submissionTime",
      ...getColumnSearchProps("submissionTime"),
    },
    {
      title: "Action",
      dataIndex: "userStatus",

      key: "userStatus",
      render: (pic, rowData) => {
        return (
          <div className="w-full flex flex-row">
            <Tag onClick={()=>handleDownloadSubmissionSingleStudent(rowData)} className="scalar-card flex flex-row w-full text-center  bg-green-600 text-white font-medium hover:bg-green-700 ">
              Download


            </Tag>
          </div>
        );
      },
    },

  ];
  return (
    <>
      <Table pagination={{pageSize:3}}  columns={columns} dataSource={allStudentSubmissions} />
    </>
  );
};

export default AssignmentSubmittedStudentTable;
