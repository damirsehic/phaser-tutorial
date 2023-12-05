import Phaser from 'phaser'
import { Scene01 } from './scenes/Scene01'
import { LoadingScene } from './scenes/LoadingScene'
import { UIScene } from './scenes/UIScene'
import { Scene02 } from './scenes/Scene02'
import { GameOverScene } from './scenes/GameOverScene'

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
  scene: [LoadingScene, Scene01, Scene02, UIScene, GameOverScene],
}

const game = new Phaser.Game(config)
// @ts-ignore
window.game = game

export default game
