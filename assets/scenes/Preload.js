Game.Preload = function(game){
    this.game = game // keep reference to main game object
}

Game.Preload.prototype = {
    preload:function(){

    },
    create:function(){
		this.state.start('mainmenu');
    }
}