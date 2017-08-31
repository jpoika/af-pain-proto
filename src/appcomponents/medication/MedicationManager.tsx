import * as React from 'react';
import {MedicationInterface} from '../../res/data/medication';
import MedicationItemEdit from '../../containers/MedicationItemEdit';
//import MedicationQuestions from '../../appcomponents/medication/MedicationQuestions';
import MedicationItemView from './MedicationItemView';
//import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import ChipSvgIcon from 'material-ui/svg-icons/content/add-circle';
import {makeMedication} from '../../res/data/medication';
const styles = {
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: '20px'
  },
};

export interface Props{
  medications: MedicationInterface[];
  addMedication(): any;
  deleteMedication(medicationId: number): any;
  onComplete?(): any;
  actions?: JSX.Element;
  activeEdit?:MedicationInterface;
}

export interface State{
  activeEdit: MedicationInterface;
}
export default class MedicationManager extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
      actions: null,
      onComplete: () => {},
      activeEdit: null
  };

  constructor (props) {
    super(props);
    this.state = {
      activeEdit: props.activeEdit
    }
  }

  handleAddMedication = (event) => {
    this.setState({
      activeEdit: makeMedication(0,'')
    });
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

  handleCancelItem = () => {
    this.setState({
      activeEdit: null
    });
  }

  handleItemSave = (medication: MedicationInterface) => {
    this.setState({
      activeEdit: null
    });
  }

  render(){
    const {medications} = this.props;

    const addButtonText = medications.length > 0  ? 'Add Another': 'Add Medication';

    return <div>
              <h1>Medications</h1>
              <h3>Please list any medication you are taking.</h3>
              <div style={styles.wrapper as any}>
               
                {medications.map((med) => {
                  return <MedicationItemView key={med.id} onDelete={this.handleDeleteItem}  onSelect={this.handleMedicationSelect} medication={med} />
                })}
              
                
                {!this.state.activeEdit && <Chip
                    onTouchTap={this.handleAddMedication}
                    style={{backgroundColor: '#3A7BAD',margin: 4}}
                  >
                  <Avatar icon={<ChipSvgIcon />} />
                  {addButtonText}
                </Chip>}
              
              </div>
              {this.state.activeEdit && <MedicationItemEdit onSave={this.handleItemSave} cancelItem={this.handleCancelItem} deleteItem={this.handleDeleteItem} medication={this.state.activeEdit} />}

           </div>;
  }
}