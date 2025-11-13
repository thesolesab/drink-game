const wheel = document.querySelector('.wheel');
const spin = document.getElementById('spin');
const counter = document.querySelector('.count');
const duration = document.querySelector('#duration');
const list = document.querySelector('#todos');
const newTodo = document.querySelector('#newTodo');
const addTodo = document.querySelector('.add');
const clearTodo = document.querySelector('.clear');
const exportTodo = document.querySelector('#export');
const importTodo = document.querySelector('#importInput');

let number = Math.ceil(Math.random() * 1000);
let dur = duration.value;
let curAng = 0;
let todos = [];
let wheelD = getWheelD();

// Helper Functions
function getWheelD() {
    const wheelD = Math.floor(Math.min(
        document.querySelector('.canvas-container').clientHeight,
        document.querySelector('.canvas-container').clientWidth
    ) * 0.9);
    document.documentElement.style.setProperty('--d-wheel', `${wheelD}px`);
    return wheelD;
}

function getPoints(rotationAngle, totalElements) {
    const normalizedAngle = ((rotationAngle % 360) + 360) % 360;
    const segmentSize = 360 / totalElements;
    let elementIndex = Math.floor((normalizedAngle + segmentSize / 2) % 360 / segmentSize);
    return elementIndex;
}

function getRandomLightColorHSL() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 20;
    const lightness = Math.floor(Math.random() * 20) + 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function hideSpin() {
    spin.disabled = true;
    spin.style.opacity = 0;
    spin.style.zIndex = 0;
}

function hideWheel() {
    wheel.style.width = '';
    wheel.style.height = '';
    wheel.style.transition = 'all 1s 1s';
    wheel.style.border = '0.1px solid'
    setTimeout(()=>{
        wheel.style.border = 'initial'
    },2300)
    document.querySelector('.arrow').style.opacity = 0;
    document.querySelector('.arrow').style.transition = 'all 1s';
}

function unHideSpin() {
    spin.disabled = false;
    spin.style.opacity = 1;
    spin.style.zIndex = 10;
}

function unHideWheel() {
    wheel.style.width = `${wheelD}px`;
    wheel.style.height = `${wheelD}px`;
    wheel.style.transition = 'all 1s';
    wheel.style.border = '15px solid'
    document.querySelector('.arrow').style.opacity = 1;
    document.querySelector('.arrow').style.transition = 'all 1s 1s';
}

function setOneTodoStyle(div) {
    div.style.width = '100%';
    div.style.height = "100%";
    div.style.transform = 'translate(-50%)';
    div.style.writingMode = 'initial';
    console.log((/\n/g).test(div.dataset.text));
    div.style.whiteSpace = 'pre-line'
    div.style.padding = '10%'
    div.textContent = div.dataset.text;
}

function setManyTodoStyle(div, n, w, r) {
    div.style.width = w + "px";
    div.style.height = '';
    div.style.writingMode = '';
    div.style.transform = `translateX(-50%) rotate(-${r}deg)`;
    if (n > 2) {
        div.style.clipPath = `polygon(100% 0, 50% 100%, 0 0)`;
    } else {
        div.style.clipPath = '';
    }
    if (div.dataset.text.length > 10) {
        div.textContent = div.dataset.text.substr(0, 10) + '...';
    }
}

function getDefaultParams() {
    const n = todos.length;
    const defParams = {
        n,
        r: 0,
        todosNodes: wheel.childNodes,
        w: n > 2 ? Math.ceil((wheelD / 2) / Math.tan((Math.PI / 180) * (180 - (360 / n) / 2 - 90))) * 2 : wheelD
    };
    return defParams;
}

function drawTodoList() {
    list.value = todos.map((el, i) => `${i + 1}: ${el}`).join('\n\n');
}

function addNewTodo(newTodo) {
    let { n, todosNodes, r, w } = getDefaultParams();
    drawTodoList();

    if (n >= 1) unHideWheel();

    const div = document.createElement('div');
    div.style.width = w + "px";
    div.style.backgroundColor = getRandomLightColorHSL();
    div.dataset.text = newTodo;
    div.textContent = newTodo.length > 10 ? newTodo.substr(0, 10) + '...' : newTodo;

    if (todosNodes.length === 0) {
        setOneTodoStyle(div);
    } else {
        for (const el of todosNodes) {
            setManyTodoStyle(el, n, w, r);
            r += 360 / n;
        }
        setManyTodoStyle(div, n, w, r);
        unHideSpin();
    }
    wheel.append(div);
}

function removeTodo(index) {
    todos.splice(index, 1);
    drawTodoList();
    let { n, todosNodes, r, w } = getDefaultParams();
    todosNodes[index].remove();

    if (n === 1) {
        setOneTodoStyle(todosNodes[0]);
    } else {
        for (const el of todosNodes) {
            setManyTodoStyle(el, n, w, r);
            r += 360 / n;
        }
    }
}

// Event Handlers
spin.onclick = function() {
    if (todos.length > 1) {
        const n = todos.length;
        number += Math.ceil(Math.random() * dur * 1000);
        wheel.style.transition = '';
        wheel.style.transform = `rotate(${number}deg)`;
        hideSpin();

        const int = setInterval(() => {
            duration.value = +duration.value - 1;
            if (duration.value == 0) {
                clearInterval(int);
                setTimeout(() => {
                    duration.value = dur;
                    const win = getPoints(number, n);
                    alert(`И вот что тебе выпало:\n${wheel.childNodes[win].dataset.text}`);
                    counter.childNodes[0].textContent = +counter.childNodes[0].textContent - 1;
                    removeTodo(win);
                    if (n > 2) {
                        unHideSpin();
                    } else {
                        wheel.style.transform = `rotate(${number + 360 - number % 360}deg)`;
                    }
                }, 300);
            }
        }, 1000);
    }
};

clearTodo.onclick = function() {
    todos = [];
    list.value = '';
    wheel.innerHTML = ``;
    counter.childNodes[0].textContent = 0;
    hideWheel();
    hideSpin();
};

addTodo.onclick = function() {
    if (!newTodo.value) return;
    todos.push(newTodo.value);
    addNewTodo(newTodo.value);
    counter.childNodes[0].textContent = todos.length - 1;
    newTodo.value = '';
    newTodo.focus();
};

exportTodo.onclick = function() {
    if (todos.length === 0) return alert('nothing to export');

    const blob = new Blob([JSON.stringify(todos)], { type: 'aplication/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drink-game.json';
    a.click();
};

importTodo.onchange = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            todos.push(...JSON.parse(e.target.result));
            counter.childNodes[0].textContent = todos.length - 1;
            JSON.parse(e.target.result).forEach(todo => addNewTodo(todo));
            alert('Настройки применены');
        } catch (error) {
            alert('Ошибка чтения файла');
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsText(file);
};

duration.oninput = function(e) {
    if (!+e.target.value || +e.target.value > 999) {
        duration.value = dur;
        return;
    } else {
        dur = duration.value;
        document.documentElement.style.setProperty('--delay-time', `${dur}s`);
    }
};

// Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo.click();
    }
});

window.onresize = () => {
    wheelD = getWheelD();
    if (todos.length > 0) unHideWheel();
};