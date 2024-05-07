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
import { activateDeactivateUser } from "../../API";


const OwnerTable = ({
  ownerData,
  fetchOwnerInfo
}) => {


  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const ownerID = JSON.parse(localStorage.getItem("profile"))?.result?.UserID;



  const userActivationAndDeactivation = async (user, activateStatus) => {
    try {
      console.log("user cativatiosfas ", user, "ac  ", activateStatus);
      const userData = {
        UserID: user?.UserID,
        activateStatus: activateStatus,
      };
      const updationResult = await activateDeactivateUser(userData);
      if (updationResult.status == 200) {
        notification.success({
          description:
            activateStatus == "activated"
              ? "User Credentials send to the user"
              : "Access Restricted to the system.",
          message: `User ${activateStatus}`,
        });
        fetchOwnerInfo();
      }
      
    } catch (error) {
      console.log("error ", error);
      message.error("User updation Failed");
    }
  };

  const deactivationConfirm = (rowData, activatedStatus) => {
    // message.success("Click on Yes");
    console.log("clicked");
    userActivationAndDeactivation(rowData, activatedStatus);
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
      title: "User ID",
      dataIndex: "UserID",
      key: "UserID",
      width: "12%",
      ...getColumnSearchProps("UserID"),
      sorter: (a, b) => a.UserID.length - b.UserID.length,
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
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "12%",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
      width: "12%",
      ...getColumnSearchProps("phoneNo"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "15%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "NIC",
      dataIndex: "NIC",
      key: "NIC",
      width: "10%",
      ...getColumnSearchProps("NIC"),
    },
    {
      title: "Action",
      dataIndex: "userStatus",
      key: "userStatus",
      render: (pic, rowData) => {
        return pic == "activated" ? (
          <div className="w-full flex flex-row">
            {rowData.UserID != ownerID ? (
              <Popconfirm
              placement="leftTop"
                title="Deactivate Owner"
                description="Are you sure to Deactivate this Owner?"
                onConfirm={() => deactivationConfirm(rowData, "deactivated")}
                onCancel={popConfirmcancel}
                okType="default"
                okButtonProps={{
                  className: "bg-blue-500 hover:bg-blue-600 text-white",
                }}
                okText="Yes"
                cancelText="No"
              >
                <Tag
                  color="green"
                  className=" flex flex-col w-full text-center   font-medium bg-red-600 text-white hover:bg-red-700 scalar-card"
                >
                  <p className="ml-2">Deactivate</p>
                </Tag>
              </Popconfirm>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <Popconfirm
            title="Activate Owner"
            description="Are you sure to activate this owner?"
            onConfirm={() => deactivationConfirm(rowData, "activated")}
            onCancel={popConfirmcancel}
            okType="default"
            okButtonProps={{
              className: "bg-blue-500 hover:bg-blue-600 text-white",
            }}
            okText="Yes"
            placement="leftTop"
            cancelText="No"
          >
            <Tag
              color="green"
              className=" flex flex-col w-full text-center   font-medium bg-purple-600 text-white hover:bg-purple-700 scalar-card"
            >
              <p className="ml-2">Activate</p>
            </Tag>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={ownerData}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default OwnerTable;
