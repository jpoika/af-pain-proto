import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import LoginForm, {Props as LoginProps}  from './LoginForm';
export interface Props extends PageProps, LoginProps{

}
export default class LoginPage extends React.Component<Props, any>{
  render(){

    const {appBarTitle,page,title,onCancelClick} = this.props

    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>

                    <LoginForm onCancelClick={onCancelClick} />
                    
            </BasicPage>;
  }
}
