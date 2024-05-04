import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Popconfirm, Space, Table, Tag, message } from "antd";
import Highlighter from "react-highlight-words";
import lecturerAvatar from "../../assets/lecturer.jpg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { activateDeactivateHall } from "../../API";
import DeactivateHallConfirmClassmodel from "./DeactivateHallConfirmClassmodel";





const HallTable = ({fetchHallInfomation, hallData,hallDrawerOpen,setHallDrawerOpen,selectedHall,setSelectedHall }) => {
  const [opendeleteModel, setOpendeleteModel] = useState(false);
  
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [deactivateClassModelOpen,setDeactivateClassModelOpen]=useState(false);
  const [classData,setClassData]=useState([]);

 

  const handleDrawerOpen=(rowData)=>{
    setHallDrawerOpen({
        openState:true,
        task:"Update"
    })
    console.log("selected row is halls ",rowData);
    setSelectedHall(rowData);
  }




  const userActivationAndDeactivation = async (hall, activateStatus) => {
    
    try {
      console.log("user cativatiosfas ", hall, "ac  ", activateStatus);
      const hallData = {
        hallID: hall?.hallID,
        activationStatus: activateStatus,
        confirmState:false
      };
      if (activateStatus=="deactivated") {
        setSelectedHall(hall);
      }
      const updationResult = await activateDeactivateHall(hallData);
      console.log("class updation result ",updationResult);
      if (updationResult.status == 200) {
        if (updationResult.data?.classArray?.length>0) {
          console.log("came here ",updationResult.data?.classArray?.length);
          setClassData(updationResult.data?.classArray)
          setDeactivateClassModelOpen(true);
          
        }else{
          fetchHallInfomation();
          message.success(`Hall ${activateStatus} successfully`)
        }

        
      }
      

    } catch (error) {
      console.log("error ", error);
      message.error("User updation Failed");
    }
  };

  const deactivationConfirm = (rowData,activatedStatus) => {
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
      title: "Hall ID",
      dataIndex: "hallID",
      key: "hallID",
      width: "15%",
      ...getColumnSearchProps("hallID"),
      sorter: (a, b) => a.hallID.length - b.hallID.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hall Name",
      dataIndex: "hallName",
      key: "hallName",
      width: "20%",
      ...getColumnSearchProps("hallName"),
      sorter: (a, b) => a.hallName.length - b.hallName.length,
      sortDirections: ["descend", "ascend"],
    },
    
    {
      title: "Seat Count",
      dataIndex: "seatCount",
      key: "seatCount",
      width: "15%",
      ...getColumnSearchProps("seatCount"),
      sorter: (a, b) => a.seatCount.length - b.seatCount.length,
      sortDirections: ["descend", "ascend"],
    },
    {
        title: "ACtype",
        dataIndex: "ACtype",
        key:"ACtype",
        width:"15%",
        ...getColumnSearchProps( "ACtype"),
      },
      {
        title: "Additional Note",
        dataIndex: "additionalNote",
        key: "additionalNote",
        width: "15%",
        ...getColumnSearchProps("additionalNote"),
      },
    {
      title: "Action",
      dataIndex: "hallStatus",
      key: "hallStatus",
      render: (pic,rowData) => {
        return (
          pic=="activated"?
          <div className="w-full flex flex-row">
            <Tag
           onClick={()=>handleDrawerOpen(rowData)}
            color="green"
              className=" flex flex-col w-[50%] text-center   font-medium bg-green-600 text-white hover:bg-green-700 scalar-card"
             
            >
              <p className="ml-2">View More Info</p>
            </Tag>
            <Popconfirm
              title="Deactivate Hall"
              description="Are you sure to Deactivate this hall?"
              onConfirm={() => deactivationConfirm(rowData,"deactivated")}
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
              className=" flex flex-col w-[50%] text-center   font-medium bg-red-600 text-white hover:bg-red-700 scalar-card"
            >
              <p className="ml-2">Deactivate Hall</p>
            </Tag>
            </Popconfirm>
          </div>:
          <Popconfirm
          title="Activate Hall"
          description="Are you sure to activate this hall?"
          onConfirm={() => deactivationConfirm(rowData,"activated")}
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
             className=" flex flex-col w-full text-center   font-medium bg-purple-600 text-white hover:bg-purple-700 scalar-card"
           >
             <p className="ml-2">Activate Hall</p>
           </Tag>
           </Popconfirm>

        ) 
      },
    },
  ];


  
  return (
    <>
    
      <Table columns={columns} dataSource={hallData} pagination={{pageSize:5}} />
      <DeactivateHallConfirmClassmodel selectedHall={selectedHall} setSelectedHall={setSelectedHall} fetchHallInfomation={fetchHallInfomation} classData={classData} deactivateClassModelOpen={deactivateClassModelOpen} setDeactivateClassModelOpen={setDeactivateClassModelOpen} />
    </>
  );
};



export default HallTable