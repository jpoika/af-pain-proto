import * as React from "react";
import BasicPage, {Props as PageProps} from './BasicPage';
import CardContent, {Props as CarProps}  from './CardContent';
export interface Props extends PageProps, CarProps{

}
export default class CardPage extends React.Component<Props, any>{
  render(){

    const {appBarTitle,page,title,image, actions} = this.props

    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>

                    <CardContent content={page} image={image} actions={actions} />
                    
            </BasicPage>;
  }
}
