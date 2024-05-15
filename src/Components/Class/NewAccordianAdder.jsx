import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import KanbanBoard from "./KanbanBoard";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

import {
  createNewAccordian,
  getAllAccordianByClassID,
} from "../../Actions/class";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateAccordian } from "../../API";
import { stringEmptyValidation } from "../../Utils/Validations";

const { Option } = Select;
const { Panel } = Collapse;

const NewAccordianAdder = ({
  openeditingDrawer,
  setOpeneditingDrawer,
  subAccID,
  setSubAccID,
  accDetails,
}) => {
  const { selectedClass } = useSelector((state) => state.classes);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { classID } = useParams();
  const [overallErrorValidator,setOverallErrorValidator]=useState(null);
  const [accordianData, setAccordianData] = useState({
    accName: "",
    accDescription: "",
    classID: classID,
    accType: "accordian",
    subAccID: subAccID,
  });

  useEffect(() => {
    
    if (accDetails != null && openeditingDrawer==true) {
      console.log("accordian Details of updation inside is ", accDetails);
      setAccordianData({ ...accDetails });
    }
  }, [openeditingDrawer]);

  useEffect(() => {
    setAccordianData({ ...accordianData, classID: classID });
  }, [classID]);

  useEffect(() => {
    setAccordianData({ ...accordianData, subAccID: subAccID });
  }, [subAccID]);

  const showDrawer = () => {
    setOpeneditingDrawer(true);
  };

  const onClose = () => {
    setOpeneditingDrawer(false);
    setAccordianData({
      accName: "",
      accDescription: "",
      classID: "",
      accType: "accordian",
      subAccID: subAccID,
    });
    dispatch(getAllAccordianByClassID(classID));
  };

  const handleFormValuesChange = (e) => {
    console.log("changin accordian values ", e.target.value);
    setAccordianData({ ...accordianData, [e.target.name]: e.target.value });
    handleValidations(e);
  };


  const handleValidations=(e)=>{
    if (e.target.name=="accName") {
      
      setOverallErrorValidator({...overallErrorValidator,accName:stringEmptyValidation(e.target.value)});
    }else if(e.target.name=="accDescription"){
      setOverallErrorValidator({...overallErrorValidator,accDescription:stringEmptyValidation(e.target.value)})
    }
  }



  const checkValidationStatusToSubmit = () => {
    let errorStatus = true;
    console.log("overall validate error ",overallErrorValidator);
    for (const key in overallErrorValidator) {
      if (overallErrorValidator[key] !== "") {
        return false;
      }
    }
    const requiredcolumns = [
      "accName",
      "accDescription",

    ];
    for (const value of requiredcolumns) {
      if (
        accordianData[value] == "" ||
        accordianData[value] == null ||
        accordianData[value] == undefined
      ) {
        if (accordianData?.additionalInfo[value] == "" ||
        accordianData?.additionalInfo[value] == null ||
        accordianData?.additionalInfo[value] == undefined) {
          message.error(`please fill mandatory columns (${value}) `);
          errorStatus = false;
        }
      }
    }
    return errorStatus;
  };


  
  
  useEffect(()=>{
    console.log("acc data aaaaaaaaaaa ",overallErrorValidator);
  },[accordianData])

  const handleSubmitAccordian = async () => {
    if (checkValidationStatusToSubmit()) {
      if (accDetails != null) {
        updateAccordianInfo();
      } else {
        handleaddNewAccordiant();
      }
    }else{
      message.error("please fill required inputs")
    }
   
  };

  const handleaddNewAccordiant = async () => {
    console.log("all acc details", accordianData);
    try {
      const result = await createNewAccordian(accordianData);
      if (result.status == 200) {
        message.success("Accordian Created Successfully");
      } else {
        message.error("Error in creating accordian");
      }
      onClose();
    } catch (error) {
      message.error("Accodian creation Error!");
      console.log("error ", error);
    }
  };

  const updateAccordianInfo = async () => {
    try {
      const updateResult = await updateAccordian(accordianData);
      if (updateResult?.status == 200) {
        message.success("accordian updated Successfully");
      }
      onClose();
    } catch (error) {
      message.error("Accodian Updation Error!");
      console.log("error ", error);
    }
  };

  return (
    <>
      <Drawer
        // getContainer={false}
        title={`${accDetails ? "Update" : "New"} Accordian`}
        width={350}
        onClose={onClose}
        open={openeditingDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <button
              onClick={handleSubmitAccordian}
              className="bg-blue-700 px-2 py-1 ml-2 hover:bg-blue-800 text-white font-medium rounded-lg"
            >
              {accDetails ? "Update" : "Add New"}
            </button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Accordian Name"
                validateStatus={overallErrorValidator?.accName? "error" : "success"}
                help={overallErrorValidator?.accName || ""}
                rules={[
                  {
                    required: true,
                    message: "Please enter Name to create accordian",
                  },
                ]}
              >
                <Input
                  name="accName"
                  value={accordianData?.accName}
                 
                  onChange={(e) => handleFormValuesChange(e, "accName")}
                  placeholder="Please enter suitable name"
                />
              </Form.Item>
              <Form.Item
                label="Accordian Description"
                validateStatus={overallErrorValidator?.accDescription? "error" : "success"}
                  help={overallErrorValidator?.accDescription || ""}
                rules={[
                  {
                    required: true,
                    message: "Please enter Description",
                  },
                ]}
              >
                <TextArea
                  name="accDescription"
                  value={accordianData?.accDescription}
                  
                  onChange={(e) => handleFormValuesChange(e, "accDescription")}
                  rows={5}
                  placeholder="description (Not Mandatory)"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div>
          <p>Sample</p>
          <Collapse
            items={[
              {
                key: "1",
                label: accordianData?.accName,
                children: (
                  <div className="flex flex-col">
                    <p>{accordianData?.accDescription}</p>
                    <p className="text-slate-300">
                      notes,quizzes,uploading go here
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Drawer>
    </>
  );
};

export default NewAccordianAdder;
