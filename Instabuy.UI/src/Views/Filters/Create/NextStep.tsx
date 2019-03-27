import React, { FunctionComponent } from 'react';
import { ContextDispatch, CreateFilterStep } from 'src/App/index';
import history from '../../../App/history';

const NextStep : FunctionComponent<{nextStep: CreateFilterStep, nextPage: string; text: string; dispatch: ContextDispatch}> = (props) => {
  const goToNextStep = () => {
    props.dispatch({
      type: 'SetStep',
      step: props.nextStep
    });
    history.push(props.nextPage);
  };

  return (
    <div className="card-box">
      <button onClick={goToNextStep} className="btn btn-success btn-block" style={{padding: '10px 0px', fontSize: '20px'}}>{props.text}</button>
    </div>
  );
}

export default NextStep;