import * as React from "react";
import BasicPage, {Props as PageProps} from '../../components/BasicPage';
import {MedicationInterface} from '../../res/data/medication';
import {AssessmentInterface} from '../../res/data/assessments';
import {AppPageInterface} from '../../components/AppTheme';
import BackButton from '../../components/BackButton';
export interface Props extends PageProps{
  medications: MedicationInterface[]
  incompleteAssessment: AssessmentInterface;
  appPage: AppPageInterface;
}

const medicationInfoItem = (med: MedicationInterface): React.ReactElement<any> => {
  return <div key={med.id}>
    <div style={{fontWeight: 'bolder'}}>{med.name}</div>
    {med.info.map((para,i) => <div key={i} style={{padding: '5px 0px 5px 0px'}}>{para}</div>)}
  </div>
}


export default class Medication extends React.Component<Props, any>{
  componentWillMount(){
    const {incompleteAssessment,appPage} = this.props;
    console.log();
    if(incompleteAssessment){

      const path = incompleteAssessment.id === 1 ? '/main/assessment-start' : '/main/reassess';
      appPage.setMainIcon(<BackButton path={path} />);
      appPage.setTitlePath(path);
    }
  }

  render(){

    const {appBarTitle,page,title,replaceContent,restoreContent,medications} = this.props

    return <BasicPage restoreContent={restoreContent} replaceContent={replaceContent} appBarTitle={appBarTitle} page={page} title={title}>
             {medications.map(med => {
               return medicationInfoItem(med)
             })} 
           </BasicPage>;
  }
}