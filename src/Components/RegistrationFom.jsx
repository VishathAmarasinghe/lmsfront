import React, { useState } from "react";
import { ConfigProvider, message, Steps, theme } from "antd";

import { Button } from "@mui/material";
import RegistrationFormOne from "./RegistrationFormOne";
import RegistrationFormTwo from "./RegistrationFormTwo";
import RegistrationFormThree from "./RegistrationFormThree";

const RegistrationFom = () => {
  const steps = [
    {
      title: "General Info",
      content: <RegistrationFormOne />,
    },
    {
      title: "Gardient Info",
      content: <RegistrationFormTwo/>,
    },
    {
      title: "Confirmation",
      content:<RegistrationFormThree/>,
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    // lineHeight: '260px',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    
  };

  return (
    
    <div className="w-full bg-white p-6 rounded-xl shadow-2xl m-5 z-10">
      <h1 className="text-2xl font-inter font-extrabold text-center my-2 text-[#5B6BD4]">Student Registration</h1>
        
    <ConfigProvider
    theme={{
        token:{
            colorPrimary:"#5B6BD4"
        }
    }}
    >
      <Steps   current={current} items={items} />
    </ConfigProvider>
      <div style={contentStyle} className="p-2">{steps[current].content}</div>

      <div className="mt-3 w-full">
        {current < steps.length - 1 && (
          <Button variant="contained" className="w-1/3" style={{backgroundColor:"#5B6BD4"}} onClick={() => next()}>Next</Button>
        )}
        {current === steps.length - 1 && (
          <Button variant="contained" style={{backgroundColor:"#5B6BD4"}} className="w-1/3" onClick={() => message.success("Processing complete!")}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
          className="w-1/3"
          variant="outlined"
            style={{
              margin: "0 8px",
              color:"#5B6BD4",
              borderColor:"#5B6BD4"
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default RegistrationFom;
