import React, { useContext } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { StateContext } from "../../App";

export default function Chart() {
 
  const stateContext = useContext(StateContext);

  const Options = {
    title: {
      text: "",
    },
    xAxis: {  
      tickmarkPlacement: 'off',
      tickInterval: 1
    },
   yAxis:{
   labels: {
    enabled:false
   }
    
   },
   tooltip: {
    backgroundColor: '#FCFFC5',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
    
    style: {
      fontSize: 15,
    },
},
    series: stateContext?.chartData?.series || [],
    legend: {
        layout: 'vertical',
        itemStyle: {
            textTransform: 'capitalize',
          
        },
        verticalAlign: 'top',
        align: 'right',
        itemDistance: 30,     
    },
    credits: {
      enabled: false
  },
  plotOptions: {
    series: {      
        label: {
            connectorAllowed: false
        },
        marker: {
            symbol: 'circle',
            radius: 6,
            lineWidth: 1
        },
        pointStart: 0
    }
},

   
  };
  return <HighchartsReact highcharts={Highcharts} options={Options} />;
}


