import Phaser from 'phaser'
import eventStream from '../util/eventStream'
import { Player } from '../components/Player'

export class Scene02 extends Phaser.Scene {
  private player
  private bombs
  private stars
  private platforms

  public cursors

  constructor() {
    super('Scene02')
  }

  init() {
    this.cameras.main.fadeIn(300)
  }

  create() {
    this.input.keyboard.on('keydown-P', () => {
      this.scene.start('Scene01')
    })

    const sky = this.add.image(400, 300, 'sky')
    sky.flipY = true

    this.platforms = this.createPlatforms.call(this)
    this.player = new Player({
      scene: this,
      platforms: this.platforms,
      x: 100,
      y: 450,
    })
    this.cursors = this.input.keyboard.createCursorKeys()
    this.stars = this.createStars.call(this)
    this.bombs = this.createBombs.call(this)
  }

  update() {
    this.player.handleMovement(this)
  }

  collectStar(player, star) {
    star.disableBody(true, true)

    eventStream.emit('increaseScore')

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true)
      })

      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400)

      const bomb = this.bombs.create(x, 16, 'bomb')
      bomb.setBounce(1)
      bomb.setCollideWorldBounds(true)
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    }
  }

  hitBomb(player, _bomb) {
    this.physics.pause()
    player.setTint(0xff0000)
    player.anims.play('turn')
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup()
    platforms.create(400, 568, 'ground').setScale(2).refreshBody()
    platforms.create(600, 400, 'ground')
    platforms.create(50, 250, 'ground')
    platforms.create(750, 220, 'ground')

    return platforms
  }

  createStars() {
    const stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    })

    stars.children.iterate((child: Phaser.Physics.Arcade.Sprite) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
      return true
    })

    this.physics.add.collider(stars, this.platforms)
    this.physics.add.overlap(this.player, stars, this.collectStar, null, this)

    return stars
  }

  createBombs() {
    const bombs = this.physics.add.group()
    this.physics.add.collider(bombs, this.platforms)
    this.physics.add.collider(this.player, bombs, this.hitBomb, null, this)

    return bombs
  }
}
