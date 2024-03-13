import { Checkbox } from "@mui/material";
import { ConfigProvider } from "antd";
import React from "react";

const RegistrationFormThree = ({resultChecked,setresultChecked}) => {
  const listdetails = [
    {
      title: "Academic Integrity",
      message:
        "Prohibition against cheating, plagiarism, and other forms of academic dishonesty",
    },
    {
      title: "Attendance and Punctuality",
      message:
        "Expectation for students to attend classes regularly and arrive on time.",
    },
    {
      title: "Behavioral Expectations",
      message:
        "Standards of conduct, including respect for fellow students, faculty, and staff.",
    },
    {
      title: "Health and Safety",
      message: "Expectations for maintaining a safe and healthy environment.",
    },
  ];
  return (
    <div>
      <div>
        {listdetails.map((item,index) => (
          <dl className="ml-4" key={index}>
            <dt className="font-semibold text-black">{item.title}</dt>
            <dd className="ml-6">{item.message}</dd>
          </dl>
        ))}
      </div>
      <div className="flex flex-row items-center bg-gray-300 mt-2">
        <ConfigProvider
        theme={
          {
            token:{
              colorPrimary:"#5B6BD4"
            }
          }
        }
        >
          <Checkbox checked={resultChecked} onChange={()=>setresultChecked(pre=>!pre)} />
        </ConfigProvider>

        <p>I agree the terms and Conditions</p>
      </div>
    </div>
  );
};

export default RegistrationFormThree;
