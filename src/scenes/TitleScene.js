import Phaser from "phaser";
import PreGameScene from "../scenes/PreGameScene";
import titleBackground from "../assets/title_bg.jpg";
import WebFontFile from "../../config/WebFontFile";

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" }, "custom-font");
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, "Press Start 2P"));
    this.load.image("bg", titleBackground);
  }

  create() {
    const bg = this.add.image(620, 260, "bg").setScale(0.9);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.text(150, 170, "We Bare Bears Mini Game", {
      fontSize: "23px",
      fontStyle: "bold",
      color: "#000000",
      fontFamily: '"Press Start 2P"',
    });
    this.add
      .text(325, 230, "[ Play ]", {
        fontSize: "17px",
        fontStyle: "bold",
        color: "blue",
        fontFamily: '"Press Start 2P"',
      })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("PreGameScene");
      });
  }
}
export default TitleScene;
