import * as React from 'react';
import {MedicationInterface} from '../../res/data/medication';
//import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import {floatParentRowStyle, buttonBasic} from '../../components/commonStyles';
import MedicationChoiceEdit from './MedicationChoiceEdit';
export interface Props{
  medication: MedicationInterface;
  newMedicationChoice: MedicationInterface;
  addMedicationChoice: (medication: MedicationInterface) => void;
  update(medication: MedicationInterface): any;
  deleteItem(medicationId: number): any;
  cancelItem(): void;
  sendMessage: (msg: string) => void;
  validate(data: MedicationInterface): any;
  onSave?(medication: MedicationInterface): any;
  routes: {id: number, name: string, description: string}[];
  amountUnits: {id: number, name: string, description: string}[];
  frequencyUnits: string[];
  medicationchoices: MedicationInterface[];
}

export interface State{
  values: any;
  errors: any;
  mode: number; //0 view 1//edit
  showCreateMedication: boolean;
}

function normalizeValues(medication: MedicationInterface){
  let medValues = {...medication};
  //delete medValues[medication.id];
  return medValues;
}

function normalizeErrors(medication: MedicationInterface){
  let medValues = {...medication};
  delete medValues[medication.id];
  let blankOb = Object.keys(medication).reduce((acc,propName) => {
    acc[propName] = ''
    return acc;
  }, {});
  delete blankOb[medication.id];

  return blankOb;
}

export default class MedicationItem extends React.Component<Props, State>{
 public static defaultProps: Partial<Props> = {
      onSave: () => {}
  };
  constructor (props) {
    super(props);

    this.state = {
      values: normalizeValues(this.props.medication),
      errors: normalizeErrors(this.props.medication),
      mode: this.props.medication.name ? 1 : 0,
      showCreateMedication: false
    };
  }

  handleDelete = (event) => {
    const {deleteItem,medication} = this.props;
    deleteItem(medication.id);
  }

  handleCancel = (event) => {
    const {cancelItem} = this.props;
    cancelItem();
  }

  handleUpdate = (data) => {
    //const {deleteItem,medication} = this.props;
    //deleteItem(medication.id);
  }
  handleChange = (event) => {
   
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      values: {...this.state.values,[name]: value},
      errors: {...this.state.errors,[name]: ''}
    } as any);
  }

  handleSubmit = (event) => {
    const {validate,update,onSave} = this.props;
 
    const result = validate(this.state.values);
   
    if(!result.isValid){
      this.setState({
        errors: result.errors
      });
    }else{
      onSave(this.state.values);
      update(this.state.values);
    }
    
    event.preventDefault();
  }

  handleSelectChange = (valueName) => {
    return (event,key,payload) => {
      console.log(valueName,key,payload);
      if(payload !== 'other_medication'){
        this.setState({
          values: {...this.state.values,[valueName]: payload},
          errors: {...this.state.errors,[valueName]: ''}
        } as any);
      } else {
        this.showCreateMedication();
      }
    }
  }

  showCreateMedication = () => {
    
    this.setState({
      showCreateMedication: true
    });
  }

  hideCreateMedication = () => {
    this.setState({
      showCreateMedication: false
    });
  }

  handleOtherMedication = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  handleMedicationChoiceEdit = (medication: MedicationInterface) => {
    const {addMedicationChoice} = this.props;
    addMedicationChoice(medication);
   
    this.hideCreateMedication();
    this.setState({
      values: {...this.state.values,'medicationId': medication.id}
    });
    if(medication.id){
      this.props.sendMessage("Medication Added");
    }
  }

  render(){
    const {medication,routes,medicationchoices,newMedicationChoice} = this.props;
    const {values,errors, showCreateMedication} = this.state;
    return <Paper style={{padding: '5px', width: '97%',marginBottom: '15px',marginLeft: '10px'}}>
            <form onSubmit={this.handleSubmit}>
            <div>
              <SelectField
                floatingLabelText="Intake Method"
                errorText={this.state.errors.routeId} 
                value={values.routeId}
                onChange={this.handleSelectChange('routeId')}
                floatingLabelStyle={{color: '#3A7BAD'}}
              >
                {routes.map((ru) => {
                  return <MenuItem key={ru.id} value={ru.id} primaryText={ru.name} />
                })}
                
              </SelectField>
            </div>
            <div>
              {!showCreateMedication && <SelectField
                floatingLabelText="Medication name"
                errorText={errors.medicationId} 
                value={values.medicationId}
                floatingLabelStyle={{color: '#3A7BAD'}}
                onChange={this.handleSelectChange('medicationId')}
                fullWidth={true}
              >
                {medicationchoices.map((med) => {
                  return <MenuItem key={med.id} value={med.id} primaryText={med.name} />
                })}
                <MenuItem  rightIcon={<AddIcon color={'green'} />} key={'other_medication'} value={'other_medication'} primaryText={"Other"} />
              </SelectField>}
            </div>
            <div>
              {showCreateMedication && <MedicationChoiceEdit onSave={this.handleMedicationChoiceEdit} onCancel={this.hideCreateMedication} medicationChoice={newMedicationChoice} />}
            </div>
            <div style={floatParentRowStyle as any}>
              <div style={buttonBasic}>
                <RaisedButton primary={true} type="submit">Save</RaisedButton>
              </div>
              <div style={buttonBasic}>
                <RaisedButton onTouchTap={this.handleCancel}>Cancel</RaisedButton>
              </div>
              {!!medication.id && <div style={buttonBasic}>
                <RaisedButton onTouchTap={this.handleDelete}>Delete</RaisedButton>
              </div>}
            </div>
            </form>
          </Paper>
              
  }
}