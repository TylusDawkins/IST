import {useState, useEffect} from 'react';
import { isAfter, parseISO, getMonth } from "date-fns";

function DashTotals(props){

    const [premInfo, setPremInfo] = useState();

    const totalPoliciesSold = props.totalPoliciesSold
    const totalPremiumSold = props.totalPremiumSold


    const oneMos = new Date();
    oneMos.setMonth(oneMos.getMonth() - 1);

    const calcMonthPremium = () => {
        props.tileData.map((item) => {
            console.log(item.effectiveDate)
            if ((isAfter(parseISO(item.effectiveDate), oneMos) === true)){
            // adding function
            console.log(props.item[7])
    }
})
}
    

    return (
        <div>
        <p className="totalpolicies h4">Total Policies Sold:</p>
            <span className="total-stats h3">
                {totalPoliciesSold}
                </span><br />
          <p className="totalpremiums h4">Total Premium Sold:</p> 
            <span className="total-stats h3">
                {totalPremiumSold}
                </span>
        </div>
    )

    }

export default DashTotals;