import Phaser from 'phaser'
import eventStream from '../util/eventStream'

export class UIScene extends Phaser.Scene {
  private score = 0

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
  }
}
