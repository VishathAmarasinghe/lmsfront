import { get_classs_with_halls_and_days } from "../Actions/class"

export const getAvailableClassesOneDay=async(day,hall)=>{
    const classArray=await get_classs_with_halls_and_days(day,hall);
    console.log("classArray ",classArray);
    const startTime=8.00;
    const endtime=20.00;
    const availabilityArray=[];
    while(startTime<endtime){
        let lowerRange=String(startTime);
        let upperRengeDecimal=parseInt(String(startTime).split(".")[1])+3
        let frontvalue=parseInt(String(startTime).split(".")[0])
        if (upperRengeDecimal==6) {
            upperRengeDecimal=0
            frontvalue=frontvalue+1
        }
        let upperRange=String(frontvalue)+String(upperRengeDecimal);
        console.log("lowerRange ",lowerRange,"  upperRange ",upperRange);
        startTime=parseFloat(upperRange);
        

        
    }
}