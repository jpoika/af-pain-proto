/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MenuDrawer from './MenuDrawer';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import Helmet from 'react-helmet';
import AppSnackBarContainer from 'local-t2-sw-redux/lib/containers/UpdateSnackBar';
import AlertNurseDialog from '../containers/AlertNurseDialog';
//import SnackBarNotice from './SnackBarNoticeComponent';
//import AppBarMenuIcon from './AppBarMenuIconDrawer';
import HomeIcon from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {push, replace} from 'react-router-redux';
import AppSnackBar from './AppSnackBar';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import PersionIcon from 'material-ui/svg-icons/social/person';
//import {FlashMessageInterface} from './data/workbook';


//import {userLogin,userLogout} from './actions';
//import Eula from './Eula';
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


interface MyProps {
  
  appBarTitle?(msg: string): any;
  categories: any[];
  pathOnTouchTap(path:string): any;
  appConfig: any;
  leftIcon: any;
  flashMessage: {message: string, open: boolean};
  appNameShort: string;
  appNameLong: string;
  alertNurse(): any;
}

interface MyState {
  title?: any,
  open?: boolean
}


const rightNurseIcon = (props) => {
  const {alertNurse} = props;
  const handleAlertNurse = (event) => {
    event.preventDefault();
    event.stopPropagation();
    alertNurse();
  }
  return (<FlatButton style={{width: '120px',color: 'white',backgroundColor: 'red'}} onTouchTap={handleAlertNurse} secondary={true} icon={<PersionIcon />} >
           Alert Nurse
          </FlatButton>);
};


export default class AppBarPage extends React.Component<MyProps, MyState>{

  constructor (props: any) {
    super(props);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.state = {
      open: false,
      title: ''
    };
  }

  componentWillMount () {
    //this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
  }
  handleRequestClose () {
    this.setState({
      open: false
    });
  }

  handleTouchTap () {
    this.setState({
      open: true
    });
  }

  handleTitle (title: string) {
    this.setState({
      title: title
    });
  }

  render () {
    const {categories,pathOnTouchTap,appConfig,leftIcon,flashMessage,appNameShort,appNameLong, alertNurse} = this.props;
    return (
       
        <div>
            <div style={styles.bgDiv as any} />
            <Helmet
                    titleTemplate={'%s - ' + appNameShort}
                    defaultTitle={appNameLong}
                    meta={[
                      { name: 'description', content: appNameLong },
                    ]}
            />
            <AppBar
                title={this.state.title}
                titleStyle={{textAlign: 'center'}}
                iconElementLeft={leftIcon}
                iconElementRight={rightNurseIcon(this.props)}
                 />
                <div style={{'padding': '5px'} as any}>
                  <div>
                    {React.cloneElement((this.props as any).children, { appBarTitle: this.handleTitle, categories, pathOnTouchTap, alertNurse, appConfig: appConfig })}
                  </div>
                </div>
                <AppSnackBar {...flashMessage} />
                <AppSnackBarContainer />
                <AlertNurseDialog />
                {/*
                <Eula />
                <SnackBarNotice flash={flash} />
                */}
        </div>
    );
  }
}
