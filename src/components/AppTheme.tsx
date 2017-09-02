
import * as React from 'react';
import AppBar from '../containers/AppBar';
//import BackButton from './BackButton';
import PersonIcon from 'material-ui/svg-icons/social/person';
import HomePage from '../containers/Home';
import InitialAssessWizard from '../containers/InitialAssessWizard';
import NewPainPage from '../containers/pages/NewPainPage';
import AccountHome from '../containers/pages/AccountHomePage';
import AccountEdit from '../containers/pages/AccountEditPage';
import MedTrackerPage from '../containers/pages/MedTrackerPage';
import ReAssessmentPage from '../containers/pages/ReAssessmentPage';
import AssessmentOverviewPage from '../containers/pages/AssessmentOverviewPage'
import ExtrasPage from '../containers/pages/ExtrasPage';
import AppSnackBarContainer from 'local-t2-sw-redux/lib/containers/UpdateSnackBar';
import EducationResourcesPage from '../containers/pages/EducationResourcesPage';
import AlertNurseDialog from '../containers/AlertNurseDialog';
import AppSnackBar from './AppSnackBar';
import BackButton from './BackButton';
import siteTheme from './customTheme';
import Redirector from '../containers/Redirector';
//import HomeFooter from './HomeFooter';
// import EulaDialog from '../containers/Eula';

import LeftMenuIcon from '../containers/MainLeftIcon';
import { Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {withRouter} from 'react-router-dom';
import Page from '../Containers/Page';
import FlatButton from 'material-ui/FlatButton';
// import SnackbarGlobal from '../containers/SnackbarGlobal';
// import LinearProgress from 'material-ui/LinearProgress';
//import {homeFooterDefault, homeFooterAbsolute} from './commonStyles';
const muiTheme = getMuiTheme(siteTheme);

const styles = {
  bgDiv: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'url(' + require('../res/images/usaf_logo.png') + ') center center',
    opacity: 0.1,
    width: '100%',
    height: '100%',
    zIndex: -2,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '400px'
  },
  wrapper: {
    overflowY: 'auto'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row',
    height: '100%'
  },
};

const rightNurseIcon = (props) => {
  const {alertNurse} = props;
  const handleAlertNurse = (event) => {
    event.preventDefault();
    event.stopPropagation();
    alertNurse();
  }
  return (<FlatButton style={{width: '120px',color: '#ffffff',backgroundColor: 'red'}} onTouchTap={handleAlertNurse} secondary={true} icon={<PersonIcon />} >
           Alert Nurse
          </FlatButton>);
};


export interface AppPageInterface {
  screen:{width: number, height: number, orientation: string};
  setMainIcon(icon: JSX.Element): void;
  setPageTitle(title:string): void;
  setTitlePath(titlePath:string):void;
  history: any;
  showProgress: (to_ms?: number) => void;
  hideProgress: () => void;
  navigateProgress: (path: string,to_ms?: number) => void;
  progressVisible: boolean;
  // replaceContent: (altContent: JSX.Element) => void;
  // restoreContent: () => void;
  sendMessage: (message: string) => void;
}

export interface Props {
  setPageTitle(title:string): void;
  alertNurse: () => void;
  history: any;
  flashMessage: {message: string, open: boolean};
  sendMessage: (message: string) => void;
}

export interface State {
  screen:{width: number, height: number,orientation: string}
  title: string;
  leftIcon: JSX.Element;
  titlePath: string;
  showProgressIndicator: boolean;
  showAltContent: boolean;
  altContent: JSX.Element;
}
class App extends React.Component<Props, State>{

  public altContentTimeoutId: any;

  constructor(props){
    super(props);
    this.state = {
      screen: this.getScreenDimensions(),
      title: props.title,
      leftIcon: <LeftMenuIcon />,
      titlePath: '/',
      showProgressIndicator: false,
      showAltContent: false,
      altContent: null
    }
  }

  handleReplaceContent = (altContent: any) => {
    if(altContent){
      this.setState({
        showAltContent: true,
        altContent
      });
    }

    this.altContentTimeoutId = setTimeout(() => {
                                  this.handleRestoreContent();
                                  clearTimeout(this.altContentTimeoutId)
                                }, 20000);
  }
  handleRestoreContent = () => {
      clearTimeout(this.altContentTimeoutId)
      this.setState({
        showAltContent: false,
        altContent: null
      });
  }
  handleSetMainIcon = (leftIcon: JSX.Element) => {
    this.setState({leftIcon})
  }

  handleSetTitlePath = (titlePath: string) => {
    this.setState({titlePath})
  }

  handleTitleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const {history} = this.props;
    const {titlePath} = this.state;
    history.push(titlePath);
  }

  handleNavigationProgress = (path,to_ms = 2000) => {
    this.handleShowProgress(to_ms);
    const {history} = this.props;

    history.push(path);
    
  }

  handleSendMessage = (message: string) => {
    this.props.sendMessage(message);
  }

  handleShowProgress = (to_ms = 2000) => {
    this.setState({
      showProgressIndicator: true,
    });
    const progTo = setTimeout(
      () => {
        clearTimeout(progTo );
        this.handleHideProgress();
      },to_ms);
  }

  handleHideProgress = () => {
    this.setState({
      showProgressIndicator: false,
    })
  }


  getAppPageObject = ():AppPageInterface => {
    const {setPageTitle,history} = this.props;
    return {
      screen: this.state.screen,
      setMainIcon: this.handleSetMainIcon,
      setPageTitle,
      history,
      setTitlePath: this.handleSetTitlePath,
      showProgress: this.handleShowProgress,
      hideProgress: this.handleHideProgress,
      navigateProgress: this.handleNavigationProgress,
      progressVisible: this.state.showProgressIndicator,
      sendMessage: this.handleSendMessage
      // replaceContent: this.handleReplaceContent,
      // restoreContent: this.handleRestoreContent
    }
  }

  componentDidMount(){
    this.handlePageResize();
  }

  getScreenDimensions = () => {
    const orientation = window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait';
 
    return {
       width: window.innerWidth,
       height: window.innerHeight,
       orientation
    }
  }

  hasScreenChanged = () => {
    const {width, height} = this.state.screen;
    const currentDims = this.getScreenDimensions();

    if(width !== currentDims.width){
      return true;
    }
    if(height !== currentDims.height){
      return true;
    }
    return false;
  }

  handlePageResize = () => {
    let resizeTimeoutId = null;
    window.onresize = () => {
       if(resizeTimeoutId){
         clearTimeout(resizeTimeoutId);
       }

       if(this.hasScreenChanged()){

         resizeTimeoutId = setTimeout(
                () => {
                  
                 this.setState({
                   screen: this.getScreenDimensions()
                 }); 
                  
                },
              500);
       }

      
    }
  }

  renderRouteComponent = (Component,extraProps:any = {}) => {
    return (routeProps) => {
      const defaultExtra = {
        leftIcon: <LeftMenuIcon />,
        appPage: this.getAppPageObject(),
        titlePath: "/",
        title: '',
        replaceContent: this.handleReplaceContent,
        restoreContent: this.handleRestoreContent
      };
      extraProps = {...defaultExtra,...extraProps};
      return <Page title={extraProps.title} titlePath={extraProps.titlePath} leftIcon={extraProps.leftIcon} appPage={extraProps.appPage}><Component {...routeProps} {...extraProps} /></Page>;
    }
  }



  render(){
    const {flashMessage} = this.props;
    const homePath = '/main/account-home'
    const iconBackHome = <BackButton path={homePath} />;
    
    if(this.state.showAltContent){
      return <MuiThemeProvider muiTheme={muiTheme}>{this.state.altContent}</MuiThemeProvider>
    }

    return <MuiThemeProvider muiTheme={muiTheme}>

            <div>
                <Redirector />
                <div style={styles.bgDiv as any} />
                <AppBar leftIcon={this.state.leftIcon} onTitleClick={this.handleTitleClick} rightIcon={rightNurseIcon(this.props)} />

                <Route exact path="/main/assessment-start" render={this.renderRouteComponent(InitialAssessWizard,{title: 'Assessment'})} />
                <Route exact path="/main/newpain" render={this.renderRouteComponent(NewPainPage,{title: 'New Pain'})} />
                <div  style={{padding: 10}}>
                  <Route exact path="/" render={this.renderRouteComponent(HomePage,{title: 'About Pain Proto'})} />

                  <Route exact path="/main/account-home" render={this.renderRouteComponent(AccountHome,{title: 'Dashboard'})} />
                  <Route exact path="/main/assess-overview/:id" render={this.renderRouteComponent(AssessmentOverviewPage,{title: 'Overview',leftIcon: iconBackHome, titlePath: homePath})} />
                  <Route exact path="/main/settings" render={this.renderRouteComponent(AccountEdit,{title: 'Edit Info',leftIcon: iconBackHome, titlePath: homePath})} />
                  <Route exact path="/main/settings2" render={this.renderRouteComponent(AccountEdit,{title: 'Edit Info'})} />
                  
                  <Route exact path="/main/mtracker" render={this.renderRouteComponent(MedTrackerPage,{title: 'Med Tracker',leftIcon: iconBackHome, titlePath: homePath})} />
                  <Route exact path="/main/reassess" render={this.renderRouteComponent(ReAssessmentPage,{title: 'Reassessment',leftIcon: iconBackHome, titlePath: homePath})} />
                  <Route exact path="/main/resources" render={this.renderRouteComponent(EducationResourcesPage,{title: 'Pain Education & Resources'})} />
                  <Route exact path="/main/resources/:open" render={this.renderRouteComponent(EducationResourcesPage,{title: 'Pain Education & Resources'})} />
                  
                  <Route exact path="/main/extras" render={this.renderRouteComponent(ExtrasPage,{title: 'Extras'})} />
                </div>
                <AppSnackBar {...flashMessage} />
                <AppSnackBarContainer />
                <AlertNurseDialog />
            </div>
          </MuiThemeProvider>;
 
  }
}

export default withRouter(App);
