import React from "react";
import { IconButton, InputAdornment, TextField, Checkbox } from "@mui/material";
import ProfilePicUploading from "./TeacherComp/ProfilePicUploading";

const RegistrationFormTwo = ({
  handleChangingFormData,
  formData,
  errorValidator,
  setuploadingImage
}) => {
  return (
    <div className="w-full  ">
      <div className="flex flex-col mb-1 ">
        <label className="font-inter text-[14px] font-medium text-black">
          Student Profile Picture
        </label>
        <ProfilePicUploading setuploadingImage={setuploadingImage} />
        <p className="text-red-700 text-[12px]">Error text</p>
      </div>
      <div className="w-full flex md:flex-row flex-col justify-between ">
        <div className="flex flex-col mb-1 mr-2 w-full md:w-1/2 ">
          <label className="font-inter text-[14px] font-medium text-black">
            Gardient Name
          </label>
          <TextField
            name="parent.firstName"
            value={formData.parent.firstName}
            onChange={(e) => handleChangingFormData(e)}
            inputProps={{
              style: {
                height: "2px",
              },
            }}
            error={!!errorValidator.gardientName}
            className="bg-[#EBEEFF]"
          />
          <p className="text-red-700 text-[12px]">
            {errorValidator.gardientName}
          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 ml-2 mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">
            NIC No
          </label>
          <TextField
            name="parent.NIC"
            value={formData.parent.NIC}
            onChange={(e) => handleChangingFormData(e)}
            inputProps={{
              style: {
                height: "2px",
              },
            }}
            error={!!errorValidator.gardientNIC}
            className="bg-[#EBEEFF]"
          />
          <p className="text-red-700 text-[12px]">
            {errorValidator.gardientNIC}
          </p>
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col justify-between ">
        <div className="flex flex-col mb-1 mr-2 w-full md:w-1/2 ">
          <label className="font-inter text-[14px] font-medium text-black">
            Gardient Email
          </label>
          <TextField
            name="parent.email"
            value={formData.parent.email}
            onChange={(e) => handleChangingFormData(e)}
            inputProps={{
              style: {
                height: "2px",
              },
            }}
            error={!!errorValidator.gardientEmail}
            className="bg-[#EBEEFF]"
          />
          <p className="text-red-700 text-[12px]">
            {errorValidator.gardientEmail}
          </p>
        </div>
        <div className="flex flex-col w-full md:w-1/2 ml-2 mb-1 ">
          <label className="font-inter text-[14px] font-medium text-black">
            Gradient Contact No
          </label>
          <TextField
            name="parent.phoneNo"
            value={formData.parent.phoneNo}
            onChange={(e) => handleChangingFormData(e)}
            inputProps={{
              style: {
                height: "2px",
              },
            }}
            error={!!errorValidator.gardientPhoneNo}
            className="bg-[#EBEEFF]"
          />
          <p className="text-red-700 text-[12px]">
            {errorValidator.gardientPhoneNo}
          </p>
        </div>
      </div>
      <div className="flex flex-col mb-1 ">
        <label className="font-inter text-[14px] font-medium text-black">
          Occupation
        </label>
        <TextField
          name="parent.occupation"
          value={formData.parent.occupation}
          onChange={(e) => handleChangingFormData(e)}
          inputProps={{
            style: {
              height: "2px",
            },
          }}
          error={!!errorValidator.occupation}
          className="bg-[#EBEEFF]"
        />
        <p className="text-red-700 text-[12px]">{errorValidator.occupation}</p>
      </div>
    </div>
  );
};

export default RegistrationFormTwo;
