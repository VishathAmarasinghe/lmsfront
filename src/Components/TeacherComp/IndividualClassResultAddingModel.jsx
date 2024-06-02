import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Form,
} from "antd";
import Highlighter from "react-highlight-words";

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = Form.useFormInstance();

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const IndividualClassResultAddingModel = ({ studentResultList, setStudentResultList }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [form] = Form.useForm();

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

  const handleSave = (row) => {
    const newData = [...studentResultList];
    const index = newData.findIndex((item) => row.key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setStudentResultList(newData);
    } else {
      newData.push(row);
      setStudentResultList(newData);
    }
  };

  const columns = [
    {
      title: "UserID",
      dataIndex: "UserID",
      key: "UserID",
      width: "10%",
      ...getColumnSearchProps("UserID"),
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
      title: "Mark/Result",
      dataIndex: "mark",
      key: "mark",
      width: "15%",
      editable: true,
      ...getColumnSearchProps("mark"),
    },
    {
      title: "Feedback",
      dataIndex: "markFeedback",
      key: "markFeedback",
      width: "25%",
      editable: true,
      ...getColumnSearchProps("markFeedback"),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <>
    <div className="w-full  p-2 rounded-md bg-red-100 my-1 font-medium text-[12px]">
        <p>You can double click on the mark/result tab and feedback tab to edit curresponding marks</p>
        <p>Please make sure to save result before closing the result adding panel</p>
        <p>sd</p>
    </div>
      <Form form={form} component={false}>
        <Table
          pagination={{ pageSize: 6 }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={studentResultList}
          columns={mergedColumns}
          rowClassName="editable-row"
        />
      </Form>
      
    </>
  );
};

export default IndividualClassResultAddingModel;
