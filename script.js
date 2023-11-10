let title = document.querySelector('#title');
let desc = document.querySelector('#desc');
let btn = document.querySelector('#btn');
let content = document.querySelector('.container');
let clk = document.querySelector('.time')
let ip = document.querySelector('.ip');
let cancel = document.querySelector('#cancel');
var listval = [];
let div;
let temparr = [];
let titleval;
let descval;
let objval;
let i;
onload = function () {
    let dataLs = JSON.parse(localStorage.getItem('data'));
    if (localStorage.length > 0) {
        listval = dataLs.map((e) => {return {"title": e.title,"desc": e.desc}})
        displaycontent();
    }
    timesetter();
}
function timesetter(){
    temp = new Date()
    let montharr = ['january', 'february', 'march', 'april','may', 'june', 'july', 'august', 'september', 'october','november', 'december']
    clk.innerHTML = `<h2>Today</h2> <h3>${montharr[temp.getMonth()]} ${temp.getDate()} ${temp.getFullYear()}</h3>`;
}   
function addtodo(){
    ip.style.display = "flex";
}
cancel.addEventListener("click",()=>{
    ip.style.display = "none";
    title.value = "";
    desc.value = "";
});


function addbtn(){
    titleval = title.value;
    descval = desc.value;
    if(titleval.length > 0 && descval.length > 0) {
    objval = { "title": titleval, "desc": descval };
    listval.push(objval);
    pushLS();
    title.value = '';
    desc.value = '';
    displaycontent();
    ip.style.display = 'none';
}
else{
    alert('Please add title and description');
}}

function displaycontent() {
    let items = listval.map((e) => {
        let elem = `<div>
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
        <button onclick="edit()"><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></button>
        <button onclick="remove()"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></button></div>`
        return elem
    })
    content.innerHTML = items.join('')
}



function remove() {
    getindex()
    listval.splice(getindex(), 1)
    localStorage.setItem('data', JSON.stringify(listval));
    displaycontent();
}
function pushLS(){
    localStorage.setItem('data', JSON.stringify(listval));
}

function getindex(){
    div = document.querySelector('.container div:has(button:focus)')
    temparr = div.innerText.split('\n')
let index = listval.findIndex(item => item.title === temparr[0] && item.desc === temparr[1])
return index
}
function edit(){
    ip.style.display = 'flex';
    i = getindex();
    title.value = temparr[0];
    desc.value = temparr[1];
    btn.setAttribute('onclick',"editdone()");
    btn.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>Edit';
}
function editdone(){
    titleval = title.value;
    descval = desc.value;
    if(titleval.length > 0 && descval.length > 0) {
    objval = { "title": titleval, "desc": descval };
    listval[i]=objval;
    pushLS();
    displaycontent();
    ip.style.display = 'none'; 
}
else {
    ip.style.display = 'none';
}
title.value = '';
desc.value = '';
btn.setAttribute('onclick',"addbtn()");
btn.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i>Add ToDo';
}
