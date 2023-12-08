import Phaser from 'phaser'
import eventStream from '../util/eventStream'
import { Player } from '../components/Player'

export class Scene01 extends Phaser.Scene {
  private player
  private player2
  private activePlayer

  private stars
  private platforms

  private audioLoop
  public cursors
  private isPlayerSwitching = false

  constructor() {
    super('Scene01')
  }

  init() {
    this.cameras.main.fadeIn(300)
  }

  create() {
    if (!this.audioLoop) {
      this.audioLoop = this.sound.add('loop', { loop: true })
      this.audioLoop.volume = 0.2
    }

    this.input.keyboard.on('keydown-M', () => {
      if (this.audioLoop.isPlaying) {
        this.audioLoop.pause()
      } else if (this.audioLoop.isPaused) {
        this.audioLoop.resume()
      } else {
        this.audioLoop.play()
      }
    })

    this.input.keyboard.on('keydown-N', () => {
      this.scene.start('Scene02')
    })

    this.add.image(400, 300, 'sky')

    this.platforms = this.createPlatforms.call(this)
    this.player = new Player({
      scene: this,
      platforms: this.platforms,
      x: 100,
      y: 450,
      tint: null,
      name: 'player1',
    })

    this.player2 = new Player({
      scene: this,
      platforms: this.platforms,
      x: 700,
      y: 450,
      tint: 0x00dddd,
      name: 'player2',
    })

    this.activePlayer = this.player

    this.cursors = this.input.keyboard.createCursorKeys()
    this.stars = this.createStars.call(this)

    this.cameras.main.setBounds(0, 0, 2500, 300)
    this.cameras.main.startFollow(this.player)

    this.input.keyboard.on('keydown-N', () => {
      this.scene.start('Scene02')
    })
  }

  update() {
    if (!this.isPlayerSwitching) {
      this.activePlayer.handleMovement(this)
    }

    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.isPlayerSwitching) {
        return
      }

      this.isPlayerSwitching = true
      this.activePlayer.stopMovement()

      if (this.activePlayer.name === 'player1') {
        this.activePlayer = this.player2
      } else {
        this.activePlayer = this.player
      }

      this.panCam(this.activePlayer)
    })
  }

  panCam(activePlayer) {
    this.cameras.main.pan(
      activePlayer.x,
      activePlayer.y,
      500,
      'Sine.easeInOut',
      true,
      (cam, progress) => {
        cam.panEffect.destination.x = activePlayer.x
        cam.panEffect.destination.y = activePlayer.y
        if (progress == 1) {
          this.cameras.main.stopFollow()
          this.cameras.main.startFollow(activePlayer, false, 1, 1)
          this.isPlayerSwitching = false
        }
      }
    )
  }

  collectStar(player, star) {
    star.disableBody(true, true)

    eventStream.emit('increaseScore')

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true)
      })
    }
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
}
