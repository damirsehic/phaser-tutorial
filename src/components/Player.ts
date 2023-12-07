import Phaser from 'phaser'
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor({ scene, platforms, x, y, tint, name }) {
    super(scene, x, y, 'dude')

    scene.physics.world.enable(this)
    scene.add.existing(this)

    this.setName(name)

    this.setBounce(0.2)
    this.setCollideWorldBounds(true)
    this.setGravityY(300)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    if (tint) {
      this.setTint(tint)
    }

    scene.physics.add.collider(this, platforms)
  }

  public handleMovement(scene) {
    if (scene.cursors.left.isDown) {
      this.setVelocityX(-160)
      this.anims.play('left', true)
      this.angle = 5
    } else if (scene.cursors.right.isDown) {
      this.setVelocityX(160)
      this.anims.play('right', true)
      this.angle = -5
    } else {
      this.setVelocityX(0)
      this.anims.play('turn')
      this.angle = 0
    }

    if (scene.cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-470)
    }
  }

  public stopMovement() {
    this.setVelocityX(0)
    this.anims.play('turn')
    this.angle = 0
  }
}
