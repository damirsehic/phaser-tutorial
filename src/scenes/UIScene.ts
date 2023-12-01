import Phaser from 'phaser'
import eventStream from '../util/eventStream'

export class UIScene extends Phaser.Scene {
  private score = 0
  private showFPS = false
  private fpsCounter

  constructor() {
    super({ key: 'UIScene', active: true })
  }

  create() {
    const scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '16px',
      color: '#000',
    })
    eventStream.on('increaseScore', () => {
      this.score += 10
      scoreText.setText('Score: ' + this.score)
    })

    this.fpsCounter = this.createFpsCounter()
    this.input.keyboard.on('keydown-F', () => {
      this.toggleFPS()
    })
  }

  update() {
    if (this.showFPS) {
      this.fpsCounter.setText('FPS: ' + Math.round(this.game.loop.actualFps))
    }
  }

  private toggleFPS() {
    this.showFPS = !this.showFPS
    this.fpsCounter.setVisible(this.showFPS)
  }

  private createFpsCounter() {
    return this.add
      .text(700, 16, 'FPS: 0', {
        fontSize: '16px',
        color: '#000',
      })
      .setVisible(false)
  }
}
