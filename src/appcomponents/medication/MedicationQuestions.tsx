import * as React from "react";
import RaisedButton from 'material-ui/RaisedButton';

export interface Props {
  setMedicationStatus(status: number): void;
  skipEditor(): void;
}

export interface State {
  step: number;
}
export default class MedicationQuestions extends React.Component<Props, State>{

  constructor(props){
    super(props);
    this.state = {
      step: 0
    }
  }

  nextStep = () => {
    this.moveToStep(this.state.step + 1);
  }

  moveToStep = (step) => {
    this.setState({
      step: step
    });
  }
  prevStep = () => {
    this.moveToStep(this.state.step - 1);
  }

  handleMedicationStatus  = (status: number) => {
    const {setMedicationStatus,skipEditor} = this.props;
    return (event) => {
      setMedicationStatus(status);
      if(status === 1){
          skipEditor();
      }
    }
  }


  render(){

    const {step} = this.state;

    const question1 = <div>
                          <h3>Are you taking any medications?</h3>
                          <RaisedButton label="Yes" onTouchTap={() => this.moveToStep(1)}/>
                          &nbsp;&nbsp;
                          <RaisedButton label="No" onTouchTap={this.handleMedicationStatus(1)} />
                      </div>;

    const question2 = <div>
                          <h3>Do you understand what your medications are for?</h3>
                          <RaisedButton label="Yes" onTouchTap={this.handleMedicationStatus(2)} />
                          &nbsp;&nbsp;
                          <RaisedButton label="No" onTouchTap={this.handleMedicationStatus(3)} />
                      </div>;

    return <div style={{padding: '5px'}}>
              <h2>Please answer a couple questions about your medications</h2>
              {question1}
              {step === 1 && question2}
           </div>;
  }
}