var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var circles = [];
for (var i = 0; i < 25; i++) {
    var x = Math.random() * innerWidth - (r * 2);
    var y = Math.random() * innerHeight - (r * 2);

    var dx = (Math.random() - 0.5) * 8;
    var dy = (Math.random() - 0.5) * 8;
    var r = Math.random() * 40;
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

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, Math.PI * 2, false);
        c.shadowBlur = 10;
        c.shadowColor = 'black';
        c.fillStyle = 'blue';
        c.fill();       
    }

    this.update = function() {
        if (this.x  + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;  

        this.draw();     
    }
}


