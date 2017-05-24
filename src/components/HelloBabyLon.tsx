import * as React from "react";
import * as BABYLON from 'babylonjs/babylon.max';

class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.FreeCamera;
  private _light: BABYLON.Light;

  constructor(canvas: any) {
    // Create canvas and engine
    this._canvas = canvas;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene() : void {
      // create a basic BJS Scene object
      this._scene = new BABYLON.Scene(this._engine);

      // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
      this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), this._scene);

      // target the camera to scene origin
      this._camera.setTarget(BABYLON.Vector3.Zero());

      // attach the camera to the canvas
      this._camera.attachControl(this._canvas, false);

      // create a basic light, aiming 0,1,0 - meaning, to the sky
      this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), this._scene);

      // create a built-in "sphere" shape; with 16 segments and diameter of 2
      let sphere = BABYLON.MeshBuilder.CreateSphere('sphere1',
                            {segments: 16, diameter: 2}, this._scene);

      // move the sphere upward 1/2 of its height
      sphere.position.y = 1;

      // create a built-in "ground" shape

  }

  animate() : void {
    // run the render loop
    this._engine.runRenderLoop(() => {
        this._scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
        this._engine.resize();
    });
  }
}

const styles = {
  container: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
  },
  canvas: {
    width: '100%',
    height: '100%',
    touchAction: 'none'
  }
};

export interface HelloProps { 

}

export interface HelloState { 

}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export default class HelloBabylon extends React.Component<HelloProps, HelloState> {

    componentDidMount(){

      let game = new Game((this as any).canvas);

      // Create the scene
      game.createScene();

      // start animation
      game.animate();
    }

    render() {
        return (<div style={styles.container as any}>
                  
                    <canvas style={styles.canvas} ref={(canvas) => (this as any).canvas = canvas}></canvas>

                  </div>);
    }
}