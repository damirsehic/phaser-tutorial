import Phaser from 'phaser'
import { Scene01 } from './scenes/Scene01'
import { LoadingScene } from './scenes/LoadingScene'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [LoadingScene, Scene01],
}

export default new Phaser.Game(config)
