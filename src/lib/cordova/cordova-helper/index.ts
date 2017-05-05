export interface CordovaConfiguratorInterface {
  isReady: boolean;
  plugins: {[propName: string]: {init: () => void }}
}


export const initCordova = (config: CordovaConfiguratorInterface) => {
    Object.keys(config.plugins).map((propName) => {
      try {
      config.plugins[propName].init();
      } catch (e){
        console.log('Error on init of cordova plugin: ' + propName);
      }
    });
}