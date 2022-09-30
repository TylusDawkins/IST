import Table from "../components/Table";
import Table2 from "../components/Table"
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Sales } from "../util/Sales"


function CallLog() {
    const headers = ["Policy #", "Type", "Contact Date", "Effective Date","Premium","Result","Reason"]

    const [callInfo, setCallInfo] = useState(Sales);
    const [error, setError] = useState(null);
    const [stringDataState, setStringDataState] = useState("");

    // const getCallInfo = async () => {
    //     try {
    //       const response = await axios.get(
    //         `https://team14-isa-db-n1604029-development.us-east-1.np.paas.lmig.com/IndividualSalesTracker/home`
    //       );
    //       console.log(response.data);
    //       setCallInfo(response.data);
    //       setStringDataState(JSON.parse(response.data))
    //     } catch (err) {
    //       setError(err.message);
    //     //   setCallInfo(null);
    //       // probably dont need ^
    //     }
    // }

    // useEffect(() => {
    //   getCallInfo();
    // }, [stringDataState]);
    
  
    
    
    return Sales ?(
        <div className="main">
            <Table2 tableData={callInfo} />
        </div>
    ) : <h1>Loading</h1>
}

export default CallLog;