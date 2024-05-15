import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";



const ParentAttendanceTable = ({attendanceData}) => {
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
      title: "Class ID",
      dataIndex: "classID",
      key: "classID",
      width: "15%",
    },
    {
      title: "Class Name",
      dataIndex: "ClassName",
      key: "ClassName",
      width: "20%",
    },
    {
      title: "ClassDay (Standard)",
      dataIndex: "ClassDay",
      key: "ClassDay",
      width: "15%",
    },
    {
      title: "Class Mode",
      dataIndex: "ClassMode",
      key: "ClassMode",
      width: "10%",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (pic,resultData) => {
       return pic=="present"? (
            <Tag   className="mr-2 bg-green-500 hover:bg-green-600 text-white w-full text-center scalar-card " >
              Present
            </Tag>
        ):(
            <Tag   className="mr-2 bg-red-500 hover:bg-red-600 text-white w-full text-center scalar-card " >
            absence
          </Tag>
        )
      },
    },
    // ...getColumnSearchProps('action'),
  ];
  return (
    <>
      <Table columns={columns} pagination={{pageSize:3}} dataSource={attendanceData} />
     
    </>
  );
};



export default ParentAttendanceTable