import Phaser from 'phaser'

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super('LoadingScene')
  }

  preload() {
    const windowWidthCenter = Number(this.game.config.width) / 2
    const windowHeightCenter = Number(this.game.config.height) / 2
    const loadingText = this.add.text(
      windowWidthCenter,
      windowHeightCenter,
      'Loading...',
      {
        fontSize: '16px',
        color: '#fff',
      }
    )
    loadingText.setOrigin(0.5, 0.5)

    this.load.image('sky', './assets/sky.png')
    this.load.image('ground', './assets/platform.png')
    this.load.image('star', './assets/star.png')
    this.load.image('bomb', './assets/bomb.png')
    this.load.spritesheet('dude', './assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
  }

  async create() {
    this.scene.start('Scene01')
  }
}
