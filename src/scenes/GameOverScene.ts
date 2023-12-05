import Phaser from 'phaser'
import eventStream from '../util/eventStream'

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' })
  }

  create() {
    const overlay = this.add.rectangle(0, 0, 800, 600, 0x000, 0.5)
    overlay.setOrigin(0, 0)

    const gameOverText = this.add.text(400, 285, 'Game Over', {
      color: '#fff',
      fontSize: '32px',
    })
    gameOverText.setOrigin(0.5, 0.5)
    const tryAgainText = this.add.text(400, 315, 'Press SPACE to play again', {
      color: '#fff',
      fontSize: '16px',
    })
    tryAgainText.setOrigin(0.5, 0.5)

    this.input.keyboard.on('keydown-SPACE', () => {
      eventStream.emit('resetScore')
      this.scene.stop('GameOverScene')
      this.scene.start('Scene01')
    })
  }
}
