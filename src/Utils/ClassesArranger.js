export const getNextNDaysClasses = (data, numDays) => {
    const daysOfWeekText = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    const today = new Date().getDay();
  
    const formatTime = (timeString) => {
      return timeString.substring(0, 5);
    };
  
    // Function to get classes for a specific day
    const getClassesForDay = (dayIndex) => {
      const classesForDay = data.filter(classData => {
        const daysOfWeek = classData.daysOfWeek.map(day => parseInt(day)); 
        return daysOfWeek.includes(dayIndex);
      });
  
      classesForDay.sort((a, b) => {
        const startTimeA = new Date(`1970-01-01T${a.startTime}`);
        const startTimeB = new Date(`1970-01-01T${b.startTime}`);
        return startTimeA - startTimeB;
      });
  
      return classesForDay;
    };
  
    // Array to store classes for the next N days
    const nextNDaysClasses = [];
  
    // Loop through the next N days (including today)
    for (let i = 0; i < numDays; i++) {
      // Calculate day index, wrap around to beginning of week if needed
      const dayIndex = (today + i) % 7;
  
      // Get classes for the current day
      const classesForDay = getClassesForDay(dayIndex);
  
      // Push an object containing day name and classes to the result array
      nextNDaysClasses.push({ dayOfWeek: daysOfWeekText[dayIndex], classes: classesForDay });
    }
  

    return nextNDaysClasses;
  };


  