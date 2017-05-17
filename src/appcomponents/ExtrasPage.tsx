import * as React from "react";
import BasicPage, {Props as PageProps} from '../components/BasicPage';
export interface Props extends PageProps{

}

export default class AccountPage extends React.Component<Props, any>{
  render(){

    const {appBarTitle,page,title} = this.props

    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>

                <h1>Comming Soon</h1>
                    
           </BasicPage>;
  }
}