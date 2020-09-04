import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DEV_SVR = "https://dev.dummy-svr.com";
const PROD_SVR = "https://prod.dummy-svr.com";
const baseUrl = process.env.NODE_ENV === 'production' ? PROD_SVR:DEV_SVR ;
const METRIC_ENDPOINT = "/metrics";

interface IProps {
  timeRange: string;
}

function genQuery(timeRange: string, componentName: string, seed: number) {
  return `SELECT ${timeRange} WHERE c = ${componentName} AND x = ${(seed%7)==0?'true':'false'}`;
}

function useData(refreshInterval_Secs: number, query: any) {
  //const [data,setData] = useState(0);
  const [data,setData] = React.useState<undefined | object>(undefined);;

  const fetchData = async () =>{
    const result = await axios({
      method: 'GET',
      url: `${baseUrl}${METRIC_ENDPOINT}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data:query
    });
    setData(result.data);
  }

  useEffect(()=>{
    setTimeout(() => {
      fetchData();
      //setData(data+1);
    }, refreshInterval_Secs*1000);
  },[data]);

  return {
    data
  }
}

  const Loading = () => {
    return <h2>Loading</h2>;
  }
  
  function C1(props: IProps) {
    const refreshInterval_Secs = 60;
    const query = genQuery(props.timeRange, "c1", Math.random());
    const {data} = useData(refreshInterval_Secs,query);
    if (!data) {
      return <Loading />;
    }
    return <>Hi {data}</>;
  }
  
  function C2(props: IProps){
    const refreshInterval_Secs = 10;
    const query = genQuery(props.timeRange, "c2", Math.random());
    const {data} = useData(refreshInterval_Secs,query);
    if (!data) {
      return <Loading />;
    }
    return <>Hello there {data}</>;
  }
  
  function C3(props: IProps){
    const refreshInterval_Secs = 15;
    const query = genQuery(props.timeRange, "c3", Math.random());
    const {data} = useData(refreshInterval_Secs,query);
    if (!data) {
      return <Loading />;
    }
    return <>Charlie {data} Tango</>;
  }
  
  function C4(props: IProps) {
    const refreshInterval_Secs = 42;
    const query = genQuery(props.timeRange, "c4", Math.random());
    const {data} = useData(refreshInterval_Secs,query);
    if (!data) {
      return <Loading />;
    }
    return <>A fox jumped {data}</>;
  } 
  
  function C5(props: IProps){
    const refreshInterval_Secs = 30;
    const query = genQuery(props.timeRange, "c5", Math.random());
    const {data} = useData(refreshInterval_Secs,query);
    
    if (!data) {
      return <Loading />;
    }
    return <>{data} is king</>;
  }
  
  const Test = () => {
    const timeRange = "TimeRange"
    return (
      <>
        <C1 timeRange={timeRange} />
        <br/>
        <C2 timeRange={timeRange} />
        <br/>
        <C3 timeRange={timeRange} />
        <br/>
        <C4 timeRange={timeRange} />
        <br/>
        <C5 timeRange={timeRange} />
        <br/>
        
      </>
    )
  }
  
  export default Test