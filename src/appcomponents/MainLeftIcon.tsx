import * as React from 'react';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AlarmSet from 'material-ui/svg-icons/action/alarm';
import MenuItem from 'material-ui/MenuItem';
import TrackChangesIcon from 'material-ui/svg-icons/action/track-changes';
import DoneIcon from 'material-ui/svg-icons/action/done';


import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';

export interface Props {
  user: any;
  menuItems: any;
  pathOnTouchTap: any;
  initAssessComplete : any;
  newPainClick: (any) => void;
}


const subMenuItems = (user,menuItems,pathOnTouchTap) => {
     
      var menuItemsFinal = menuItems.length ? menuItems.map(menuItem => {

        switch(menuItem.type){
          case 'divider':
            return <Divider key={menuItem.id} />;
          case 'auth_link':
            return <MenuItem key={menuItem.id} menuItems={subMenuItems(user,menuItem.children,pathOnTouchTap)}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)} />;
          case 'nonauth_link':
            return <MenuItem key={menuItem.id} menuItems={subMenuItems(user,menuItem.children,pathOnTouchTap)}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)} />;
          case 'link':
            return <MenuItem key={menuItem.id} menuItems={subMenuItems(user,menuItem.children,pathOnTouchTap)}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)} />;
          case 'link_absolute':
            return <MenuItem key={menuItem.id} primaryText={menuItem.item.title} href={menuItem.item.path} />;
        }

      }) : null;
    
      return menuItemsFinal;
}

const makeLink = (user,menuItem,pathOnTouchTap) => {
    if(menuItem.children.length){
      return <MenuItem key={menuItem.id} menuItems={subMenuItems(user,menuItem.children,pathOnTouchTap)} primaryText={menuItem.item.title}  />;
    }
    return <MenuItem key={menuItem.id}  primaryText={menuItem.item.title} onTouchTap={pathOnTouchTap(menuItem.item.path)}  />;
}


const menuItems: React.SFC<Props> = ({user, menuItems,pathOnTouchTap,initAssessComplete, newPainClick}) => {

  const secretTap = (path) => {
    const tapMax = 3;
    let tapCount = 0;
    return (event) => {
      event.preventDefault();
      event.stopPropagation();
      tapCount++;
      if(tapCount >= tapMax){
        pathOnTouchTap(path)(event);
      }
    }
  }

  return (
    <IconMenu
      iconButtonElement={<IconButton><MenuIcon color={'#FFFFFF'}/></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
           <Divider key={'menu_top_divider'} />
             <MenuItem key={'menu_top_home'}  primaryText="Home" onTouchTap={pathOnTouchTap('/main/account-home')}  />
             {!initAssessComplete && <MenuItem key={'menu_top_init_assess'} rightIcon={initAssessComplete ? <DoneIcon color={'green'} /> : null} primaryText="Initial Assessment" onTouchTap={pathOnTouchTap('/main/assessment-start')}  />}
             <MenuItem key={'menu_top_reassess'} rightIcon={initAssessComplete ? <AlarmSet /> : null} disabled={!initAssessComplete} primaryText="Pain Reassessment" onTouchTap={pathOnTouchTap('/main/reassess')}  />
             
             <MenuItem key={'menu_top_new_pain'} primaryText="New Pain" disabled={!initAssessComplete} onTouchTap={newPainClick} />
             <MenuItem key={'menu_top_med_tracker'} rightIcon={<TrackChangesIcon color={'#3A7BAD'} />} primaryText="Med Tracker" onTouchTap={pathOnTouchTap('/main/mtracker2')}  />
             {/*<MenuItem key={'menu_top_test'} primaryText="Test" onTouchTap={pathOnTouchTap('/main/assess-overview')} />*/}
          {menuItems.map(menuItem => {
            
            switch(menuItem.type){
              case 'divider':
                return <Divider key={menuItem.id} />;
              case 'link':
                return makeLink(user,menuItem,pathOnTouchTap);
              case 'link_absolute':
                return <MenuItem key={menuItem.id} primaryText={menuItem.item.title} href={menuItem.item.path} />;
              case 'auth_link':
                return makeLink(user,menuItem,pathOnTouchTap);
              case 'nonauth_link':
                return makeLink(user,menuItem,pathOnTouchTap);
            }

          })}
          
          <MenuItem innerDivStyle={{color: 'grey'}} key='version_num' primaryText={'v1.0.0'} onTouchTap={secretTap('debug')} />
    </IconMenu>
  );
}

export default menuItems;