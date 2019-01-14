import React, { FunctionComponent } from 'react';
import { ContextDispatch, IFilterCreateRefinedFilter } from 'src/App/index';

interface ISdMultiplierSelectorInheritedProps {
  filterInfo: IFilterCreateRefinedFilter;
  dispatch: ContextDispatch;
}

type SdMultiplierProps = ISdMultiplierSelectorInheritedProps;

const SdMultiplierSelector: FunctionComponent<SdMultiplierProps> = (props) => {
  const updateMultiplier = (val: string) => props.dispatch({
    type: 'SetSdMultiplier',
    sdMultiplier: val.length === 0 ? 0 : parseFloat(val)
  });
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => updateMultiplier(e.target.value);
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.keyCode === 13) {
      updateMultiplier(target.value);
    }
  }

  const validItems = props.filterInfo.statisticalData.items.length;
  const totalItems = props.filterInfo.responseItems.length;

  return (
    <div className="row">
      <div className="col-12">
        <h4>Standard Deviation: <span style={{color: '#ddd'}}>± £{props.filterInfo.statisticalData.sd}</span></h4>
        <input className="form-control" type="number" onBlur={onBlur} onKeyDown={onEnter} min={0} max={5} step={0.01} style={{width: '70px', display: 'inline-block'}} defaultValue="1.5" />
        <p style={{marginTop: '7px'}}>{validItems} of {totalItems} items ({((validItems / totalItems) * 100).toFixed(2)}%)</p>
      </div>
    </div>
  );
};

export default SdMultiplierSelector;