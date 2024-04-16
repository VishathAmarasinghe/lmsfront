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
import { uploadResultWithExcel } from "../../API";

const ClassResultInfoModel = ({
  selectedClassResult,
  openingResultPanel,
  setOpeningResultPanel,
}) => {
  const [editing, setEditing] = useState(false);
  const {classID}=useParams();
  const [selectedAddingMethod,setSelectedAddingMethod]=useState("A");
  const [segmentedArray,setSegmentedArray]=useState([]);
  const [selectedSegmentedValue,setSelectedSegmentedValue]=useState("General Info")
  const [fileList, setFileList] = useState([]);
  const [loading,setloading]=useState(false);
  const [uploadData,setUploadData]=useState({
    classID:classID,
    resultTitle:""

  })


  useEffect(()=>{
    setUploadData({...uploadData,classID:classID});
    if (selectedAddingMethod=="A") {
      setSegmentedArray(["General Info","Bulk Uploading Panel"])
    }else if (selectedAddingMethod=="B") {
      setSegmentedArray(["General Info","Single Result Uploading Panel"])
    }
  },[selectedAddingMethod])


  useEffect(()=>{
    console.log("upload data ",uploadData);
  },[uploadData])


  const handleValueChangeInTitleInput=(e)=>{
    setUploadData({...uploadData,resultTitle:e.target.value});
  }

  const showModal = () => {
    setOpeningResultPanel(true);
  };

  const handleOk = async() => {
    setloading(true);
    const formData=new FormData();
    // console.log("fie lis ",);
    formData.append("uploadData",JSON.stringify(uploadData));
    formData.append("file", fileList[0].originFileObj);

    try {

      const uploadResult=await uploadResultWithExcel(formData);
      console.log("upload Result! ",uploadResult);
      if (uploadResult.status==200) {
        notification.success({
          message:"Results Uploaded Successfully!",
          description:"click edit, if you want to edit or check uploaded results"
        })
      }else{
        notification.error({
          message:"Results Uploading Error!",
          description:"Retry again later!"
        })
      }
      
    } catch (error) {
      console.log("error is ",error);
      message.error("result uploading Error!")
    }finally{
      setloading(false);
      handleCancel()
    }
  };




  const handleCancel = () => {
    setOpeningResultPanel(false);
    setUploadData({
      ...uploadData,resultTitle:""
    })
    setloading(false);
    setFileList([])
    setSelectedSegmentedValue("General Info")
  };



  const handleSwitchChange = (checked) => {
    setEditing(checked);
  };




  const handleSegmentChanging = (value) => {
    console.log("segment Value is ", value);
    setSelectedSegmentedValue(value);
  };

  const resultAddingMethodSelectionChange = ({ target: { value } }) => {
    console.log('radio checked', value);
    setSelectedAddingMethod(value);
  };





  const methodSelectionOptions = [
    {
      label: 'Bulk Result Adding',
      value: 'A',
    },
    {
      label: 'Add Result One by One',
      value: 'B',
    },
  ];





  return (
    <Modal
      width={"60%"}
      title="Class Result Info"
      open={openingResultPanel}
      onOk={handleOk}
      centered
      maskClosable={false}
      closable={false}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="ok" loading={loading} className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleOk}>
         {
          selectedClassResult==null?"Upload":"OK"
         }
        </Button>,
      ]}
    >
      <div className="w-full border-2 border-red-500  flex justify-end items-center mb-4">
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
          {
            selectedClassResult!=null?<Switch
            checked={editing}
            className={editing ? "bg-green-500" : "bg-slate-400"}
            size="30px"
            onChange={handleSwitchChange}
            checkedChildren="Editing"
            unCheckedChildren="Edit"
          />:<></>
          }
          
        </ConfigProvider>
      </div>
      <div className="w-full border-2 border-green-600">
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
            <ResultDescription selectedClassResult={selectedClassResult} />
          ) : (
            <div>
              {
                selectedSegmentedValue=="General Info"?<Form layout="vertical" hideRequiredMark>
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
                      <Radio.Group value={selectedAddingMethod} optionType="button" options={methodSelectionOptions} onChange={resultAddingMethodSelectionChange} buttonStyle="solid"/>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>:selectedSegmentedValue=="Bulk Uploading Panel"?
              <div>
                <BulkResultAddingPanel fileList={fileList} setFileList={setFileList}/>
              </div>:<></>
              }
              
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ClassResultInfoModel;
