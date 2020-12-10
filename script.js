/************************************/
/**** starscape *********************/
/************************************/

// based on the starfield by 

function randomInt(min_val, max_val){
    let num = min_val + (max_val-min_val + 1)*Math.random();
    return Math.floor(num);
};

function distanceR2(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// drawStar function taken from http://jsfiddle.net/m1erickson/8j6kdf4o/
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, rotation) {
    var rot = Math.PI / 2 * 3
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.strokeSyle = "#000";
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius)
    
    for (i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y)
        rot += step

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y)
        rot += step
    }
    ctx.lineTo(cx, cy - outerRadius)
    ctx.closePath();
    ctx.fillStyle='white';
    ctx.fill();
};

function draw(){

    starfield.update();

    window.requestAnimationFrame(draw);

};

class Star{

    constructor(X, Y, max_speed){

        let colors = ['white', 'white', 'white'];

        this.X = X;
        this.Y = Y;

        let x = randomInt(-this.X/2,this.X/2);
        let y = randomInt(-this.Y/2,this.Y/2);
        this.x = x;
        this.y = y;

        this.slope = this.y / this.x;
        this.opacity = 0;
        this.speed = Math.max(Math.random() * max_speed, 1);
        this.color = colors[randomInt(0,2)];
        this.rotation = Math.random()*Math.PI;
 
    }

    draw(){

        var canvas = document.getElementById('starfield');
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = this.color;
        // ctx.fillRect(this.x + this.X/2, this.y + this.Y/2, 5, 5);
        let scale = 1.0;
        drawStar(ctx, this.x + this.X/2, this.y + this.Y/2, 6, scale*6, scale*1, this.rotation);
    }

    checkBoundaries(){
        if ((Math.abs(this.x) > this.X/2) || (Math.abs(this.y) > this.Y/2)  ){
            this.x = randomInt(-this.X/2,this.X/2);
            this.y = randomInt(-this.Y/2,this.Y/2);
            this.slope = this.y / this.x;
        }else{}
    }

};

class StarField{

    constructor(n_stars, max_speed){

        this.n_stars = n_stars
        this.X = window.screen.width;
        this.Y = window.screen.height;

        this.stars = [];

        for (let i=0; i < n_stars; i++){

            this.stars[i] = new Star(this.X, this.Y, max_speed);
            // console.log(this.stars[i].x)
        }
            
    };

    spawn(){

        var div_tag = document.createElement('div');
        div_tag.setAttribute('id', 'div-starfield');
        div_tag.setAttribute('class', 'div-starfield');
        var canvas_tag = document.createElement('canvas');
        canvas_tag.setAttribute('id', 'starfield');
        canvas_tag.width = this.X;
        canvas_tag.height = this.Y;
    
        document.body.appendChild(div_tag);
        div_tag.appendChild(canvas_tag);

        for (let i=0; i < this.n_stars; i++){
            this.stars[i].checkBoundaries();
            this.stars[i].draw();
        }
    
    };

    update(){

        for (let i = 0; i < this.n_stars; i++) {

            var star = this.stars[i];
            var increment = Math.min(star.speed, Math.abs(star.speed / star.slope));
            
            star.x += (star.x > 0) ? increment : -increment;
            star.y = star.slope * star.x;
            
            star.opacity += star.speed / 100;
            star.checkBoundaries();

        }

        var canvas = document.getElementById('starfield');
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, this.X, this.Y);

        for (let i=0; i < this.n_stars; i++){
            this.stars[i].draw();
        }
    }
};


/************************************/
/**** Intro page  *******************/
/************************************/

function onclickLogo(){
    playTrack();
    audioButton();

    starfield = new StarField(100, 3);

    intro_div = document.getElementById('logo-div');
    logo = document.getElementById('logo');
    setTimeout(() => logo.classList.add('fade-out-element'), 2000);
    

    text = document.getElementById('quote');
    text.classList.add('fade-out-element');
    auth = document.getElementById('author');
    auth.classList.add('fade-out-element');

    setTimeout(() => intro_div.remove(), 4000);
    setTimeout(() => starfield.spawn(), 3000);
    setTimeout(() => window.requestAnimationFrame(draw), 3000);


}

function playTrack(){
    var backtrack = document.getElementById('backtrack');
    backtrack.play();
}

function playButton(){
    var audio_btn = document.getElementById('audio-button');
    var track = document.getElementById('backtrack');
    
    if (audio_btn.classList.contains('play-button')){
        audio_btn.classList.add('stop-button');
        audio_btn.classList.remove('play-button');
        track.pause();
    } else {
        audio_btn.classList.add('play-button');
        audio_btn.classList.remove('stop-button');
        track.play();
    }
}

function selfDestroy(el) {
    var element = el;
    element.remove();
}

function audioButton(){
    var tag = document.createElement('button');
    tag.setAttribute('id', 'audio-button');
    tag.setAttribute('class', 'play-button');
    tag.classList.add('fade-in-element');
    tag.setAttribute('onclick', 'playButton()');
    document.body.appendChild(tag);
}