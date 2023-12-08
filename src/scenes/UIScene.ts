import Phaser from 'phaser'
import eventStream from '../util/eventStream'

export class UIScene extends Phaser.Scene {
  private score = 0
  private showFPS = false
  private fpsCounter

  constructor() {
    super({ key: 'UIScene' })
  }

  create() {
    const scoreText = this.add.text(16, 16, 'SCORE: 0', {
      fontSize: '16px',
      color: '#000',
      fontFamily: 'GameFont',
    })
    eventStream.on('increaseScore', () => {
      const oldScore = this.score
      this.score = oldScore + 10
      this.tweens.addCounter({
        from: oldScore,
        to: this.score,
        duration: 200,
        ease: 'linear',
        onUpdate: (tween) => {
          const value = Math.round(tween.getValue())
          scoreText.setText('SCORE: ' + value)
        },
      })
    })

    eventStream.on('resetScore', () => {
      scoreText.setText('SCORE: 0')
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
        fontFamily: 'GameFont',
      })
      .setVisible(false)
  }
}
