import Phaser from 'phaser'
import { timeout } from '../util/timeout'

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super('LoadingScene')
  }

  async create() {
    this.add.text(100, 100, 'Loading...', {
      fontSize: '16px',
      color: '#fff',
    })

    await timeout(5000)

    this.scene.start('Scene01')
  }
}
