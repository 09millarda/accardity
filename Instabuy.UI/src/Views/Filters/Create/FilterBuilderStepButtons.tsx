import React, { PureComponent } from "react";
import { ContextDispatch } from 'src/App/index';

interface IInheritedProps {
  dispatch: ContextDispatch;
  step: number;
}

class FilterBuilderStepButtons extends PureComponent<IInheritedProps> {
  public render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card-box">
            <h4 className="m-t-0 header-title">History Controller</h4>
            <hr/>
            <div className="row">
              <div style={{padding: '0px 10px'}}>
                <div className="btn-group">
                  <button onClick={this.goBack} className="btn btn-info" disabled={this.props.step <= 2}>{'[<]'} Back</button>
                </div>                
                <button style={{marginLeft: '20px'}} onClick={this.restartFilterBuilder} className="btn btn-danger pull-right">RESTART</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private goBack = () => {
    this.props.dispatch({
      type: 'STEP_BACK'
    });
  }

  private restartFilterBuilder = () => {
    this.props.dispatch({
      type: 'ResetAll'
    });
  }
}

export default FilterBuilderStepButtons;