export const getWeekDates = (date) => {
    const start = new Date(date);
    const day = start.getDay(); // 0 = Sunday
  
    // Shift to the previous Sunday
    start.setDate(start.getDate() - day); // If it's Sunday, shift by 0. If it's Monday (1), shift by -1, etc.
  
    const week = [];
  
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      week.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        day: d.getDate(),
        date: new Date(d),
      });
    }
  
    return week;
  };
  