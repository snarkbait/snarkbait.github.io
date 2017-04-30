var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var max_radius = 80;

window.addEventListener('mousemove', mouseMove);
window.addEventListener('touchmove', mouseMove);

window.addEventListener('resize', 
    function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;       
    });

function mouseMove(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse.x + "," + mouse.y);   
}

var colors = [
    '#468966',
    '#FFF0A5',
    '#FFB03B',
    '#B64926',
    '#8E2800'
];
var circles = [];
for (var i = 0; i < 300; i++) {
    var x = Math.random() * innerWidth - (r * 2);
    var y = Math.random() * innerHeight - (r * 2);

    var dx = (Math.random() - 0.5) * 8;
    var dy = (Math.random() - 0.5) * 8;
    var r = (Math.random() * 10) + 1;
    circles.push(new Circle(x, y, dx, dy, r))
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0 , 0, innerWidth, innerHeight);

    
    for (var i = 0; i < circles.length; i++) {
        //console.log(circles[i]);
        circles[i].update();
    }
}

animate();

function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.c = colors[Math.floor(Math.random() * colors.length)];
    this.current_radius = r;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.current_radius, Math.PI * 2, false);
        c.shadowBlur = 10;
        c.shadowColor = 'black';
        c.fillStyle = this.c;
        c.fill();       
    }

    this.update = function() {
        if (this.x  + this.current_radius > innerWidth || this.x - this.current_radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.current_radius > innerHeight || this.y - this.current_radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;  

        if (Math.abs(mouse.x - this.x) < 100 && Math.abs(mouse.y - this.y) < 100) {
            if (this.current_radius < max_radius) {
                this.current_radius += 5;
            }            
        } else {
            if (this.current_radius > this.r) {
                this.current_radius -= 1;
            }
        }

        this.draw();     
    }
}


