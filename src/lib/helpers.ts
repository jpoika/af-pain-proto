

function errorLoading(err) {
 console.error('Dynamic page loading failed', err);
}


function loadRoute(cb) {
 return (module) => cb(null, module.default);
}


export const asynRouteMaker = (config: any = {}) => {

  return (route: string,component: Promise<any>, childRoutes: any[] =[],indexComponent: any = null) => {
      return {
       path: route,
         getComponent(location, cb) {
            component.then(loadRoute(cb)).catch(errorLoading);
         },
        childRoutes,
       
        indexRoute: indexComponent ? { component: indexComponent} : null
      }
  }
}

export const syncRoute = (route: string,component: any, childRoutes: any[] =[],indexComponent: any = null) => {
  return {
       path: route,
       component: component,
       childRoutes,
       
       indexRoute: indexComponent ? { component: indexComponent} : null
  }
}

export namespace Validators {
  export const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  export const isDate = (input) => {
    return Object.prototype.toString.call(input) === '[object Date]'
  }

  export const isEmail = (input) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(input);
  }

  export const isString = (input) => {
    if (typeof input === 'string' || input instanceof String){
      return true;
    }
    return false;
  }
}


export namespace Transforms {
  export const dateToMS = (input, ifInvalid = -1) => {
    if(Validators.isDate(input)){
      return input.getTime();
    }
    return ifInvalid;
  }

  export const msToDate = (input, ifInvalid = null) => {

    if(Validators.isNumeric(input)){
      let tmpdate = new Date();
      tmpdate.setTime(input);
      return tmpdate;
    }

    return ifInvalid;
  }
}

export namespace Formats {
  export const dateToDateString = (input: Date, format: any = '') => {
    return (input.getMonth() + 1) + '/' + input.getDate() + '/' + input.getFullYear();
  }
  export const msToDateString = (input: number, format: any = '') => {
    let tmpDate = new Date();
    tmpDate.setTime(input);
    return dateToDateString(tmpDate);
  }

  export const dateToDateTimeString = (input: Date, format: any = '') => {
    const hour = input.getHours();
    const filledHour = hour > 9 ? hour : '0' + hour;
    const minute = input.getMinutes();
    const filledMinute = minute > 9 ? minute : '0' + minute;
    return (input.getMonth() + 1) + '/' + input.getDate() + '/' + input.getFullYear() + ' ' + filledHour + ':' + filledMinute;
  }
  export const msToDateTimeString = (input: number, format: any = '') => {
    let tmpDate = new Date();
    tmpDate.setTime(input);
    return dateToDateTimeString(tmpDate);
  }

}


