import * as React from 'react';
import MedicationManager from '../../containers/medication/MedicationManager';

import RaisedButton from 'material-ui/RaisedButton';



export interface Props{
  setMedicationStatus(status: number): void;
  step: number;
  onComplete?(): any;
  actions?: JSX.Element;
  understands_meds: number; //understands_meds
  pageView: boolean;
}

export interface State{
  step: number;
}

export default class MedicationsList extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      step: 0,
      actions: null,
      onComplete: () => {},
      pageView: false
  };

  constructor (props) {
    super(props);
    this.state = {
      step: this.props.step
    }
  }

  moveToStep = (step) => {
    this.setState({
      step: step
    });
  }

  handleMedicationStatus  = (status: number) => {
    const {setMedicationStatus, onComplete} = this.props;
    return (event) => {
      setMedicationStatus(status);
      if(status >= 1){
         onComplete();
      }
    }
  }

  handleSave = (event) => {
    const {onComplete} = this.props;
    onComplete();
  }

  render(){
      const {actions} = this.props;
    let additionalActions = null
    if(actions){
      additionalActions = actions;
    }
    
      const question1 = <div>
                            <h3>Are you taking any medications?</h3>
                            <RaisedButton label="Yes" onTouchTap={() => this.moveToStep(1)}/>
                            &nbsp;&nbsp;
                            <RaisedButton label="No" onTouchTap={this.handleMedicationStatus(1)} />
                            &nbsp;&nbsp;
                            {actions}
                        </div>;

      const questionMedsUnderstand = <div>
                            <h3>Would you like more information on any of your medications?</h3>
                            <RaisedButton label="Yes" onTouchTap={this.handleMedicationStatus(2)} />
                            &nbsp;&nbsp;
                            <RaisedButton label="No" onTouchTap={this.handleMedicationStatus(3)} />
                            &nbsp;&nbsp;
                            {!this.props.pageView && <RaisedButton label="Back" onTouchTap={() => this.moveToStep(1)} />}
                          </div>;

      if(this.state.step === 0){
        return  <div>
                {question1}
             </div>;
      }
      if(this.state.step === 1){
        return <div>
                  <MedicationManager />
                  <div>
                      <RaisedButton label="Next" onTouchTap={() => this.moveToStep(2)} />
                      &nbsp;&nbsp;
                      <RaisedButton label="Back" onTouchTap={() => this.moveToStep(0)} />
                   </div>
               </div>;
      }
      if(this.state.step === 2){
        return  <div>
                {questionMedsUnderstand}
               {/* !additionalActions && <div style={{clear: 'both'}}>
                <RaisedButton 
                          disableTouchRipple={true}
                          disableFocusRipple={true}
                          primary={true} type="button" onTouchTap={this.handleSave}
                          style={{marginRight: 12}}
                        >{additionalActions ? 'Next' : 'Save'}
                </RaisedButton>

                {additionalActions}
              </div> */}
             </div>;
      }
  }
}