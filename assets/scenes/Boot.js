var Game = {}
Game.Boot = function(game){
    this.game = game // keep reference to main game object
}

Game.Boot.prototype = {
    preload:function(){

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        
        //have the game centered horizontallys
        this.scale.pageAlignHorizontally = true

        this.scale.pageAlignVertically = true

    },
    create:function(){
        this.state.start('preload');
    }
}