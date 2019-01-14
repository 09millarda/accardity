import React, { FunctionComponent } from 'react';

interface IRegressionInfo {
  m: number;
  c: number;
}

const RegressionInfo : FunctionComponent<IRegressionInfo> = (props) => {
  const calculateRegression = (seconds: number): number => {
    return props.m * seconds;
  }

  return (
    <div className="col-12" style={{textAlign: 'center'}}>
      <div className="reportStat">
        <h4>Weekly Trend:</h4><br/>
        <h2 className="muted" style={{fontWeight: 300}}>£{calculateRegression(604800).toFixed(2)}</h2>
      </div>
      <div className="reportStat">
        <h4>Monthly Trend:</h4><br/>
        <h2 className="muted" style={{fontWeight: 300}}>£{calculateRegression(2592000).toFixed(2)}</h2>
      </div>
      <div className="reportStat">
        <h4>Quarterly Trend:</h4><br/>
        <h2 className="muted" style={{fontWeight: 300}}>£{calculateRegression(7776000).toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default RegressionInfo;