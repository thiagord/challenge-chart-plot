import React, { createContext, useState } from "react";
import { useAlert } from 'react-alert';
import Header from "./components/Header/Header";
import Chart from "./components/Chart/Chart";
import TextArea from "./components/TextArea/TextArea";
import Footer from "./components/Footer/Footer";
import './App.css';
import './helpers/RegExp';
import { regJson, regLine, regName } from "./helpers/RegExp";
import {JsonParse} from "./helpers/DataParse";
export const StateContext = createContext({});

  function App() {
 
  const [Editor, setEditor] = useState('');
  const [chartData, setChartData] = useState({});
  const alert = useAlert();

  const GenerateChart = () => {

    //Check if input is empty then generate an alert
    if(!Editor) {
    alert.error("Input is empty!"); 
    return;
    }
    var value = Editor.getValue();
    var DataArray = regJson(value);
    var minTime = "";
    var maxTime = "";
    var error = false;
    let select,   
    groups = [];
    let groupedData = {};
 
    DataArray.forEach((val) => {
           
      //Check if the json is valid
      //RegExp the data
      let data = JsonParse(regLine(val));
     
      switch (data.type) {
       
          //Type start: Data and groups
          case "start":

          select = data.select;
          groups = data.group;

          break;       
          //Type span: Set the max and min time interval allowed
          case "span":
          minTime = data.begin;
          maxTime = data.end;

          break;
          //Type data: Check timestamps then populate groupedData
          case "data":

            let id = "";
            let object = {};
            
            //If some timestamp is out of interval generate an alert
            if(data.timestamp < minTime || data.timestamp > maxTime) {
              alert.error("Timestamp out of interval allowed! ");           
              error = true;
              return;
            }

            //Objects id
            groups.forEach((group, index) => {
              id += (index > 0 ? "_" : " ") + data[group].toLowerCase();
            });

            object[id] = {};

            select.forEach((group) => {
              let otherValues = (groupedData[id] && groupedData[id][group]) || [];
              object[id] = { ...object[id], [group]: [...otherValues, data[group]] };
            });

            //Pass data to groupedData
            Object.assign(groupedData, object);

          break;
          //Type stop: If there's no error plot the chart
          case "stop":

          if (error === false) {
            const newChartData = [];

              Object.keys(groupedData).forEach((data) => {
              const obj = groupedData[data];
              const result = [];

              //Populate the chart legend
              select.forEach((legend) => {
                //Format data 
                let name = regName((data + " " + legend));
                result.push({
                  name: name,
                  type: "line",
                  data: obj[legend],
                });
              });

              newChartData.push(...result);
             
            });
            setChartData({ ...chartData, series: newChartData });
            alert.success("Chart generated!");
           
            Editor.clearHistory();
          }

          break;
        default:
          alert.error("Invalid data type! ");  
          break;
      }
      Editor.setValue(value);
    });
  };
  return (
    <>    
      <div className="App">
        <StateContext.Provider
          value={{
            chartData, setChartData,
            GenerateChart,
            Editor,
            setEditor,
          }} >
      <Header />
        <TextArea />
        <Chart />
      <Footer />
   </StateContext.Provider>
      </div>
    </>
  );
}

export default App;
