import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Row,
  Segmented,
  Switch,
  Radio,
  message,
  notification,
} from "antd";
import ResultDescription from "./ResultDescription";
import BulkResultAddingPanel from "./BulkResultAddingPanel";
import { useParams } from "react-router-dom";
import {
  getBulkUserData,
  uploadResultWithExcel,
  uploadResultmanual,
} from "../../API";
import IndividualClassResultAddingModel from "./IndividualClassResultAddingModel";
import { useSelector } from "react-redux";

const ClassResultInfoModel = ({
  selectedClassResult,
  openingResultPanel,
  setOpeningResultPanel,
}) => {
  const [editing, setEditing] = useState(false);
  const { classID } = useParams();
  const [selectedAddingMethod, setSelectedAddingMethod] = useState("A");
  const [segmentedArray, setSegmentedArray] = useState([]);
  const [selectedSegmentedValue, setSelectedSegmentedValue] =
    useState("General Info");
  const [fileList, setFileList] = useState([]);
  const [loading, setloading] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [studentResultList, setStudentResultList] = useState([]);
  const [uploadData, setUploadData] = useState({
    classID: classID,
    resultTitle: "",
  });

  const classInside = useSelector((state) => state.classes.selectedClass);

  useEffect(() => {
    if (classInside != null) {
      const studentIDList = classInside?.students?.map((stu) => stu?.studentID);
      console.log("class inside ", classInside);
      console.log("class studnt id list ", studentIDList);
      setStudentList(studentIDList);
      getBulkStudentDetails(studentIDList);
    }
  }, [classInside]);

  const getBulkStudentDetails = async (studentIDList) => {
    try {
      const studentBulkResult = (await getBulkUserData(studentIDList)).data;
      console.log("stuent bulk result  ", studentBulkResult);
      const studentResultListArray = [];
      for (const studentID of studentIDList) {
        studentResultListArray.push({
          UserID: studentBulkResult[studentID]?.UserID,
          firstName: studentBulkResult[studentID]?.firstName,
          lastName: studentBulkResult[studentID]?.lastName,
          email: studentBulkResult[studentID]?.email,
          phoneNo: studentBulkResult[studentID]?.phoneNo,
          mark: 0,
          markFeedback: "Not Provided",
        });
      }
      console.log("student list results ", studentResultListArray);
      setStudentResultList(studentResultListArray);
    } catch (error) {
      console.log("error ", error);
      message.error("Student List getting error!");
    }
  };

  useEffect(() => {
    setUploadData({ ...uploadData, classID: classID });
    if (selectedAddingMethod == "A") {
      if (selectedClassResult!=null) {
        setSegmentedArray(["General Info"]);
      }else{
        setSegmentedArray(["General Info", "Bulk Uploading Panel"]);
      }
      
    } else if (selectedAddingMethod == "B") {
      setSegmentedArray(["General Info", "Single Result Uploading Panel"]);
    }
  }, [selectedAddingMethod,selectedClassResult]);

  useEffect(() => {
    console.log("upload data ", uploadData);
  }, [uploadData]);

  const handleValueChangeInTitleInput = (e) => {
    setUploadData({ ...uploadData, resultTitle: e.target.value });
  };

  const showModal = () => {
    setOpeningResultPanel(true);
  };

  const handleOk = async () => {
    setloading(true);

    if (selectedSegmentedValue == "Single Result Uploading Panel") {
      try {
        console.log("run this uploading method");
        const resultData = {
          uploadData,
          studentResultList,
        };
        const uploadResult = await uploadResultmanual(resultData);
        if (uploadResult.status == 200) {
          message.success("Results Uploaded Successfully");
        }
      } catch (error) {
        console.log("error is ", error);
        message.error("result uploading Error!");
      } finally {
        setloading(false);
        handleCancel();
      }
    } else if (selectedSegmentedValue == "Bulk Uploading Panel") {
      const formData = new FormData();
      // console.log("fie lis ",);
      formData.append("uploadData", JSON.stringify(uploadData));
      formData.append("file", fileList[0].originFileObj);

      try {
        const uploadResult = await uploadResultWithExcel(formData);
        console.log("upload Result! ", uploadResult);
        if (uploadResult.status == 200) {
          notification.success({
            message: "Results Uploaded Successfully!",
            description:
              "click edit, if you want to edit or check uploaded results",
          });
        } else {
          notification.error({
            message: "Results Uploading Error!",
            description: "Retry again later!",
          });
        }
      } catch (error) {
        console.log("error is ", error);
        message.error("result uploading Error!");
      } finally {
        setloading(false);
        handleCancel();
      }
    }
  };

  const handleCancel = () => {
    setOpeningResultPanel(false);
    setUploadData({
      ...uploadData,
      resultTitle: "",
    });
    setloading(false);
    setFileList([]);
    setSelectedSegmentedValue("General Info");
  };

  const handleSwitchChange = (checked) => {
    setEditing(checked);
  };

  const handleSegmentChanging = (value) => {
    console.log("segment Value is ", value);
    setSelectedSegmentedValue(value);
  };

  const resultAddingMethodSelectionChange = ({ target: { value } }) => {
    console.log("radio checked", value);
    setSelectedAddingMethod(value);
  };

  const methodSelectionOptions = [
    {
      label: "Bulk Result Adding",
      value: "A",
    },
    {
      label: "Add Result One by One",
      value: "B",
    },
  ];

  return (
    <Modal
      width={"80%"}
      title="Class Result Info"
      open={openingResultPanel}
      onOk={handleOk}
      centered
      maskClosable={false}
      // closable={false}
      onCancel={handleCancel}
      footer={[
        
          selectedClassResult==null?<>
           <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="ok"
          loading={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleOk}
        >
          {selectedClassResult == null ? "Upload" : "Save/Update"}
        </Button>,
          </>:<></>
        
       
      ]}
    >
      <div className="w-full   flex justify-end items-center mb-4">
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
          {selectedClassResult != null ? (
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
      <div className="w-full ">
        <ConfigProvider
          theme={{
            components: {
              Segmented: {
                itemSelectedBg: "rgb(59 130 246)",
                itemSelectedColor: "white",
                trackBg: "rgb(229 231 235)",
              },
            },
          }}
        >
          <Segmented
            options={segmentedArray}
            onChange={(value) => handleSegmentChanging(value)}
          />
        </ConfigProvider>
        <div className="w-full">
          {selectedClassResult != null ? (
            <ResultDescription studentResultList={studentResultList} setStudentResultList={setStudentResultList} editing={editing} setEditing={setEditing} selectedClassResult={selectedClassResult} />
          ) : (
            <div>
              {selectedSegmentedValue == "General Info" ? (
                <Form layout="vertical" hideRequiredMark>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Result Title"
                        rules={[
                          {
                            required: true,
                            message: "Please add your result Title",
                          },
                        ]}
                      >
                        <Input
                          onChange={handleValueChangeInTitleInput}
                          value={uploadData.resultTitle}
                          name="resultTitle"
                          placeholder="Please enter result title here"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        label="Result Adding Method"
                        help="You can only select one method. changing the result adding method while adding result will distroy all added results."
                        rules={[
                          {
                            required: true,
                            message: "Please add your result Title",
                          },
                        ]}
                      >
                        <Radio.Group
                          value={selectedAddingMethod}
                          optionType="button"
                          options={methodSelectionOptions}
                          onChange={resultAddingMethodSelectionChange}
                          buttonStyle="solid"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              ) : selectedSegmentedValue == "Bulk Uploading Panel" ? (
                <div>
                  <BulkResultAddingPanel
                    fileList={fileList}
                    setFileList={setFileList}
                  />
                </div>
              ) : (
                <div className="w-full overflow-x-auto">
                  <IndividualClassResultAddingModel
                    studentResultList={studentResultList}
                    setStudentResultList={setStudentResultList}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ClassResultInfoModel;
