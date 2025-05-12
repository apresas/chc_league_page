export function getWeekContainingDate(year, monthIndex, day) {
    const clickedDate = new Date(year, monthIndex, day); // monthIndex = 0-based
    const dayOfWeek = clickedDate.getDay(); // 0 = Sunday, 6 = Saturday
  
    const week = [];
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(clickedDate);
      date.setDate(day - dayOfWeek + i);
      week.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      });
    }
  
    return week;
  }
  