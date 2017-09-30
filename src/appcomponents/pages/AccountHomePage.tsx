import * as React from "react";
import BasicPage, {Props as PageProps} from '../../components/BasicPage';
import NewPainButton from '../../containers/pain/inputs/NewPainButton';
import AssessmentList from '../../containers/assessment/AssessmentList';
import UserOverview from '../../containers/user/UserOverview';
import MedicationList from '../../containers/medication/MedicationListShow';
import UserTasks from '../../containers/user/UserTasks';
import {AppPageInterface} from '../../components/AppTheme'

export interface Props extends PageProps{
 initAssessComplete: boolean;
 haveUserInfo: boolean;
 viewPortSize: string;
 appPage: AppPageInterface
}

export interface State{
  confirmOpen: boolean;
}

const styles = {
  appActionContainer: {

    position: 'fixed',
    bottom: 10,
    right: 10,
    margin: '0 auto'
  }
}

export default class AccountHomePage extends React.Component<Props, State> {


  render(){
    
    const {appBarTitle,appPage, page,title,restoreContent,replaceContent,viewPortSize,haveUserInfo} = this.props;

    const leftStyles = viewPortSize === 'large' ? {width: '50%',float: 'left',paddingRight:'20px'} : {width: '100%'};
    const rightStyles = viewPortSize === 'large' ? {width: '50%',float: 'left',paddingLeft:'20px'} : {width: '100%'};
    const childViewPort = [{small: {width: '100%'}},{large: {width: '100%'}}];

    return (<BasicPage restoreContent={restoreContent} replaceContent={replaceContent} appBarTitle={appBarTitle} page={page} title={title}>
             <div style={{position: 'relative'}}>
                   <div style={leftStyles}>
                     {haveUserInfo && <UserOverview viewPort={childViewPort} />}
                     <AssessmentList appPage={appPage} />
                 
                  
                   </div>
                   <div style={rightStyles}>
                      <UserTasks viewPort={childViewPort} />
                      <MedicationList viewPort={childViewPort} />

                      
                   </div>
                   <NewPainButton style={styles.appActionContainer as any} />
                 
              </div>
            </BasicPage>);
  }
}
