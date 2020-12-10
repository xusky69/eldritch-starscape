
function draw(){


    var time = new Date();

    if (time.getMinutes() % 2 == 0){
        advance = time.getSeconds();
    }
    else{
        advance = 60 - time.getSeconds();
    };

    var canvas_tag = document.getElementById('circle');
    var ctx = canvas_tag.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 800, 400);
    
    ctx.beginPath();
    ctx.arc(400 - 30 + advance,200,40,0,2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    window.requestAnimationFrame(draw);

}

var canvas_tag = document.createElement('canvas');
canvas_tag.setAttribute('class','circle');
canvas_tag.setAttribute('id','circle');
canvas_tag.width = 800;
canvas_tag.height = 400;

var div_tag = document.getElementById('yolo');
div_tag.appendChild(canvas_tag);

window.requestAnimationFrame(draw);