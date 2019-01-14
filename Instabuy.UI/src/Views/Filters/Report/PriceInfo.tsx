import React, { FunctionComponent } from 'react';

interface IPriceInfoProps {
  meanPrice: number;
  priceMin: number;
  priceMax: number;
}

const PriceInfo : FunctionComponent<IPriceInfoProps> = (props) => {
  return (
    <div className="col-12" style={{textAlign: 'center'}}>
      <div className="reportStat">
        <h4>Mean Price:</h4><br/>
        <h2 className="muted" style={{fontWeight: 300}}>£{props.meanPrice.toFixed(2)}</h2>
      </div>
      <div className="reportStat">
        <h4>Min Price:</h4><br/>
        <h2 className="muted" style={{fontWeight: 300}}>£{props.priceMax.toFixed(2)}</h2>
      </div>
      <div className="reportStat">
        <h4>Max Price:</h4><br/>
        <h2 className="muted" style={{fontWeight: 300}}>£{props.priceMin.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default PriceInfo;