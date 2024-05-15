import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";



const ParentClassFeePaymentTable = ({classFeeData}) => {
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
      width: "10%",
      ...getColumnSearchProps("classID"),
      sorter: (a, b) => parseInt(a.classID.substring(2))- parseInt(b.classID.substring(2)),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Class Name",
      dataIndex: "ClassName",
      key: "ClassName",
      width: "15%",
      ...getColumnSearchProps("ClassName"),
      sorter: (a, b) => a.ClassName.length - b.ClassName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Grade Name",
      dataIndex: "gradeName",
      key: "gradeName",
      width: "10%",
      ...getColumnSearchProps("gradeName"),
      sorter: (a, b) => a.gradeName.length - b.gradeName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subjectName",
      ...getColumnSearchProps("subjectName"),
      sorter: (a, b) => a.subjectName.length - b.subjectName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
        title: "Payment Date",
        dataIndex: "paymentDate",
        key: "paymentDate",
        ...getColumnSearchProps("paymentDate"),
        sorter: (a, b) => a.paymentDate.length - b.paymentDate.length,
        sortDirections: ["descend", "ascend"],
    },
    {
        title: "Payment Time",
        dataIndex: "paymentTime",
        key: "paymentTime",
    },
    {
        title: "Payment Amount",
        dataIndex: "paymentamount",
        key: "paymentamount",
        ...getColumnSearchProps("paymentamount"),
        sorter: (a, b) => parseInt(a.paymentamount)- parseInt(b.paymentamount),
        sortDirections: ["descend", "ascend"],
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (pic,resultData) => {
       return (
            <Tag   className="mr-2 bg-green-500 hover:bg-green-600 text-white w-full text-center scalar-card " >
              Paid
            </Tag>
        )
      },
    },
    // ...getColumnSearchProps('action'),
  ];
  return (
    <>
      <Table columns={columns} pagination={{pageSize:5}} dataSource={classFeeData} />
     
    </>
  );
};





export default ParentClassFeePaymentTable