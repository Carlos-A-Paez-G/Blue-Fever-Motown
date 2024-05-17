class miniPart {
    constructor(_x, _y, _dx, _dy) {
        this.x = _x;
        this.y = _y;
        this.dx = _dx;
        this.dy = _dy;
        this.c = color(random(0,255), random(0,255), random(0,255));
        this.alive = true;
        this.life = floor(random(20,50));
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    display() {
        fill(this.c);
        ellipse(this.x, this.y, 30, 30);
        this.life--;
    }
}

class part {
    constructor(_x, _y, _s, _dy, _c) {
        this.x = _x;
        this.y = _y;
        this.s = _s;
        this.dy = _dy;
        this.c = _c;
        this.c = color(246, 250, 212, 120);
        // this.dx = 0;
        this.alive = true;
        this.popped = false;
        this.miniParts = [];
    }
  
    update() {
        this.y += this.dy;
  
        if(this.y > 1500 + this.s) {
            this.alive = false;
        }

        if(abs(mouseX-this.x) < this.s/2 && abs(mouseY-this.y) < this.s/2 && mouseIsPressed) {
            this.alive = false;
        }
    }
  
    display() {
        if(this.alive && !this.popped) {
            fill(this.c);
            ellipse(this.x, this.y, this.s, this.s);
        } else {
            if(!this.popped) {
                let n = floor(random(20,30));
                var k = 0;
                // console.log(n);
                for(let i=0; i<15; i++) {
                    console.log(i);
                    this.miniParts.push(new miniPart(this.x, this.y, random(-5,5), random(-5,5)));
                }
                this.popped = true;
            } 
            let dead = [1];
            for(let m in this.miniParts) {
                this.miniParts[m].update();
                this.miniParts[m].display();

                
            }

            if(dead.length > 0) {
                for(let d in dead) {
                    this.miniParts.splice(dead[d]);
                }
            }
        }

    }
  }
  
function controlParts() {
if(t >= _t) {
    P.push(new part(random(0, displayWidth), -25, random(120,200), random(0.1, 0.5), color(255,0,0)));
    t = random(0, 10);
}

let dead = [];
if(P.length > 0) {
    for(let p in P) {
        P[p].update();
        P[p].display();
    }
}


if(dead.length>0){
    for(var i=0; i < dead.length; i++) {
        P.splice(dead[i], dead[i]);
    }
}

t++;
}

var P = [];
var t = 0;
var _t = 160;
var canvas;

function setup() {
canvas = createCanvas(displayWidth, displayHeight);
canvas.position(0,0);
canvas.style('Z-index', '-1');

noStroke();
}

function draw() {
clear();
controlParts();
}