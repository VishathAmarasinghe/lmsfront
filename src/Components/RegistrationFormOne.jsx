import React from "react";
import { IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";

const RegistrationFormOne = ({
  handleChangingFormData,
  formData,
  errorValidator,
}) => {
  return (
    <div className="w-full ">
      <div className="w-full flex md:flex-row flex-col justify-between ">
        <div className="flex flex-col mb-1 mr-2 w-full md:w-1/2 ">
          <label className="font-inter text-[14px] font-medium text-black">
            First Name
          </label>
          <TextField
            name="student.firstName"
            value={formData.student.firstName}
            onChange={(e) => handleChangingFormData(e)}
            inputProps={{
              style: {
                height: "2px",
              },
            }}
            error={!!errorValidator.studentFirstName}
            className="bg-[#EBEEFF]"
          />
          <p className="text-red-700 text-[12px]">
            {errorValidator.studentFirstName}
          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 ml-2 mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">
            Last Name
          </label>
          <TextField
            name="student.lastName"
            value={formData.student.lastName}
            onChange={(e) => handleChangingFormData(e)}
            inputProps={{
              style: {
                height: "2px",
              },
            }}
            error={!!errorValidator.studentLastName}
            className="bg-[#EBEEFF]"
          />
          <p className="text-red-700 text-[12px]">{errorValidator.studentLastName}</p>
        </div>
      </div>
      <div className="flex flex-col mb-1 ">
        <label className="font-inter text-[14px] font-medium text-black">
          Address
        </label>
        <TextField
          name="student.address"
          value={formData.student.address}
          onChange={(e) => handleChangingFormData(e)}
          inputProps={{
            style: {
              height: "2px",
            },
          }}
          error={!!errorValidator.address}
          className="bg-[#EBEEFF]"
        />
        <p className="text-red-700 text-[12px]">{errorValidator.address}</p>
      </div>
      <div className="flex flex-col mb-1 ">
        <label className="font-inter text-[14px] font-medium text-black">
          Email
        </label>
        <TextField
          name="student.email"
          value={formData.student.email}
          onChange={(e) => handleChangingFormData(e)}
          inputProps={{
            style: {
              height: "2px",
            },
          }}
          error={!!errorValidator.stuEmail}
          className="bg-[#EBEEFF]"
        />
        <p className="text-red-700 text-[12px]">{errorValidator.stuEmail}</p>
      </div>
      <div className="w-full flex md:flex-row flex-col justify-between ">
        <div className="flex flex-col mb-1 mr-2 w-full md:w-1/2 ">
          <label className="font-inter text-[14px] font-medium text-black">
            School
          </label>
          <TextField
            name="student.school"
            value={formData.student.school}
            onChange={(e) => handleChangingFormData(e)}
            inputProps={{
              style: {
                height: "2px",
              },
            }}
            error={!!errorValidator.school}
            className="bg-[#EBEEFF]"
          />
          <p className="text-red-700 text-[12px]">{errorValidator.school}</p>
        </div>
        <div className="flex flex-col mb-1 ml-2 w-full md:w-1/2 ">
          <label className="font-inter text-[14px] font-medium text-black ">
            Student Phone No
          </label>
          <TextField
            name="student.phoneNo"
            value={formData.student.phoneNo}
            onChange={(e) => handleChangingFormData(e)}
            inputProps={{
              style: {
                height: "2px",
              },
            }}
            error={!!errorValidator.stuPhoneNo}
            className="bg-[#EBEEFF]"
          />
          <p className="text-red-700 text-[12px]">{errorValidator.stuPhoneNo}</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFormOne;
