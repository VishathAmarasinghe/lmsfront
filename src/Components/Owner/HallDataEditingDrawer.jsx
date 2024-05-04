import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { createNewHall, updateHallDetails } from "../../API";
import { hallNameValidation, salaryValidation } from "../../Utils/Validations";

const HallDataEditingDrawer = ({
  hallDrawerOpen,
  setHallDrawerOpen,
  selectedHall,
  fetchHallInfomation,
}) => {
  const [hallData, setHallData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [overallValidateError,setOverallValidateError]=useState({});

  useEffect(() => {
    if (selectedHall != null) {
      setHallData({ ...selectedHall });
    }

    if (hallDrawerOpen?.task == "New") {
      setEditing(true);
    }
  }, [selectedHall]);


  
  useEffect(() => {
    if (hallDrawerOpen?.task == "New") {
      setEditing(true);
    }
  }, [hallDrawerOpen]);



  const handleSwitchChange = (checked) => {
    setEditing(checked);
  };



  const handleValidations=(e)=>{
    if (e.target.name=="hallName") {
      setOverallValidateError({...overallValidateError,hallName:hallNameValidation(e.target.value)})
    }else if(e.target.name=="seatCount"){
      setOverallValidateError({...overallValidateError,seatCount:salaryValidation(e.target.value)})
    }
  }



  const checkValidationStatusToSubmit=()=>{
    let errorStatus=true;
    for (const key in overallValidateError) {
      if (overallValidateError[key] !== "") {
        return false;
      }
    }
    const requiredcolumns=["hallName","seatCount","ACtype"]
    for(const value of requiredcolumns){
      if (userDetails[value]=="" || userDetails[value]==null || userDetails[value]==undefined) {
        message.error("please fill mandatory columns")
        errorStatus=false;
      }
    }
    return errorStatus;
  }




  const handleUpdateProfile = async () => {
    console.log("added ", hallData);
    try {
      if (checkValidationStatusToSubmit()) {
        if (hallDrawerOpen?.task == "New") {
          console.log("creation came here");
          const creationResult = await createNewHall(hallData);
          if (creationResult.status==200) {
            message.success("New Hall created successfully!")
          }
          console.log("Hall Creation Result ", creationResult);
        } else if (hallDrawerOpen?.task == "Update") {
          const updationResult = await updateHallDetails(hallData);
          if (updationResult.status==200) {
            message.success("Hall updated successfully!")
          }
          console.log("updation result ", updationResult);
        }
      }else{
        message.error("check user inputs and try again!")
      }
      fetchHallInfomation();
      setHallDrawerOpen({ ...hallDrawerOpen, openState: false, task: "new" });


    } catch (error) {
      message.error("Hall data updating error!")
      console.log("error ",error);
    }
    
  };

  const handleChangeInputs = (e) => {
    setHallData({ ...hallData, [e.target.name]: e.target.value });
    handleValidations(e)
  };

  const handleSelectChange = (value) => {
    setHallData({ ...hallData, ACtype: value });
  };

  const handleSeatNumber = (value) => {
    setHallData({ ...hallData, seatCount: value });
    
    

  };

  const showDrawer = () => {
    setHallDrawerOpen({ ...hallDrawerOpen, openState: true, task: "new" });
  };
  const onClose = () => {
    setHallDrawerOpen({ ...hallDrawerOpen, openState: false, task: "new" });
    setHallData(null);
  };
  return (
    <Drawer
      title="Hall Info"
      onClose={onClose}
      open={hallDrawerOpen.openState}
      extra={
        <Space>
          <div>
            <ConfigProvider
              theme={{
                components: {
                  Switch: {
                    base: {
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      "&:not(:hover)": {
                        color: "initial",
                        backgroundColor: "#C5C5C5",
                      },
                    },
                  },
                },
              }}
            >
              {hallDrawerOpen.task == "Update" ? (
                <Switch
                  checked={editing}
                  className={editing ? "bg-green-500" : "bg-slate-400"}
                  size="30px"
                  onChange={handleSwitchChange}
                  checkedChildren="Editing"
                  unCheckedChildren="Edit"
                />
              ) : (
                <></>
              )}
            </ConfigProvider>
          </div>
          {editing || hallDrawerOpen.task == "New" ? (
            <button
              data-aos="fade-left"
              data-aos-duration="1000"
              onClick={handleUpdateProfile}
              className="bg-blue-700 px-3  py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
            >
              {hallDrawerOpen.task == "Update" ? "Update" : "Submit New"} Hall
            </button>
          ) : (
            <></>
          )}
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Hall Name"
              validateStatus={
                overallValidateError?.hallName? "error" : "success"
              }
              help={overallValidateError?.hallName || ""}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                readOnly={!editing}
                name="hallName"
                onChange={handleChangeInputs}
                value={hallData?.hallName}
                placeholder="Please enter your hall name"
              />
            </Form.Item>
            <Form.Item
              label="Seat Count"
              validateStatus={
                overallValidateError?.seatCount? "error" : "success"
              }
              help={overallValidateError?.seatCount || ""}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                readOnly={!editing}
                className="w-full"
                onChange={handleChangeInputs}
                name="seatCount"
                value={hallData?.seatCount}
                placeholder="Please enter seat Count"
              />
            </Form.Item>
            <Form.Item
              label="AC Type"
              rules={[
                {
                  required: true,
                  message: "Please enter AC type",
                },
              ]}
            >
              <Select
                disabled={!editing}
                name="ACtype"
                onChange={handleSelectChange}
                value={hallData?.ACtype}
                options={[
                  { label: "AC", value: "AC" },
                  { label: "NonAC", value: "NonAC" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Additional Note"
              rules={[
                {
                  required: true,
                  message: "Please enter Additional Note",
                },
              ]}
            >
              <TextArea
                readOnly={!editing}
                onChange={handleChangeInputs}
                name="additionalNote"
                value={hallData?.additionalNote}
                placeholder="Please enter Additional Note"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default HallDataEditingDrawer;
