function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

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
      this.ctx.fillStyle = 'white';
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
    this.height = 30;

    this.ctx = null;

    this.v_y = 0;

    this.draw = function(){
      this.ctx.fillStyle = 'white';
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

    this.update = function(){
      this.y += this.v_y;
    };
  }

  var j1 = new raqueta(40,30)
  var j2 = new raqueta(553,340)

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
            raqueta.update();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bola.draw();
            raqueta.draw();

            if (bola.x > canvas.width){
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
            }else if(bola.x < 0 || (bola.y > raqueta.y && bola.y < raqueta.y+raqueta.height && bola.x < raqueta.x)){
              bola.direction = "right";
              bola.v_x = 4;
            }

            window.onkeydown = (e) => {
              e.preventDefault();
              if(e.key == 'w'){
                raqueta.y = raqueta.y - 7;
              }else if(e.key == 's'){
                raqueta.y = raqueta.y + 7;
                console.log(raqueta.y);
              }
            }

          },20);
        }
    }
  }
}
