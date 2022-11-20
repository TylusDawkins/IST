import { createContext, useState } from "react";
import { Sales } from "../../util/Sales";

export const CallContext = createContext();

export function CallProvider({ children }) {

  const [callsContext,setCallsContext] = useState([]);
    
    return (
      <CallContext.Provider value={[callsContext,setCallsContext]}>
        {children}
      </CallContext.Provider>
    )
  }