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

  var raqueta = {
    x_ini: 40,
    y_ini: 25,

    y: 0,
    x: 0,

    width: 7,
    height: 30,

    ctx : null,

    v_y: 0,

    draw: function(){
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x,this.y,this.width,this.height);
    },

    reset: function(){
      this.x = this.x_ini;
      this.y = this.y_ini;
    },

    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },

    update: function(){
      this.y += this.v_y;
    }
  }

  bola.init(ctx)
  bola.draw()
  raqueta.init(ctx)
  raqueta.draw()

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
            }else if(bola.x < 0){
              bola.direction = "right";
              bola.v_x = 4;
            }

            window.onkeydown = (e) => {
              e.preventDefault();
              if(e.key == 'w'){
                raqueta.v_y = -6;
              }else if(e.key == 's'){
                raqueta.v_y = 6;
              }
            }

          },20);
        }
    }
  }
}
