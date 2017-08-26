
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
import ExtrasPage from '../containers/pages/ExtrasPage';
import AppSnackBarContainer from 'local-t2-sw-redux/lib/containers/UpdateSnackBar';
import EducationResourcesPage from '../containers/pages/EducationResourcesPage';
import AlertNurseDialog from '../containers/AlertNurseDialog';
import AppSnackBar from './AppSnackBar';
import BackButton from './BackButton';
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

const muiTheme = getMuiTheme({
  palette: {
    textColor: '#000000',
    primary1Color: '#000000',
    primary2Color: '#1b4583',
    primary3Color: '#1b4583'
  },
  appBar: {
    height: 50,
  },
});


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

}

export interface Props {
  setPageTitle(title:string): void;
  alertNurse: () => void;
  history: any;
  flashMessage: {message: string, open: boolean};
}

export interface State {
  screen:{width: number, height: number,orientation: string}
  title: string;
  leftIcon: JSX.Element;
  titlePath: string;
  showProgressIndicator: boolean;
}
class App extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      screen: this.getScreenDimensions(),
      title: props.title,
      leftIcon: <LeftMenuIcon />,
      titlePath: '/',
      showProgressIndicator: false
    }
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
      progressVisible: this.state.showProgressIndicator
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
        title: ''
      };
      extraProps = {...defaultExtra,...extraProps};
      return <Page title={extraProps.title} titlePath={extraProps.titlePath} leftIcon={extraProps.leftIcon} appPage={extraProps.appPage}><Component {...routeProps} {...extraProps} /></Page>;
    }
  }



  render(){
    const {flashMessage} = this.props;
    const homePath = '/main/account-home'
    const iconBackHome = <BackButton path={homePath} />;
    

    return <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar leftIcon={this.state.leftIcon} onTitleClick={this.handleTitleClick} rightIcon={rightNurseIcon(this.props)} />
                <Route exact path="/" render={this.renderRouteComponent(HomePage,{title: 'About Pain Proto'})} />
                <Route exact path="/main/assessment-start" render={this.renderRouteComponent(InitialAssessWizard,{title: 'Assessment'})} />
                <Route exact path="/main/account-home" render={this.renderRouteComponent(AccountHome,{title: 'Dashboard'})} />
                <Route exact path="/main/settings" render={this.renderRouteComponent(AccountEdit,{title: 'Edit Info',leftIcon: iconBackHome, titlePath: homePath})} />
                <Route exact path="/main/settings2" render={this.renderRouteComponent(AccountEdit,{title: 'Edit Info'})} />
                <Route exact path="/main/newpain" render={this.renderRouteComponent(NewPainPage,{title: 'New Pain'})} />
                <Route exact path="/main/mtracker" render={this.renderRouteComponent(MedTrackerPage,{title: 'Med Tracker',leftIcon: iconBackHome, titlePath: homePath})} />
                <Route exact path="/main/reassess" render={this.renderRouteComponent(ReAssessmentPage,{title: 'Reassessment',leftIcon: iconBackHome, titlePath: homePath})} />
                <Route exact path="/main/resources" render={this.renderRouteComponent(EducationResourcesPage,{title: 'Pain Education & Resources'})} />
                <Route exact path="/main/resources/:open" render={this.renderRouteComponent(EducationResourcesPage,{title: 'Pain Education & Resources'})} />
                
                <Route exact path="/main/extras" render={this.renderRouteComponent(ExtrasPage,{title: 'Extras'})} />

                <AppSnackBar {...flashMessage} />
                <AppSnackBarContainer />
                <AlertNurseDialog />
            </div>
          </MuiThemeProvider>;
 
  }
}

export default withRouter(App);
