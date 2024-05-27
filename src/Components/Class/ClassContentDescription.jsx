import { ConfigProvider, Descriptions } from "antd";
import React, { useEffect, useState } from "react";

const ClassContentDescription = ({ classDetails }) => {
  const [descriptionList, setDescriptionList] = useState([]);
  console.log("selected class details ", classDetails);

  useEffect(() => {
    if (classDetails) {
      const items = [
        {
          label: "Class ID",
          children: classDetails.classID,
          span: 1,
        },
        {
          label: "Class Name",
          children: classDetails.ClassName,
          span: 1,
        },
        {
          label: "Class Time",
          children: `${String(classDetails.StartTime).slice(0, -2)} - ${String(
            classDetails.endTime
          ).slice(0, -2)}`,
          span: 1,
        },
        {
          label: "Grade",
          children: classDetails.gradeName,
          span: 1,
        },
        {
          label: "Subject",
          children: classDetails.gradeName,
          span: 1,
        },
        {
          label: "Teacher",
          children: "$20.00",
          span: 1,
        },
        {
          label: "Class Mode",
          children: classDetails.ClassMode,
          span: 1,
        },
        {
          label: "Hall info",
          children: (
            <>
              Hall ID {classDetails.hallID}
              <br />
              Hall Name {classDetails.hallName}
              <br />
              Seat Count {classDetails.seatCount}
              <br />
              AC Type {classDetails.ACtype}
            </>
          ),
          span: 3,
        },
        {
          label: "Meeting Link",
          children: classDetails.meetingLink?<a href={classDetails?.meetingLink} target="_blank">{classDetails?.meetingLink}</a>:"Not provided",
          span: 3,
        },
      ];

      setDescriptionList(items);
    }
  }, [classDetails]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Descriptions: {
            labelBg: "#EBEEFF",
            controlItemBgActive: "#EBEEFF",
            contentBg: "#EBEEFF",
          },
        },
      }}
    >
      <Descriptions
        size="small"
        title="Class Information"
        items={descriptionList}
        bordered
        labelStyle={{ fontWeight: "bold" }}
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
      />
    </ConfigProvider>
  );
};

export default ClassContentDescription;
