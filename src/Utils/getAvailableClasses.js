import { get_classs_with_halls_and_days } from "../Actions/class";
import { DateTime } from 'luxon';

export const getAvailableClassesOneDay = async (day, hall) => {
  const classArray = await get_classs_with_halls_and_days(day, hall);
  console.log("classArray ", classArray);
  const timeArray = [8, 0];
  const availabilityArray = [];
  while (timeArray[0] != 21) {
    let startTime = DateTime.local().set({ hour: timeArray[0], minute: timeArray[1] });
    timeArray[1] = timeArray[1] + 30; 
    if (timeArray[1] >= 60) {
      timeArray[0] = timeArray[0] + 1;
      timeArray[1] = 0;
    }
    let lastTime = DateTime.local().set({ hour: timeArray[0], minute: timeArray[1] });
    console.log("time ", startTime.toFormat('HH:mm'), " to ", lastTime.toFormat('HH:mm'));

    const available = classArray.some((cls) => {
      const classStartTime = DateTime.fromFormat(cls.StartTime, 'HH:mm:ss');
      const classEndTime = DateTime.fromFormat(cls.endTime, 'HH:mm:ss');
      // Adding a buffer time of 5 minutes (adjust as needed)
      const bufferedClassEndTime = classEndTime.plus({ minutes: 5 });
      return startTime >= classStartTime && lastTime <= bufferedClassEndTime;
    });

    if (available) {
      const matchingClass = classArray.find((cls) => {
        const classStartTime = DateTime.fromFormat(cls.StartTime, 'HH:mm:ss');
        const classEndTime = DateTime.fromFormat(cls.endTime, 'HH:mm:ss');
        const bufferedClassEndTime = classEndTime.plus({ minutes: 5 });
        return startTime >= classStartTime && lastTime <= bufferedClassEndTime;
      });
      availabilityArray.push({ startTime: startTime.toFormat('HH:mm'), lastTime: lastTime.toFormat('HH:mm'), availability: true, class: matchingClass });
    } else {
      availabilityArray.push({ startTime: startTime.toFormat('HH:mm'), lastTime: lastTime.toFormat('HH:mm'), availability: false });
    }
  }
  console.log("Availability Array:", availabilityArray);
};
