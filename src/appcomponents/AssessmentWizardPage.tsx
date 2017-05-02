import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import MainAssessmentWizardContainer from '../containers/MainAssessmentWizard';

export interface Props extends PageProps{
  type: string;
}

export interface State {

}

export default class AssessmentWizardPage extends React.Component<Props, State>{
  render(){
    const {appBarTitle,page,title,type} = this.props
    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>
              <MainAssessmentWizardContainer type={type} />
           </BasicPage>
  }
}







