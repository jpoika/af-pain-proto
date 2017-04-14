import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import AccountForm, {Props as AccountProps}  from './AccountForm';
import BodyMap, {Props as BodyMapProps}  from './BodyMap';
export interface Props extends PageProps, AccountProps{
  step: number;
}
export default class InitialAssessmentWizard extends React.Component<Props, any>{
  render(){

    const {appBarTitle,page,title,validate,genders,savedAccount} = this.props

    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>

             <AccountForm validate={validate} savedAccount={savedAccount} genders={genders}  />
             <BodyMap />
          

          </BasicPage>;
  }
}