class DeclarativeObject {
  constructor(){
    null
  }
}

class PrettyButton extends DeclarativeObject {
"testing docstring"

  create(){
    var tag = document.createElement("button");
    var text = document.createTextNode("Click me");
  
    tag.appendChild(text);
    tag.setAttribute("class","pretty-button");
    // tag.setAttribute("onclick","PrettyButton.testing(3)");
    tag.setAttribute("onclick","selfDestroy(this)");
    
    document.body.appendChild(tag);
  }

}

function selfDestroy(el) {
  var element = el;
  element.remove();
}

btn = new PrettyButton();
btn.create()