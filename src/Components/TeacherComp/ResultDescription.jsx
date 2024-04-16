import React from 'react';
import { Badge, Descriptions } from 'antd';

const ResultDescription = ({selectedClassResult}) => {

    const items = [
        {
          key: '1',
          label: 'Result ID',
          children: selectedClassResult?.resultID ,
        },
        {
          key: '2',
          label: 'Publish Date',
          children: selectedClassResult?.publishDate.substring(0,10),
        },
        {
          key: '3',
          label: 'class ID',
          children:selectedClassResult?.classID,
        },
        {
          key: '3',
          label: 'Result Title',
          children:selectedClassResult?.resultTitle
          ,
        },
       
      ];



    return (
        <Descriptions layout="horizontal" bordered items={items} />
    );
}


export default ResultDescription;