Game.MainMenu = function(game){}


Game.MainMenu.prototype = {
    create : function(){

    },

    goToScene:function(sceneName){
        audios.click.play()
        this.state.start(sceneName)
    }
}
