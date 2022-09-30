import { createContext, useState } from "react";
import {format} from "date-fns";

const quarter = format(new Date(), "QQQ");
const currentDate = format(new Date(), "MMM-dd-yyyy HH:mm a");
const weekday = format(new Date(), "eeee");

export const DateContext = createContext({
    quarter: quarter,
    date: currentDate,
    weekday: weekday   
});

export function DateProvider({ children }) {

  const [dateInfo] = useState({
        quarter: quarter,
        date: currentDate,
        weekday: weekday 
    });
    
    return (
      <DateContext.Provider value={dateInfo}>
        {children}
      </DateContext.Provider>
    )
  }