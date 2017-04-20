import * as React from 'react';
import {MedicationInterface} from '../res/data/medication';
import MedicationItemEdit from '../containers/MedicationItemEdit';
import MedicationItemView from '../appcomponents/MedicationItemView';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {topRightButtonStyle} from '../components/commonStyles';
const styles = {

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};
export interface Props{
  medications: MedicationInterface[];
  addMedication(): any;
  step: number;
  deleteMedication(medicationId: number): any;
  onComplete?(): any;
  actions?: JSX.Element;
}

export interface State{
  activeEdit: MedicationInterface;
}
export default class MedicationsList extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      step: -1,
      actions: null,
      onComplete: () => {}
  };

  constructor (props) {
    super(props);
    this.state = {
      activeEdit: null
    }
    this.setLastMedToEditIfEmpty(this.props.medications);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.medications.length > this.props.medications.length){
      this.setLastMedToEditIfEmpty(nextProps.medications);
    }
  }

  setLastMedToEditIfEmpty = (medications) => {
    if(medications.length){
       const lastAdded = medications.map(i => i).pop();
       if(lastAdded && !lastAdded.name){ //if it's a new medication with no name assume user wants to edit it
          this.state = {
            activeEdit: lastAdded
          }
       }
    }
  }

  handleAddMedication = (event) => {
    const {addMedication} = this.props;
    addMedication()
  }

  handleMedicationSelect = (medication: MedicationInterface) => {
    this.setState({
      activeEdit: medication
    });
  }
  handleDeleteItem = (medicationId: number) => {
    const {deleteMedication} = this.props;
    deleteMedication(medicationId)
    this.setState({
      activeEdit: null
    });
  }
  handleItemSave = (medication: MedicationInterface) => {
    this.setState({
      activeEdit: null
    });
  }

  handleSave = (event) => {
    const {onComplete} = this.props;
    onComplete();
  }

  render(){
    const {medications, actions, deleteMedication} = this.props;
    let additionalActions = null
    if(actions){
      additionalActions = actions;
    }
    const addButtonText = medications.length > 0  ? 'Add More': 'Add Medication';
    return <div>
              <h1>Medications</h1>
              <h3>Please list any medication you are taking.</h3>
              <div style={styles.wrapper as any}>
                {medications.map((med) => {
                  return <MedicationItemView key={med.id} onDelete={this.handleDeleteItem}  onSelect={this.handleMedicationSelect} medication={med} />
                })}
              </div>
              {this.state.activeEdit && <MedicationItemEdit onSave={this.handleItemSave} deleteItem={this.handleDeleteItem} medication={this.state.activeEdit} />}
              <div>
                <FlatButton disabled={!!this.state.activeEdit} style={topRightButtonStyle} secondary={true} type="button" onTouchTap={this.handleAddMedication}>{addButtonText}</FlatButton>
              </div>

              <div style={{clear: 'both'}}>
                <RaisedButton 
                          disableTouchRipple={true}
                          disableFocusRipple={true}
                          primary={true} type="button" onTouchTap={this.handleSave}
                          style={{marginRight: 12}}
                        >{additionalActions ? 'Next' : 'Save'}</RaisedButton>

                {additionalActions}
              </div>

           </div>;
  }
}