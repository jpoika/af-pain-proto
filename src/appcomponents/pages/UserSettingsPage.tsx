import * as React from "react";
import BasicPage, {Props as PageProps} from '../../components/BasicPage';
import Form, {Props as FormProps}  from '../AccountForm';
import {AssessmentInterface} from '../../res/data/assessments';
export interface Props extends PageProps, FormProps{
  initialAssessment: AssessmentInterface;
  validate: (data: any, assessment: AssessmentInterface) => {isValid: boolean, errors: any};
}
export default class AccountPage extends React.Component<Props, any>{
  handleValidate = (data) => {
    const {initialAssessment,validate} = this.props;
    return validate(data,initialAssessment);
  }
  render(){

    const {appBarTitle,page,title,genders,savedAccount,restoreContent,replaceContent} = this.props

    return <BasicPage restoreContent={restoreContent} replaceContent={replaceContent} appBarTitle={appBarTitle} page={page} title={title}>

             <Form validate={this.handleValidate} savedAccount={savedAccount} genders={genders}  />
                    
            </BasicPage>;
  }
}
