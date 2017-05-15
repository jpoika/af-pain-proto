import * as React from "react";
import BasicPage, {Props as PageProps} from '../../components/BasicPage';
import MedicationsList from '../../containers/MedicationsList';
export interface Props extends PageProps {

}

export interface State {

}
export default class MedTrackerPage extends React.Component<Props, State>{
  render(){

    const {appBarTitle,page,title} = this.props

    return <BasicPage appBarTitle={appBarTitle} page={page} title={title}>
              <MedicationsList />
            </BasicPage>;
  }
}