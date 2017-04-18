import * as React from 'react';
import {MedicationInterface} from '../res/data/medication';
import MedicationItem from '../containers/MedicationItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {topRightButtonStyle} from '../components/commonStyles';

export interface Props{
  medications: MedicationInterface[];
  addMedication(): any;
  step: number;
  onComplete?(): any;
  actions?: JSX.Element;
}

export interface State{

}
export default class MedicationsList extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      step: -1,
      actions: null,
      onComplete: () => {}
  };

  constructor (props) {
    super(props);
  }

  handleAddMedication = (event) => {
    const {addMedication} = this.props;
    addMedication()
  }

  handleSave = (event) => {
    const {onComplete} = this.props;
    onComplete();
  }

  render(){
    const {medications, actions} = this.props;
    let additionalActions = null
    if(actions){
      additionalActions = actions;
    }
    const addButtonText = medications.length > 0  ? 'Add More': 'Add Medication';
    return <div>
              <h1>Medications</h1>
              <h3>Please list any medication you are taking.</h3>
              {medications.map((med) => {
                return <MedicationItem key={med.id} medication={med} />
              })}

              <div style={topRightButtonStyle}>
                <FlatButton secondary={true} type="button" onTouchTap={this.handleAddMedication}>{addButtonText}</FlatButton>
              </div>

              <div style={{clear: 'both'}}>
                <RaisedButton 
                          disableTouchRipple={true}
                          disableFocusRipple={true}
                          primary={true}type="button" onTouchTap={this.handleSave}
                          style={{marginRight: 12}}
                        >{additionalActions ? 'Next' : 'Save'}</RaisedButton>

                {additionalActions}
              </div>

           </div>;
  }
}