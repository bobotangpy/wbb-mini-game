import Phaser from "phaser";
import TitleScene from "./scenes/TitleScene";
import PreGameScene from "./scenes/PreGameScene";
import GameScenes from "./scenes/GameScenes";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [TitleScene, PreGameScene, GameScenes],
};

const game = new Phaser.Game(config);
