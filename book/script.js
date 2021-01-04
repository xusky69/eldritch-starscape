class Symbol{
    constructor(fast = false){

        this.div_tag = document.createElement('div');
        this.div_tag.setAttribute('class', 'centered-element');
        this.fast = fast;

        if (fast) {
            this.div_tag.classList.add('fade-in-element-2');
        }
        else{
            this.div_tag.classList.add('fade-in-element');
        }

        this.img_tag = document.createElement('img');
        this.img_tag.setAttribute('id', 'symbol');
        this.img_tag.setAttribute('src', 'media/symbol.png');

        this.azatoth_tag = document.createElement('p');
        this.azatoth_tag.setAttribute('class', 'god-name');
        this.azatoth_tag.setAttribute('id', 'azatoth-name');
        this.azatoth_tag.innerHTML = `Azatoth`;
        this.azatoth_tag.addEventListener('click', () => {var self = this; self.onClickAzatoth();});

        this.nyarlathotep_tag = document.createElement('p');
        this.nyarlathotep_tag.setAttribute('class', 'god-name');
        this.nyarlathotep_tag.setAttribute('id', 'nyarlathotep-name');
        this.nyarlathotep_tag.innerHTML = `Nyarlathotep`;
        this.nyarlathotep_tag.addEventListener('click', () => {var self = this; self.onClickNyarlathotep();});

        this.div_tag.appendChild(this.img_tag);
        this.div_tag.appendChild(this.azatoth_tag);
        this.div_tag.appendChild(this.nyarlathotep_tag);

        document.body.appendChild(this.div_tag);

    }

    onClickAzatoth(){
        if (this.fast){
            this.div_tag.classList.remove('fade-in-element-2');
        }
        else{
            this.div_tag.classList.remove('fade-in-element');
        }
        
        this.div_tag.classList.add('fade-out-left');
        setTimeout(() => this.div_tag.style.display = 'none', 600);
        setTimeout(() => page_objects['arrow'] = new Arrow(), 350);
        setTimeout(() => page_objects['book'] = new Azatoth(), 350);
        
    }

    onClickNyarlathotep(){
        if (this.fast){
            this.div_tag.classList.remove('fade-in-element-2');
        }
        else{
            this.div_tag.classList.remove('fade-in-element');
        }
        this.div_tag.classList.add('fade-out-right');
        setTimeout(() => this.div_tag.style.display = 'none', 600);
        setTimeout(() => page_objects['arrow'] = new Arrow(), 350);
        setTimeout(() => page_objects['book'] = new Nyarlathotep(), 350);
    }
}

class Arrow{
    constructor(){
        this.tag = document.createElement('button');
        this.tag.setAttribute('id', 'arrow');
        this.tag.classList.add('fade-in-element-2');
        this.tag.addEventListener('click', () => {var self = this; self.onClick();});
        document.body.appendChild(this.tag);        
    }

    onClick(){
        this.tag.classList.add('fade-out-element-2');
        setTimeout(() => page_objects['symbol'] = new Symbol(true), 300);
        setTimeout(() => this.tag.style.display = 'none', 500);
        page_objects['book'].fade();
    }
}

class Nyarlathotep{
    constructor(){

        this.div_tag = document.createElement('div');
        this.div_tag.classList.add('centered-element');
        this.div_tag.classList.add('fade-in-left');
        
        this.img_tag = document.createElement('img');
        this.img_tag.setAttribute('src', 'media/nyarlathotep.jpg');
        this.img_tag.classList.add('picture');

        this.ban_tag = document.createElement('img');
        this.ban_tag.setAttribute('src', 'media/nyarlathotep_banner.png');
        this.ban_tag.classList.add('banner');

        this.text_tag = document.createElement('p');
        this.text_tag.innerHTML = `
        "My memories fade by the hour; soon I will remember nothing, soon I will be empty of all
        vestiges of humanity. And as I hang here, suspended in time and space as I shall be for all eternity, I
        feel something akin to contentment. I have peace here, a greater peace than the dead will ever
        know; but this peace is disturbed by one barely remembered thought, and I am glad that soon it will
        be put from my mind for ever. I do not remember how I know this, but I am more certain of it than
        of my own existence. Nyarlathotep no longer walks the surface of Sharnoth, he no longer holds
        court in his great black palace, for that beam of light that journeyed into the dark aether carried with
        it the scourge of mankind.
        <br /><br />
        
        In a small dimly lighted attic room a body stirs and raises itself to its feet. His eyes burn like
        smouldering black coals, and across his face plays a dreadful enigmatic smile; and as he surveys the
        roofs of the city through the small dormer window, his arms rise in a gesture of triumph.
        <br /><br />
        
        He has passed through the barriers set upon him by the Elder Gods; he is free, free to walk the
        earth once more, free to twist men's minds and enslave their souls. It was I who gave him his chance
        of escape, I, through my insane quest for power, supplied him with the means he needed for his
        return to earth."
        
        <p style="text-align:right;">The Black Tome of Alsophocus</p>
        `;

        this.text_tag.classList.add('text-box');

        this.div_tag.appendChild(this.img_tag);
        this.div_tag.appendChild(this.ban_tag);
        this.div_tag.appendChild(this.text_tag);
        
        document.body.appendChild(this.div_tag);
    }

    fade(){
        this.div_tag.classList.remove('fade-in-right');
        this.div_tag.classList.add('fade-out-element-2');
        setTimeout(() => this.div_tag.style.display = 'none', 500);
    }

}

class Azatoth{
    constructor(){

        this.div_tag = document.createElement('div');
        this.div_tag.classList.add('centered-element');
        this.div_tag.classList.add('fade-in-right');
        
        this.img_tag = document.createElement('img');
        this.img_tag.setAttribute('src', 'media/azathoth.jpg');
        this.img_tag.classList.add('picture');

        this.ban_tag = document.createElement('img');
        this.ban_tag.setAttribute('src', 'media/azathoth_banner.png');
        this.ban_tag.classList.add('banner');

        this.text_tag = document.createElement('p');
        this.text_tag.innerHTML = `
        "When age fell upon the world, and wonder went out of the minds of men; 
        when grey cities reared to smoky skies tall towers grim and ugly; 
        in whose shadow none might dream of the sun or of spring's flowering meads; 
        when learning stripped earth of her mantle of beauty, 
        and poets sang no more save of twisted phantoms seen with bleared and inward-looking eyes; 
        when these things had come to pass, and childish hopes had gone away forever, 
        there was a man who travelled out of life on a quest into the spaces whither the world's dreams had fled."
        
        <p style="text-align:right;">Azatoth</p>
        `;

        this.text_tag.classList.add('text-box');
        this.div_tag.appendChild(this.img_tag);
        this.div_tag.appendChild(this.ban_tag);
        this.div_tag.appendChild(this.text_tag);
        
        document.body.appendChild(this.div_tag);
    }

    fade(){
        this.div_tag.classList.remove('fade-in-right');
        this.div_tag.classList.add('fade-out-element-2');
        setTimeout(() => this.div_tag.style.display = 'none', 500);
    }

}

var page_objects = [];
page_objects['symbol'] = new Symbol();