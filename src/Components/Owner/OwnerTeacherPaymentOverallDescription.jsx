import React from 'react';
import { Badge, Descriptions } from 'antd';

const OwnerTeacherPaymentOverallDescription = ({statData }) => {
    const items = [
        {
            label: 'Total Fees Payment To have',
            children: `Rs:${statData?.TotalFeeToHave}`,
        },
        {
            label: 'Current Fees payment Received',
            children: `Rs:${statData?.currentTotalFee}`,
        },
        {
            label: 'Total Teacher Payment to have',
            children: `Rs:${statData?.TotalFeeToHaveTeachers}`,
        },
        {
            label: 'Currnet Teacher Payment',
            children: `Rs:${statData?.TotalCurrentTeachersFee}`,
        },
        {
            label: 'Institute Protion to have',
            children: `Rs:${statData?.TotalFeeToHaveInstitute}`,
        },
        {
            label: 'Current Institution portion',
            children: `Rs:${statData?.TotalCurrentFeeInstitute}`,
        },
    ];

    const descriptions = items.map(item => (
        <Descriptions.Item key={item.label} label={item.label}>
            {item.children}
        </Descriptions.Item>
    ));

    return (
        <Descriptions title="Overall Payment Information" labelStyle={{fontWeight:"bold"}} bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
            {descriptions}
        </Descriptions>
    );
};

export default OwnerTeacherPaymentOverallDescription;
