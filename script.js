/************************************/
/**** starscape *********************/
/************************************/

function randomInt(min_val, max_val){
    let num = min_val + (max_val-min_val + 1)*Math.random();
    return Math.floor(num);
};

function distanceR2(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

function windowResize() {
    var canvas = document.getElementById('starfield');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
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

    page_objects['starfield'].update();
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

    spawn(){

        var div_tag = document.createElement('div');
        div_tag.setAttribute('id', 'div-starfield');
        div_tag.setAttribute('class', 'div-starfield');
        var canvas_tag = document.createElement('canvas');
        canvas_tag.setAttribute('id', 'starfield');
        canvas_tag.width = this.X;
        canvas_tag.height = this.Y;

        // window.addEventListener('resize', windowResize);
    
        document.body.appendChild(div_tag);
        div_tag.appendChild(canvas_tag);

        for (let i=0; i < this.n_stars; i++){
            this.stars[i].checkBoundaries();
            this.stars[i].draw();
        }

        // let div_tag = document.getElementById('div-starfield');
        setTimeout(() => {div_tag.classList.add('fade-out-element')}, 10000)
        setTimeout(() => {canvas_tag.remove(); div_tag.remove()}, 12000);
        setTimeout(() => new Symbol(), 13000);
    
    };

    update(){

        for (let i = 0; i < this.n_stars; i++) {

            var star = this.stars[i];
            var increment = Math.min(star.speed, Math.abs(star.speed / star.slope));
            star.x += (star.x > 0) ? increment : -increment ;
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

    constructor(n_stars, max_speed){

        this.n_stars = n_stars
        this.X = window.screen.width;
        this.Y = window.screen.height;

        this.stars = [];

        for (let i=0; i < n_stars; i++){

            this.stars[i] = new Star(this.X, this.Y, max_speed);
            // console.log(this.stars[i].x)
        }
    }
};

class Symbol{
    constructor(){
        this.symbol_tag = document.createElement('img');
        this.symbol_tag.setAttribute('id', 'symbol');
        this.symbol_tag.setAttribute('src', 'media/symbol.png');
        this.symbol_tag.setAttribute('alt', 'missing image');
        document.body.appendChild(this.symbol_tag);
    }
};


/************************************/
/**** Intro page  *******************/
/************************************/

class CthulhuLogo{

    constructor(){

        this.div_tag = document.createElement('div');
        this.div_tag.setAttribute('id', 'logo-div');
        this.div_tag.setAttribute('class', 'centered-element');
        
        this.img_tag = document.createElement('img');
        this.img_tag.setAttribute('id', 'logo');
        this.img_tag.setAttribute('src', 'media/logo.png');
        this.img_tag.addEventListener('click', this.onClick);

        this.text_tag = document.createElement('p');
        this.text_tag.setAttribute('class', 'quote-text');
        this.text_tag.setAttribute('id', 'quote');
        this.text_tag.innerHTML = `
        "The most merciful thing in the world, I think, 
        is the inability of the human mind to correlate all its contents. 
        We live on a placid island of ignorance in the midst of black seas of infinity, 
        and it was not meant that we should voyage far."`;

        this.quo_tag = document.createElement('p');
        this.quo_tag.setAttribute('id', 'author');
        this.quo_tag.setAttribute('class', 'quote-text');
        this.quo_tag.innerHTML = 'H.P. Lovecraft' ;

        this.div_tag.appendChild(this.img_tag);
        this.div_tag.appendChild(this.text_tag);
        this.div_tag.appendChild(this.quo_tag);
        document.body.appendChild(this.div_tag);
    }

    onClick(){

        page_objects['audio_button'] = new AudioButton();
    
        var starfield = page_objects['starfield'] = new StarField(100, 3);
    
        var intro_div = document.getElementById('logo-div');
        var logo = document.getElementById('logo');
        setTimeout(() => logo.classList.add('fade-out-element'), 1750);
    
        var text = document.getElementById('quote');
        text.classList.add('fade-out-element');
        var auth = document.getElementById('author');
        auth.classList.add('fade-out-element');
    
        setTimeout(() => intro_div.remove(), 4000);
        setTimeout(() => starfield.spawn(), 3000);
        setTimeout(() => window.requestAnimationFrame(draw), 3000);
    }

};

class AudioButton{
    constructor(){

        this.audio_tag = document.createElement('audio');
        this.audio_tag.setAttribute('id', 'backtrack');
        this.audio_tag.setAttribute('src', 'media/track.mp3');

        this.btn_tag = document.createElement('button');
        this.btn_tag.setAttribute('id', 'audio-button');
        this.btn_tag.setAttribute('class', 'play-button');
        this.btn_tag.classList.add('fade-in-element');
        // this.btn_tag.setAttribute('onclick', 'playButton()');
        
        this.btn_tag.addEventListener('click', () => {var self = this; self.onClick();});
        this.your_mom = 3;

        document.body.appendChild(this.audio_tag);
        document.body.appendChild(this.btn_tag);

        var backtrack = document.getElementById('backtrack');
        backtrack.play();
        
    }

    onClick(){
        if (this.btn_tag.classList.contains('play-button')){
            this.btn_tag.classList.add('stop-button');
            this.btn_tag.classList.remove('play-button');
            this.audio_tag.pause();
        } else {
            this.btn_tag.classList.add('play-button');
            this.btn_tag.classList.remove('stop-button');
            this.audio_tag.play();
        }
    }

};

var page_objects = {};
page_objects['logo'] = new CthulhuLogo();