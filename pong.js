function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  /*function puntos(puntos_ini_x, puntos_ini_y){
    ctx = null;

    this.puntuacion = 0;

    this.puntos_x = puntos_ini_x;
    this.puntos_y = puntos_ini_y;

    this.init = function(ctx){
      this.ctx = ctx;
    }

    this.drawn = function(){
      ctx.strokeStyle = 'grey';
      ctx.font = "35px Arial";
      ctx.strokeText(this.puntuacion,200,200);
    }
  }*/

  ctx.setLineDash([11, 7]);
  ctx.moveTo(300, 0);
  ctx.lineTo(300, 400);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'green';
  ctx.stroke();

  var bola = {
    x_ini: 50,
    y_ini: 50,

    x: 0,
    y: 0,

    v_x: 4,
    v_y: 1,

    width: 5,
    height: 5,

    ctx: null,

    direction:"right",

    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },

    draw: function(){
      this.ctx.fillStyle = 'orange';
      this.ctx.fillRect(this.x,this.y,this.width, this.height);
    },

    reset: function(){
      this.x = this.x_ini;
      this.y = this.y_ini;
    },

    update: function(){
      this.x += this.v_x;
      this.y += this.v_y;
    }
  }


  function raqueta(raqueta_pos_inix, raqueta_pos_iniy){
    this.x_ini = raqueta_pos_inix;
    this.y_ini = raqueta_pos_iniy;

    this.y = 0;
    this.x = 0;

    this.width = 7;
    this.height = 40;

    this.ctx = null;

    this.v_y = 0;

    this.draw = function(){
      this.ctx.fillStyle = 'orange';
      this.ctx.fillRect(this.x,this.y,this.width,this.height);
    };

    this.reset = function(){
      this.x = this.x_ini;
      this.y = this.y_ini;
    };

    this.init = function(ctx) {
      this.ctx = ctx;
      this.reset();
    };
  }

  var j1 = new raqueta(40,30)
  var j2 = new raqueta(553,340)
  /*var puntos_j1 = new puntos(200,200)*/

  bola.init(ctx)
  bola.draw()
  j1.init(ctx)
  j2.init(ctx)
  j1.draw()
  j2.draw()

  var timer = null;

  window.onkeydown = (e) => {
     e.preventDefault();
     if (e.key == ' ') {
       if (!timer) {
         timer = setInterval(()=>{
            bola.update();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bola.draw();
            j1.draw();
            j2.draw();
            ctx.setLineDash([11, 7]);
            ctx.moveTo(300, 0);
            ctx.lineTo(300, 400);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'green';

            if (bola.x > canvas.width ||
               (bola.y > j2.y && bola.y < j2.y+j2.height && bola.x > j2.x)){
              bola.direction = "left";
              bola.v_x = -4;
            }else if (bola.y > canvas.height){
              if(bola.direction == "right"){
                bola.v_x = 4;
                bola.v_y = -1;
              }else if(bola.direction == "left"){
                bola.v_x = -4;
                bola.v_y = -1;
              }
            }else if (bola.y < 0){
              if(bola.direction == "right"){
                bola.v_x = 4;
                bola.v_y = 1;
              }else if(bola.direction == "left"){
                bola.v_x = -4;
                bola.v_y = 1;
              }
            }else if(bola.x < 0 ||
             (bola.y > j1.y && bola.y < j1.y+j1.height && bola.x < j1.x+j1.width)){
              bola.direction = "right";
              bola.v_x = 4;
            }

            window.onkeydown = (e) => {
              e.preventDefault();
              if(e.key == 'w'){
                j1.y = j1.y - 7;
              }else if(e.key == 's'){
                j1.y = j1.y + 7;
              }else if(e.key == 'ArrowUp'){
                j2.y = j2.y - 7;
              }else if(e.key == 'ArrowDown'){
                j2.y = j2.y + 7;
              }
              if(j1.y < 0){
                j1.y = 0;
              }else if(j1.y + j1.height > canvas.height){
                j1.y = canvas.height - j1.height;
              }else if(j2.y < 0){
                j2.y = 0;
              }else if(j2.y + j2.height > canvas.height){
                j2.y = canvas.height - j2.height;
              }
            }
          },25);
        }
    }
  }
}
