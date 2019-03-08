function clamp(val, min, max){
    return Math.max(min, Math.min(max, val));
}

function getImage(name){
  return "assets/img/"+name;
}


var Vector = function(x,y) {
this.x = x;
this.y = y;
}

Vector.prototype.normalize = function() {

}

function getNormalizeVector(x,y){
  var length = getLengthVector(x,y); //calculating length
  x = x/length; //assigning new value to x (dividing x by lenght of the vector)
  y= y/length; //assigning new value to y
  return {x:x , y:y};
}

function getLengthVector(x,y){
  return Math.sqrt(x*x+y*y);
}
