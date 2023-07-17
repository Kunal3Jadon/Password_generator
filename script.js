const show = document.querySelector(".len")
const find = document.querySelector("#rang")
const up = document.querySelector("#up");
const lo = document.querySelector("#lo");
const num = document.querySelector("#num");
const symb = document.querySelector("#sym");
const generate = document.querySelector("#generatepswd");
const allcheck = document.querySelectorAll("input[type=checkbox]")
let additional = document.querySelector(".iner");
let up2 = document.querySelector(".up1")
let lo2 = document.querySelector(".lo1")
let num2 = document.querySelector(".num1")
let sym2=document.querySelector(".sym1")
let showw = document.querySelector(".show")
let nso = document.querySelector(".nshow")
let icon = document.querySelector(".icon");
let cpy = document.querySelector(".copy");
let length = 4;
find.value = 4;
let password = ""
let checkcnt = 0;
find.addEventListener('input', (e) => {
    const val = e.target.value;
    find.value = val;
    show.innerText = val;
});

async function copycontent() {
    await navigator.clipboard.writeText(password);
    cpy.innerText = "copied";
    cpy.style.opacity = 1;
    setTimeout(() => {
        cpy.style.opacity = -1;
        cpy.style.transition = "all 50ms normal 50ms";
    }, 2000);
};

icon.addEventListener('click', () =>{
    if (password.length > 0)
        copycontent();
})
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function upp() {
    const val = random(65, 90);
    const uper = String.fromCharCode(val);
    return uper;
}
function low() {
    const val = random(97, 122);
    const lo = String.fromCharCode(val);
    return lo;
}
function numb() {
    const val = random(48, 57);
    const num = String.fromCharCode(val);
    return num;
}
function sym() {
    const str = "~`!@#$%^&*()_-=+?/><:{}|\][';.,"
    const val = random(0, str.length);
    return str[val];
}

function handlechange() {
    checkcnt = 0;
    allcheck.forEach((checkbox) => {
        if (checkbox.checked) {
            checkcnt++;
        }
    });
}
function change(checkbox, id) {
    let clas = null;
    if (id == "up")
        clas = up2
    if (id == "lo")
        clas = lo2
    if (id == "num")
        clas = num2
    if (id == "sym")
        clas=sym2
    if (checkbox.checked) {
        clas.style.transform = "translateX(100%) rotate(360deg)";
        clas.style.transition = "transform 200ms ease 0s";
    }
    else {
        clas.style.transform = "translateX(0%) rotate(360deg)";
        clas.style.transition = "transform 200ms ease 0s";
    }
}
allcheck.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        handlechange();
        change(checkbox,checkbox.id);
    });
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
generate.addEventListener('click', () => {
    if (checkcnt == 0)
        return;

    password = "";
    let funcar = [];
    if (up.checked)
        funcar.push(upp);
    if (lo.checked)
        funcar.push(low);
    if (num.checked)
        funcar.push(numb);
    if (symb.checked)
        funcar.push(sym);
    for (let i = 0; i < funcar.length; i++)
        password += funcar[i]();
    for (let i = 0; i < find.value - funcar.length; i++) {
        let rndm = random(0, funcar.length);
        password += funcar[rndm]();
    }
    password = shuffle(Array.from(password));
    // console.log(password);
    showw.innerText = password;
    nso.style.opacity = 0;
    showw.style.opacity = 1;
    icon.style.opacity = 1;

});
