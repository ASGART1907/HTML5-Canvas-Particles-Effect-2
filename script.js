const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle{
  constructor(){
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random () * canvas.height);
    this.radius = Math.floor(Math.random() * 5 + 5);
    this.color = "#24527a";
    this.velocity = {
      x:Math.random() - 2.5,
      y:Math.random() - 2.5
    }
  }

  draw(){
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2);
    c.fill();
    c.closePath();
  }

  update(){
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if(this.x + this.radius >= canvas.width || this.x - this.radius <= 0){
      this.velocity.x = -this.velocity.x;
    }

    if(this.y + this.radius >= canvas.height || this.y - this.radius <= 0){
      this.velocity.y = -this.velocity.y;
    }
  }
}

const particle = new Particle();
for(let i=0; i<30; i++){
  particles.push(
    new Particle()
  );
}

function particleDraw(){


  for(let a=0; a<particles.length; a++){
    for(let b=0; b<particles.length; b++){

      let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
                      (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

      if(distance < 5000){
        c.beginPath();
        c.strokeStyle = "#5dacbd";
        c.lineWidth = 2;
        c.moveTo(particles[a].x,particles[a].y);
        c.lineTo(particles[b].x,particles[b].y);
        c.stroke();
        c.closePath();  
      }else{
        c.beginPath();
        c.strokeStyle = "lime";
        c.lineWidth = 1;
        c.moveTo(0,0);
        c.lineTo(0,0);
        c.stroke();
        c.closePath(); 
      }

    }
  }

  for(let i=0; i<particles.length; i++){
    particles[i].draw();
    particles[i].update();
  }
}


function animate(){
  c.clearRect(0,0,canvas.width,canvas.height);
  particleDraw();
  requestAnimationFrame(animate);
}

animate();