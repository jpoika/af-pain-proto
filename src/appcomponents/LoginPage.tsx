import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
import LoginForm, {Props as LoginProps}  from './LoginForm';
export interface Props extends PageProps, LoginProps{

}
export default class LoginPage extends React.Component<Props, any>{
  render(){

    const {appBarTitle,page,title,onCancelClick,validate} = this.props

    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>

                  <h3>TODO</h3>
                    
            </BasicPage>;
  }
}
