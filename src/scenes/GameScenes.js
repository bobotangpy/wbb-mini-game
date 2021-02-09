import Phaser from "phaser";
import TitleScene from "../scenes/TitleScene";
import bg from "../assets/bg.jpg";
import Grizz from "../assets/grizz.png";
import Pan from "../assets/panpan.png";
import Ice from "../assets/ice.png";
import Charlie from "../assets/charlie.png";
import Border from "../assets/finish_line.png";
import Food from "../assets/calzone.png";

const objArr = [];
let foods;

class GameScenes extends Phaser.Scene {
  constructor() {
    super({ key: "GameScenes" });
    this.score = 0;
    this.initialTime = 10;
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

    objArr.push(grizz, pan, ice, charlie);

    // Prevent sprites from falling off canvas
    grizz.setCollideWorldBounds(true);
    pan.setCollideWorldBounds(true);
    ice.setCollideWorldBounds(true);
    charlie.setCollideWorldBounds(true);

    grizz.triggered = false;
    pan.triggered = false;
    ice.triggered = false;
    charlie.triggered = false;

    let home = this.add
      .text(700, 16, "Go Back", {
        fontSize: "20px",
        fill: "#fff",
      })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("TitleScene");
      });

    let scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    let countDown = this.add.text(300, 16, `Countdown: ${this.initialTime}`, {
      fontSize: "32px",
      fill: "#000",
    });

    const onEvent = () => {
      if (this.initialTime !== 0) {
        this.initialTime -= 1;
        countDown.setText(`Countdown: ${this.initialTime}`);
      } else {
        this.input.disable(grizz);
        this.input.disable(pan);
        this.input.disable(ice);
        this.input.disable(charlie);

        this.add.text(250, 230, "Great job!", {
          fontSize: "50px",
          fontStyle: "bold",
          color: "green",
        });
      }
    };

    let timedEvent = this.time.addEvent({
      delay: 1000,
      callback: onEvent,
      callbackScope: this,
      loop: true,
    });

    // const food = this.physics.add.group({
    //   key: "food",
    //   setScale: { x: 0.1, y: 0.1 },
    //   repeat: 15,
    //   setXY: { x: 30, y: 0, stepX: 70 },
    // });

    foods = this.physics.add.group({
      runChildUpdate: true,
    });

    foods.createMultiple({
      key: "food",
      frame: Phaser.Utils.Array.NumberArray(0, 5),
      randomFrame: true,
      repeat: 5,
    });

    foods.children.iterate((f) => {
      f.setScale(0.1, 0.1);
      let y = Phaser.Math.Between(-200, -2000);
      let x = Phaser.Math.Between(0, 800);

      f.setY(y);
      f.setX(x);
      f.setMaxVelocity(200);

      f.update = () => {
        if (this.y > 600) {
          this.y = 0;
        }
      };
    });

    // for (let i; i < 5; i++) {
    //   console.log("create");
    //   let f = food.create(300, 60, "food");
    //   f.setScale(0.1, 0.1);
    //   f.body.gravity.y = 5;
    //   f.body.bounce.y = 0.7 + Math.random() * 0.2;
    // }

    const pointer = this.input.activePointer;
    let collider;

    objArr.map((item) => {
      item.on("pointerdown", () => {
        item.triggered = true;
        // Make sure only allow overlap when 1 sprite is clicked & is jumping
        if (pointer.isDown && item.triggered) {
          // A jump from the sprite
          item.setVelocityY(-100);

          // OVERLAP - tries to stop any touching objects from overlapping, that's it
          // COLLIDER - there shld be a physical effect from the meeting of the 2 objects && (optionally) detecting the event
          // param order => player, obstacle, function
          collider = this.physics.add.overlap(
            item,
            foods,
            updateScore,
            null,
            this
          );
        }
      });
    });

    const updateScore = (sprite, food) => {
      // Make the food disappear
      food.disableBody(true, true);
      // Reset overlap of sprite & food
      this.physics.world.removeCollider(collider);
      sprite.triggered = false;

      this.score += 1;
      scoreText.setText(`Score: ${this.score}`);
    };
  }

  update() {}
}

export default GameScenes;
