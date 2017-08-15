import * as React from "react";
import BasicPage, {Props as PageProps} from './BasicPage';
import CardContent, {Props as CardProps}  from './CardContent';
export interface Props extends PageProps, CardProps{
  actionClick: (path: string) => void;
}
export default class CardPage extends React.Component<Props, any>{
  render(){

    const {appBarTitle,page,title,image, actions,replaceContent,restoreContent,actionClick} = this.props

    return <BasicPage restoreContent={restoreContent} replaceContent={replaceContent} appBarTitle={appBarTitle} page={page} title={title}>

                    <CardContent actionClick={actionClick} content={page} image={image} actions={actions} />
                    
            </BasicPage>;
  }
}
