import "./App.css";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./components/context/UserContext";
import { DateProvider } from "./components/context/DateContext";
import { CallProvider } from "./components/context/CallContext";
import { Routes, Route } from "react-router";
import CallLog from "./pages/CallLog";
import { useState } from "react";


function App() {

  const twelveMos = new Date();
  twelveMos.setMonth(twelveMos.getMonth() - 12);

  const getDate = (date1, date2) => {
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    // date1 = date1 || '01-01-1970'
    // date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()

    const ret = new Date(randomValueBetween(date1,date2))
    
    if( date1>date2){
      const ret = new Date(randomValueBetween(date2,date1)) 
      const year = ret.getFullYear()
      const month = ret.getMonth()>=9? ret.getMonth()+1:`0${ret.getMonth()+1}`
      const day = ret.getDay()>=10? ret.getDay()+1:`0${ret.getDay()+1}`
        return  `${year}-${month}-${day}`
    } else{
      const ret = new Date(randomValueBetween(date1, date2))
      const year = ret.getFullYear()
      const month = ret.getMonth()>=9? ret.getMonth()+1:`0${ret.getMonth()+1}`
      const day = ret.getDay()>=9? ret.getDay()+1:`0${ret.getDay()+1}`
        return `${year}-${month}-${day}`

    }
}

  const getPolType = () => {
    const type_random = Math.floor(Math.random())
    if(type_random === 0){
      return "Auto"
    } else if(type_random===1){
      return "Home"
    }
  }

  const getResult = () => {
    const result_random = Math.floor(Math.random() * 4)
    if(result_random === 0){
      return "CC"
    } else if(result_random === 1){
      return "DCL"
    } else if(result_random ===2){
      return "INC"
    } else {return "QNF"}
  }

  const createCalls = () => {
    let arr = []
    for(let i=0; i<850; i++){
      const type_random = Math.floor(Math.random() * 4)
      const contact_date = getDate(twelveMos,new Date().toLocaleDateString())
      const effective_date = getDate(contact_date, new Date().toLocaleDateString())

      const obj = {
        policy_number: 1000+i,
        policy_type: getPolType(),
        premium :Math.floor(Math.random() * 1200+400),
        result: getResult(),
        reason: null,
        contactDate:contact_date,
        effectiveDate:effective_date
      }
      arr.push(obj)

    }
    return arr
  }


  const [calls, setCalls] = useState(createCalls())

  return (
    <>
      <CallProvider>
      <DateProvider>
      <UserProvider>
          <NavBar />
            <Routes>
              <Route path="/" element={<Dashboard calls={calls} setCalls={setCalls} />}/>
              <Route path="/profile/" element={<Profile />}/>
              <Route path="/call-log" element={<CallLog calls={calls}/>}/>
            </Routes>
          <Footer />
        </UserProvider>
        </DateProvider>
        </CallProvider>
    </>
  );
}

export default App;
