function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  var bola = {
    x_ini: 50;
    y_ini: 50;

    x: 0;
    y: 0;

    v_x: 4;
    v_y: 1;

    b_width: 5;
    b_height: 5;

    ctx: null;

    draw: function(){
      this.ctx.fillStyle = white;
      this.ctx.fillRect(this.x,this.y,this.b_width, this.b_height);
    };

    ini: function(){
      this.x = this.x_ini;
      this.y = this.y_ini;
    };

  }

}
