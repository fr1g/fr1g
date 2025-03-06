// init
let field = document.getElementById('playfield'),
    scores = [],
    currentScore = 0,
    map = [],
    totalGenerated = 0,
    level = 0,
    tries = 0,
    scr = document.getElementById('control').children[0],
    newgame = document.getElementById('control').children[1],
    reset = document.getElementById('control').children[2],
    debugRandomLevel = 3,
    gameStarted = false,
    last = 0,
    toptier = false
    ;


    function updateView(tg, val){
        tg.innerHTML = val;
    }
    function addZero(val){
        val = `${val}`;
        if(val.length < 2) return `0${val}`;
        else return val;
    }


// model
class FieldUnit {
    _html = '<div class="w-16 h-16 border p-1 unit"></div>';
    _status = false;

    constructor(makeit = false){
        if(makeit) {
            this._html = '<div class="w-16 h-16 border p-1 unit"><img draggable="false" class="unit" src="./rat.png" alt=""></div>';
            this._status = true;
        } else {
            this._html = '<div class="w-16 h-16 border p-1 unit"></div>';
            this._status = false;
        }
    }

    get html(){
        return this._html;
    }

    get status(){
        return this._status;
    }

    fire(){
        this._html = '<div class="w-16 h-16 border p-1 unit"><img draggable="false" class="unit" src="./rat.png" alt=""></div>';
        this._status = true; // when a block triggered fire and then mouse shown
    }

    kill(){
        this._html = '<div class="w-16 h-16 border p-1 unit"></div>';
        this._status = false;
    }
}

// event
field.addEventListener('click', (e) => {
    if(!`${e.target.classList}`.includes('unit')) return;
    
    let targ = (e.target.tagName === 'IMG') ? e.target.parentNode : e.target;
    let targ_unit = getUnit(targ);
    if(targ_unit.status){
        targ_unit.kill();
        currentScore ++;
        updateView(scr, currentScore);
        targ.setAttribute('style', 'opacity: 0 !important; cursor: not-allowed; pointer-event: none;');

    }
});

const handlers = {
    start: () => {
        if(gameStarted) return;
        start();
        gameStarted = true;
    },
    end: () => {
        if(!gameStarted) return;
        end();
        gameStarted = false;
    }
}

reset.addEventListener('click', handlers.end );

newgame.addEventListener('click', handlers.start );

scr.addEventListener('click', (e) => {
    if(e.shiftKey){
        gameStarted = true;
        applyField(debugRandomLevel);
    } else console.log('For debug randoming, %cpress shift while clicking this button! \n%cCurrent random on debugRandomLevel: ' + debugRandomLevel, 'color: red', 'color: gray');
});

window.addEventListener('keyup', (e) => {
    let key = (e.key).toLowerCase();
    switch(key){
        case ' ':
            e.preventDefault();
            handlers.start();
            break;
        case 'enter':
            handlers.end();
            break;
        default: return;
    }
});



// game logic
let gameInterval, failedRounds = 0;

async function start(){
    totalGenerated = 0;
    toptier = false;
    // document.getElementById('level-show').innerHTML = `${level}`;
    currentScore = 0;
    level = 1;
    applyField();
    failedRounds = 0;
    after(() => {
        gameInterval = setInterval(() => {
            if(failedRounds === 5) {
                alert("You've failed for 5 rounds!");
                applyField();
                end();
            }
            if(currentScore % 20 === 0 && currentScore !== 0 && !toptier) level ++;
            if(toptier) level = 12;
            console.log(currentScore, last)
            if(currentScore === last) failedRounds ++;
            else failedRounds = 0;
            applyField(level);
            last = currentScore;
            document.getElementById('level-show').innerHTML = `${level}${level >= 12 ? (`(${currentScore / 20})`) : ''}`;
        }, 1234 + level * 10);
    });
}


function end(){
    document.getElementById('level-show').innerHTML = `-`;
    clearInterval(gameInterval);
    scores.push(currentScore);
    updateView(scr, 'Score...');
    updateView(newgame, 'Start Game!');
    updateView(reset, 'Reset?!');
    let date = new Date();
    // is totalgenerated need to minus the level?
    document.getElementById('scoreboard').innerHTML += `<div>#${++tries}</div><div>Level: ${level} ${level >= 12 ? (`(${currentScore / 20})`) : ''}</div><div>${currentScore}</div><div>${((currentScore / (totalGenerated - level)).toFixed(3) * 100).toString().match(/^\d+(?:\.\d{0,2})?/)}% (${totalGenerated - level})</div><div class="col-span-2 text-right">${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${addZero(date.getSeconds())}</div>`
    currentScore = 0;
    applyField();

    let nx = setTimeout(() => {
        applyField();
        clearTimeout(nx);
    }, 300);
}

function applyField(arg = 0){
    if(field.children.length >= 10) field.innerHTML = '';
    getField(arg);
    totalGenerated += arg;
    map.forEach(element => {
        field.innerHTML += element.html;
    });
}

function getField(level = 0, possibility = 0.05){
    let generated = 0;

    try {
        if(map.length > 0) map = [];
        if(level == 0){
            for(let i = 0; i < 64; i++) map.push(new FieldUnit());
        }else{
            let onebefore = false;
            for(let i = 0; i < 64; i++) {   
                let random = Math.random(), 
                    thistime = (onebefore ? false : (random >= (1 - possibility) && generated !== level));
                map.push(new FieldUnit(thistime));
                if(thistime) generated++;
            }
        }

        if(generated !== level && !toptier) getField(level);
        else if(generated !== level && toptier) getField(10);
    } catch (ex) {
        ex => ex;
        if(!toptier) alert(`You've reached the limit of this game: "Maximum call stack size reached!" now the level will fallback to 10 to ensure you can continue playing.`);
        toptier = true;
    } finally {

    }
}

function getUnit(htmlElement){
    let index = Array.from(field.children).indexOf(htmlElement);
    return map[index];
}

function after(callback, eachCount, duration = 3) {
    let remainingTime = duration;
  
    const interval = setInterval(function() {

        // if(gameStarted && remainingTime !== 0){
        //     document.getElementById('count').innerHTML = 0;
        //     return end();
        // }
        if(eachCount) eachCount();
        console.log(`${remainingTime}`);
        document.getElementById('count').innerHTML = remainingTime;
        remainingTime --;
    
        if (remainingTime < 0 || !gameStarted) {
            clearInterval(interval);
            console.log("go!");
            if (typeof callback === 'function' && gameStarted) {
                return callback();
            } else {
                document.getElementById('count').innerHTML = 0;
                return;
            }
      }
    }, 1000);
  }

// wrap-up init
applyField();