Game.MainMenu = function(game){}

let ground = 780;
let ketapel;
let bird;
let line;
let graphics;
let vector;
Game.MainMenu.prototype = {
    create : function(){
      let babi = this.add.sprite(500, ground, 'babi');
      babi.scale.setTo(0.3);
      babi.anchor.setTo(0 , 1);

      ketapel = this.add.sprite(100, ground, 'ketapel');
      ketapel.scale.setTo(0.2);
      ketapel.anchor.setTo(0 , 1);

      bird = this.add.sprite(100, (ketapel.y-ketapel.height), 'bird');
      bird.scale.setTo(0.2);
      bird.inputEnabled = true;
      bird.input.enableDrag();
      bird.events.onDragUpdate.add(dragUpdate);

      line = new Phaser.Line(bird.x, bird.y, 110, ketapel.y-ketapel.height+20);
      graphics = this.add.graphics(0,0);
       //var graphics=game.add.graphics(line.start.x,line.start.y);//if you have a static line


    },
    update : function(){
      graphics.clear();
      graphics.lineStyle(10, '0x894808', 1);
      graphics.moveTo(line.start.x,line.start.y);//moving position of graphic if you draw mulitple lines
      graphics.lineTo(line.end.x,line.end.y);
      graphics.endFill();
    }

}
function dragUpdate(sprite, pointer, dragX, dragY, snapPoint) {

    let x = dragX - 110;
    let y = dragY - (ketapel.y-ketapel.height+20);
    vector = getNormalizeVector(x,y);
    vector.x = clamp(vector.x , -200 , 0) * clamp( getLengthVector(x,y) , 0 , 100);
    vector.y = clamp(vector.y , 0 , 200) * clamp( getLengthVector(x,y) , 0 , 100);
    // console.log(dragX,dragY);
    // if(dragX > ketapel.x - 20){
    //   sprite.x = ketapel.x - 20;
    // }
    // if(dragY < (ketapel.y-ketapel.height)){
    //   sprite.y = (ketapel.y-ketapel.height);
    // }
    // if(dragX < 30){
    //   sprite.x = 30;
    // }
    // if(dragY > ground-50){
    //   sprite.y = ground-50;
    // }
    sprite.x = vector.x + 110;
    sprite.y = vector.y + (ketapel.y-ketapel.height);
    line.start.x = sprite.x+10;
    line.start.y = sprite.y+30;

}
