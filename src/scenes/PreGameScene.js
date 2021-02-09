import Phaser from "phaser";
import GameScenes from "../scenes/GameScenes";
import bg from "../assets/bg.jpg";
import Grizz from "../assets/grizz.png";
import Pan from "../assets/panpan.png";
import Ice from "../assets/ice.png";
import Charlie from "../assets/charlie.png";
import Border from "../assets/finish_line.png";
import Food from "../assets/calzone.png";

class PreGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PreGameScene",
    });
    this.initialTime = 3;
  }

  preload() {
    this.load.image("background", bg);
    this.load.image("grizz", Grizz);
    this.load.image("pan", Pan);
    this.load.image("ice", Ice);
    this.load.image("charlie", Charlie);
    this.load.image("border", Border);
    this.load.image("food", Food);
  }

  create() {
    const bg = this.add.image(650, 300, "background");
    const border = this.add.tileSprite(400, 300, 800, 30, "border");

    const grizz = this.physics.add
      .sprite(30, 320, "grizz")
      .setOrigin(0, 0)
      .setScale(0.4)
      .setInteractive({ cursor: "pointer" });
    const pan = this.physics.add
      .sprite(230, 340, "pan")
      .setOrigin(0, 0)
      .setScale(0.43)
      .setInteractive({ cursor: "pointer" });
    const ice = this.physics.add
      .sprite(400, 310, "ice")
      .setOrigin(0, 0)
      .setScale(0.4)
      .setInteractive({ cursor: "pointer" });
    const charlie = this.physics.add
      .sprite(580, 310, "charlie")
      .setOrigin(0, 0)
      .setScale(0.097)
      .setInteractive({ cursor: "pointer" });

    // Prevent sprites from falling off canvas
    grizz.setCollideWorldBounds(true);
    pan.setCollideWorldBounds(true);
    ice.setCollideWorldBounds(true);
    charlie.setCollideWorldBounds(true);

    let countDown = this.add.text(325, 190, `${this.initialTime}`, {
      fontSize: "120px",
      fontStyle: "bold",
      fill: "#000",
    });

    const onEvent = () => {
      if (this.initialTime !== 0) {
        this.initialTime -= 1;
        countDown.setText(`${this.initialTime}`);
      } else {
        this.scene.start("GameScenes");
      }
    };

    let timedEvent = this.time.addEvent({
      delay: 1000,
      callback: onEvent,
      callbackScope: this,
      loop: true,
    });
  }
}
export default PreGameScene;
