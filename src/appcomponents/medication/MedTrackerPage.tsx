import * as React from "react";
import BasicPage, {Props as PageProps} from '../../components/BasicPage';
import MedicationsList from '../../containers/MedicationsList';
import {AppPageInterface} from '../../components/AppTheme'
export interface Props extends PageProps {
  appPage: AppPageInterface;
}

export interface State {

}
export default class MedTrackerPage extends React.Component<Props, State>{
  
  handleOnComplete = () => {
    this.props.appPage.sendMessage("Info Saved");
  }

  render(){

    const {appBarTitle,page,title,replaceContent,restoreContent} = this.props

    return <BasicPage restoreContent={restoreContent} replaceContent={replaceContent}  appBarTitle={appBarTitle} page={page} title={title}>
              <MedicationsList pageView={true} onComplete={this.handleOnComplete} step={1} />
            </BasicPage>;
  }
}