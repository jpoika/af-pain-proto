import * as React from "react";
import BasicPage, {Props as PageProps} from '../../components/BasicPage';
import {MedicationInterface} from '../../res/data/medication';
import {AssessmentInterface} from '../../res/data/assessments';
import {AppPageInterface} from '../../components/AppTheme';
import BackButton from '../../components/BackButton';
import FlatButton from 'material-ui/FlatButton';
import PersonIcon from 'material-ui/svg-icons/social/person';
export interface Props extends PageProps{
  medications: MedicationInterface[]
  incompleteAssessment: AssessmentInterface;
  appPage: AppPageInterface;
  alertNurse: () => void;
}

const medicationInfoItem = (med: MedicationInterface): React.ReactElement<any> => {
  return <div key={med.id}>
    <div style={{fontWeight: 'bolder'}}>{med.name}</div>
    {med.info.map((para,i) => <div key={i} style={{padding: '5px 5px 5px 5px'}}>{para}</div>)}
  </div>
}


export default class Medication extends React.Component<Props, any>{
  componentWillMount(){
    const {incompleteAssessment,appPage} = this.props;
    if(incompleteAssessment){

      const path = incompleteAssessment.id === 1 ? '/main/assessment-start' : '/main/reassess';
      appPage.setMainIcon(<BackButton path={path} />);
      appPage.setTitlePath(path);
    }
  }
  handleAlertNurse = (event) => {
    const {alertNurse} = this.props;
    event.preventDefault();
    event.stopPropagation();
    alertNurse();
  }
  render(){

    const {appBarTitle,page,title,replaceContent,restoreContent,medications} = this.props

    return <BasicPage restoreContent={restoreContent} replaceContent={replaceContent} appBarTitle={appBarTitle} page={page} title={title}>
             <div  style={{padding: '5px 5px 25px 5px'}}>
               <h3>Medications information</h3>
               If you have any questions about your medications not answered
               by the information below please 
               &nbsp; &nbsp;
               <FlatButton style={{width: '120px',color: '#ffffff',backgroundColor: '#4caf50'}} onTouchTap={this.handleAlertNurse} secondary={true} icon={<PersonIcon />} >
                 Alert the Nurse
              </FlatButton>
             </div>
             {medications.map(med => {
               return medicationInfoItem(med)
             })} 

           </BasicPage>;
  }
}