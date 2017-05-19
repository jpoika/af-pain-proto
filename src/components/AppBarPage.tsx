/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Helmet from 'react-helmet';
import AppSnackBarContainer from 'local-t2-sw-redux/lib/containers/UpdateSnackBar';
import AlertNurseDialog from '../containers/AlertNurseDialog';
import IconButton from 'material-ui/IconButton';
import AppSnackBar from './AppSnackBar';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import PersonIcon from 'material-ui/svg-icons/social/person';

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
  title?: any;
  open?: boolean;
  showAltContent: boolean;
  altContent: any;
}


const rightNurseIcon = (props) => {
  const {alertNurse} = props;
  const handleAlertNurse = (event) => {
    event.preventDefault();
    event.stopPropagation();
    alertNurse();
  }
  return (<FlatButton style={{width: '120px',color: 'white',backgroundColor: 'red'}} onTouchTap={handleAlertNurse} secondary={true} icon={<PersonIcon />} >
           Alert Nurse
          </FlatButton>);
};


export default class AppBarPage extends React.Component<MyProps, MyState>{
  private altContentTimeoutId = null;
  constructor (props: any) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.state = {
      open: false,
      title: '',
      showAltContent: false,
      altContent: null
    };
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

  replaceContent = (altContent: any) => {
    if(altContent){
      this.setState({
        showAltContent: true,
        altContent
      });
    }

    this.altContentTimeoutId = setTimeout(() => {
                                  this.restoreContent();
                                }, 20000);
  }

  restoreContent = () => {
      this.altContentTimeoutId && clearTimeout(this.altContentTimeoutId);
      this.setState({
        showAltContent: false,
        altContent: null
      });
  }



  render () {
    const {categories,pathOnTouchTap,appConfig,leftIcon,flashMessage,appNameShort,appNameLong, alertNurse} = this.props;

    const MainContent = !this.state.showAltContent ? React.cloneElement((this.props as any).children, { restoreContent: this.restoreContent, replaceContent: this.replaceContent, appBarTitle: this.handleTitle, categories, pathOnTouchTap, alertNurse, appConfig: appConfig }) : this.state.altContent;
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
            {!this.state.showAltContent && <AppBar
                        title={this.state.title}
                        titleStyle={{textAlign: 'center'}}
                        iconElementLeft={leftIcon}
                        iconElementRight={rightNurseIcon(this.props)}
                         />}
                <div style={{'padding': '5px'} as any}>
                  <div>
                    {MainContent}
                  </div>
                </div>
                <AppSnackBar {...flashMessage} />
                <AppSnackBarContainer />
                <AlertNurseDialog />
        </div>
    );
  }
}
