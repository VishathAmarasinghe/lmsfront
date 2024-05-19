import React, { useEffect, useState } from "react";
import { ConfigProvider, message, Steps, theme,notification } from "antd";

import { Button } from "@mui/material";
import RegistrationFormOne from "./RegistrationFormOne";
import RegistrationFormTwo from "./RegistrationFormTwo";
import RegistrationFormThree from "./RegistrationFormThree";
import {PerformValidations} from "../Utils/Validations";
import NotificationPopup from "./NotificationComp/Notification";
import { studentRegister } from "../Actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegistrationFom = () => {
  
  const dispatch =useDispatch();
  const navigation=useNavigate();
  const [uploadedImage,setuploadingImage]=useState("");
  const [api, contextHolder] = notification.useNotification();
  const [resultChecked,setresultChecked]=useState(false);
  const [errorValidator, setErrorValidator] = useState({
    studentFirstName: "",
    studentLastName: "",
    address: "",
    stuPhoneNo: "",
    stuEmail: "",
    school: "",
    gardientEmail:"",
    gardientName: "",
    gardientPhoneNo: "",
    gardientNIC: "",
    occupation: "",
  });
  const [formData, setFormData] = useState({
    student: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNo: "",
      email: "",
      NIC: "",
      school: "",
      profilepic:"",
      gender:"Male"
    },
    parent: {
      firstName: "",
      LastName:"",
      NIC: "",
      email: "",
      phoneNo: "",
      address: "",
      occupation: "",
      gender:"Male"
    },
  });


  useEffect(()=>{
    setFormData({...formData,student:{
      ...formData.student,
      profilepic:uploadedImage
    }})

    console.log("uploading image added ",uploadedImage);

  },[uploadedImage])




  useEffect(() => {
    console.log("error validator ", errorValidator);
  }, [errorValidator]);

  const handleChangingFormData = (e) => {
    const { name, value } = e.target;
    const [category, field] = name.split(".");

    setFormData((prevState) => ({
      ...formData,
      [category]: {
        ...prevState[category],
        [field]: value,
      },
    }));
  };

  const steps = [
    {
      title: "General Info",
      content: (
        <RegistrationFormOne
          errorValidator={errorValidator}
          formData={formData}
          handleChangingFormData={handleChangingFormData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Gardient Info",
      content: (
        <RegistrationFormTwo
        setuploadingImage={setuploadingImage}
        uploadedImage={uploadedImage}
          errorValidator={errorValidator}
          formData={formData}
          setFormData={setFormData}
          handleChangingFormData={handleChangingFormData}
        />
      ),
    },
    {
      title: "Confirmation",
      content: (
        <RegistrationFormThree
        resultChecked={resultChecked}
        setresultChecked={setresultChecked}
          formData={formData}
          handleChangingFormData={handleChangingFormData}
        />
      ),
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);


  const next = () => {
    console.log("printing Form Data ", formData);

    const hasErrors = PerformValidations(formData, setErrorValidator, errorValidator,current);
  
    if (!hasErrors) {

      setCurrent(current + 1);

      setErrorValidator({});
    }else{
      message.error("Please enter correct details")
    }
  };

  const SaveDetails=()=>{
    if (resultChecked==true) {
      console.log("answer is checked");
      try {
        
        formData.parent.address=formData.student.address;
        console.log("finalized formData ",formData);
        dispatch(studentRegister(formData,navigation,notification));


      } catch (error) {
        console.log("error occured ",error);
      }
      
      
    }else{
      console.log("result is not checked");
      message.error("Please agree to the terms and conditions")
    }
  }

  

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {

    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
    {contextHolder}
    <div className="w-full bg-white p-6 rounded-xl shadow-2xl m-5 z-10">
      <h1 className="text-2xl font-inter font-extrabold text-center my-2 text-[#5B6BD4]">
        Student Registration
      </h1>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#5B6BD4",
          },
        }}
      >
        <Steps current={current} items={items} />
      </ConfigProvider>
      <div style={contentStyle} className="p-2">
        {steps[current].content}
      </div>

      <div className="mt-3 w-full">
        {current < steps.length - 1 && (
          <Button
            variant="contained"
            className="w-1/3"
            style={{ backgroundColor: "#5B6BD4" }}
            onClick={() => next()}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            variant="contained"
            style={{ backgroundColor: "#5B6BD4" }}
            className="w-1/3"
            onClick={()=>SaveDetails()}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            className="w-1/3"
            variant="outlined"
            style={{
              margin: "0 8px",
              color: "#5B6BD4",
              borderColor: "#5B6BD4",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
    </>
  );
};

export default RegistrationFom;
