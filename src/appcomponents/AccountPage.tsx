import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import Form, {Props as FormProps}  from './AccountForm';
export interface Props extends PageProps, FormProps{

}
export default class AccountPage extends React.Component<Props, any>{
  render(){

    const {appBarTitle,page,title,validate,genders,savedAccount} = this.props

    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>

             <Form validate={validate} savedAccount={savedAccount} genders={genders}  />
                    
            </BasicPage>;
  }
}
