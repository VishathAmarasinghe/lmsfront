import dayjs from "dayjs";

export const  isDateTimePast=(date, time)=> {

    const dateTime = `${date}T${time}`;


    const now = dayjs();


    return dayjs(dateTime).isBefore(now);
}
