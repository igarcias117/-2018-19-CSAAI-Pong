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

  bola.init(ctx)
  bola.draw()

  var timer = null;

  window.onkeydown = (e) => {
     e.preventDefault();
     if (e.key == ' ') {
       if (!timer) {
         timer = setInterval(()=>{
            bola.update();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bola.draw();
            if (bola.x > canvas.width){
              bola.v_x = -4;
              bola.v_y = 1;
            }else if (bola.y > canvas.height){
              bola.v_x = 4;
              bola.v_y = -1;
            }
          },20);
        }
    }
  }
}
