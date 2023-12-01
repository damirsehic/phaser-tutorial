import Phaser from 'phaser'
import { Scene01 } from './scenes/Scene01'
import { LoadingScene } from './scenes/LoadingScene'
import { UIScene } from './scenes/UIScene'

const config = {
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
  scene: [LoadingScene, Scene01, UIScene],
}

export default new Phaser.Game(config)
