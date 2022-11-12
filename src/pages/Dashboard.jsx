import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import { Sales } from "../util/Sales"
import { MonthsData } from "../util/Data"
import { useState, useContext, useEffect } from "react";
import { UserContext } from "./../components/context/UserContext";
import { DateContext } from "./../components/context/DateContext";
import { isAfter, parseISO, getMonth } from "date-fns";
import { DateData } from "../util/Dates";
import Table from "../components/Table";
import DashTable from "../components/DashTable"
import axios from "axios";
import DashTotals from "../components/DashTotals";

function Dashboard() {


  // Nouns

  const threeMos = new Date();
  threeMos.setMonth(threeMos.getMonth() - 3);

  const sixMos = new Date();
  sixMos.setMonth(sixMos.getMonth() - 6);

  const twelveMos = new Date();
  twelveMos.setMonth(twelveMos.getMonth() - 12);

  const dateInfo = useContext(DateContext);
  const userInfo = useContext(UserContext);

  const [totalPoliciesSold, setTotalPoliciesSold] = useState(0)

  const [closingRatio, setClosingRatio] = useState()

  const [totalPremiumSold, setTotalPremiumSold] = useState(0)

  let filteredSales = []

  let filteredDates = []

  let tableHeaders = ["Policy #", "Result"]

  let results = [
    {
      result:"CC",
      value:0
    },
    {
      result:"DCL",
      value:0
    },
    {
      result:"INC",
      value:0
    },
    {
      result:"QNF",
      value:0
    },
  ]

  let monthsList = [
   {
      month:"Jan",
      value:0
    },
    {
      month:"Feb",
      value:0
    },
    {
      month:"Mar",
      value:0
    },
    {
      month:"Apr",
      value:0
    },
    {
      month:"May",
      value:0
    },
    {
      month:"Jun",
      value:0
    },
    {
      month:"July",
      value:0
    },
    {
      month:"Aug",
      value:0
    },
    {
      month:"Sep",
      value:0
    },
    {
      month:"Oct",
      value:0
    },
    {
      month:"Nov",
      value:0
    },
    {
      month:"Dec",
      value:0
    }
  ]

  // This came from Stack overflow 
  // https://stackoverflow.com/questions/31378526/generate-random-date-between-two-dates-and-times-in-javascript

  const getDate = (date1, date2) => {
    const options = {year:'numeric', month:'numeric',day:'numeric'}
    function randomValueBetween(min, max) {
      return Math.random() * (max - min) + min;
    }
    date1 = date1 || '01-01-1970'
    date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()

    // const ret = new Date(randomValueBetween(date1,date2))
    
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
    for(let i=0; i<=850; i++){
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

  const [callResults, setcallResults] = useState(results)

  const [monthsSales, setMonthSales] = useState(monthsList)

  const [monthsChart, setMonthsChart] = useState({
    labels: monthsSales.map((data) => data.month),
    datasets: [
      {
        label: "Total Sales",
        data: monthsSales.map((data) => data.value),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [resultsChart, setResultsChart] = useState({
    labels: callResults.map((data) => data.result),
    datasets: [
      {
        label: "Result",
        data: callResults.map((data) => data.value),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

// Verbs


  const updateMonthsChart = () =>{
    setMonthsChart({
      labels: monthsSales.map((data) => data.month),
      datasets: [
        {
          label: "Total Sales",
          data: monthsSales.map((data) => data.value),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }
    )
  }

  const updateResultsChart = () => {
    setResultsChart({
      labels: callResults.map((data) => data.result),
      datasets: [
        {
          label: "Result",
          data: callResults.map((data) => data.value),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],

    })
  }

  const resetMonthSales = () =>{
    setMonthSales(monthsList)
  }

  useEffect(() => {
    setMonthsChart({
      labels: monthsSales.map((data) => data.month),
      datasets: [
        {
          label: "Total Sales",
          data: monthsSales.map((data) => data.value),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    })
  }, [monthsSales]);

  useEffect(() => {
    setResultsChart({
      labels: callResults.map((data) => data.result),
      datasets: [
        {
          label: "Result",
          data: callResults.map((data) => data.value),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    })
  }, [callResults]);

  useEffect(() => {
    calls.map((item) => {
      if((isAfter(parseISO(item.effectiveDate), twelveMos) === true)) {
          filteredDates.push(item)
      }
    })
    filteredSales = (filteredDates.filter(call => call.result === "CC"))
    setTotalPoliciesSold(filteredSales.length)
    setTotalPremiumSold(handlePremiumSold())
    handleClosingRatio()
    incrementMonths()
    incrementResults()
    setMonthsChart(monthsChart)
    updateMonthsChart()
    updateResultsChart()
  }, []);

  const incrementResults = () => {
    filteredDates.map((call) =>{
      const matchingResult = results.findIndex((result) => result.result === call.result)
      results[matchingResult].value += 1
    })
    setcallResults(results)
    setResultsChart(callResults)
  }

const incrementMonths = () =>{
  let forMonths = monthsList
  for(let i=0; i < filteredSales.length; i++) {
  let curmonth = new Date(filteredSales[i].effectiveDate).getMonth()
  forMonths[curmonth].value +=1
  }
  setMonthSales(forMonths)
}

const handlePoliciesSold = (e) => {
  calls.map((item) => {
    if (e.target.value === "3" && (isAfter(parseISO(item.effectiveDate), threeMos) === true)){
      filteredDates.push(item)
    } else if (e.target.value === "6" && (isAfter(parseISO(item.effectiveDate), sixMos) === true)){
      filteredDates.push(item)
    }else if (e.target.value === "12" && (isAfter(parseISO(item.effectiveDate), twelveMos) === true)){
      filteredDates.push(item)
    }
  })
  filteredSales = (filteredDates.filter(call => call.result === "CC"))
}

const handlePremiumSold = () => {
  let count = 0
  filteredSales.map((item) =>{
    count += item.premium
  })
  return count
}

const handleClosingRatio = () => {
  setClosingRatio((Math.round(filteredSales.length/filteredDates.length*100)))
}


const handleClick = (e) => {
    handlePoliciesSold(e)
    setTotalPremiumSold(handlePremiumSold())
    setMonthsChart(monthsChart)
    incrementMonths()
    updateMonthsChart()
    setTotalPoliciesSold(filteredSales.length)
    handleClosingRatio()
    incrementResults()
    updateResultsChart()
}

    return calls ?(
      <>
      <div className="p-5 grid-container">
        <header className="flex items-center justify-center grid grid-cols-9 gap-4 pb-3">
          <h1 className="sales-tracker text-3xl col-span-3">Sales Metrics Tracker</h1>
          <span className="h4 welcome text-md p-3 col-span-3 items-center justify-center">Happy {dateInfo.weekday}, {userInfo.firstname}!</span>
          <div className="col-span-3 align-center justify-center dash-date">
            <span className="date">{dateInfo.date}</span>
            <span className="quarter">{dateInfo.quarter}</span>
          </div>
        </header>
      <hr className="pb-3" />
      <main className="main grid grid-cols-4 gap-4">
        <div className="piechart shadow-2xl">
          <span className="h4 result-title">Results:</span>
          <PieChart chartData={resultsChart}/>
        </div>
        <div className="closing-ratio shadow-2xl">
          <p className="cr-title h3"> Closing Ratio:</p>
          <p className="ratio stat h2 m-4">{closingRatio}%</p>
        </div>
        <div className="totals shadow-2xl">
          <DashTotals totalPoliciesSold={totalPoliciesSold} totalPremiumSold={totalPremiumSold}/>
        </div>
        <div className="contact-table col-span-1 row-span-3 shadow-2xl">
          <DashTable tableData={calls.slice(0,24)}/>
        </div>
        <div className="col-span-3 row-span-2 barchart shadow-2xl mt-3"> 
          <div>
            <span className="h3 w-full bar-title mb-3">Total Sales Last 6 Months</span>
          </div>
          <div className="flex gap-2 w-full items-center justify-center pb-1">
          <input type="radio" id="threeMonths" name="radio" value="3" onClick={handleClick}/>
              <label htmlFor="threeMonths">3 Months</label><br />
              <input type="radio"  id="sixMonths" name="radio" value="6" onClick={handleClick}/>
              <label htmlFor="sixMonths">6 Months</label><br />
              <input type="radio" id="twelveMonths" name="radio" value="12" onClick={handleClick}/><br />
              <label htmlFor="twelveMonths" >1 Year</label><br />
            </div>
            <BarChart chartData={monthsChart}/>
            </div>
      </main>
      </div>
  

      </>
    ): <h1>Loading</h1>
  }
  
  export default Dashboard;
  