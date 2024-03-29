import React, { useEffect, useState } from 'react';
import Accordian from './Accordian';
import { useSelector } from 'react-redux';

const ChangingclassInnerCards = ({setSubAccID,  openeditingDrawer,setOpeneditingDrawer}) => {
  const [accordions, setAccordions] = useState([]);
  const [loading, setLoading] = useState(true);
  const accordianData = useSelector((state) => state.accordians.accordians);

  useEffect(() => {
    console.log("accordian Values ", accordianData);
    setAccordions(accordianData);
    setLoading(false);
  }, [accordianData]);

  return (
    <div className='mt-2'>
      {!loading && accordions && accordions.length > 0 &&
        accordions.map((acc) => (
          <Accordian key={acc.accordianID} accDetails={acc} setSubAccID={setSubAccID}  openeditingDrawer={openeditingDrawer } setOpeneditingDrawer={setOpeneditingDrawer} />
        ))}
    </div>
  );
};

export default ChangingclassInnerCards;
