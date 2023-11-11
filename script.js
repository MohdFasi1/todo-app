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
let buttons = document.querySelectorAll('.edit');
onload = function () {
    let dataLs = JSON.parse(localStorage.getItem('data'));
    if (localStorage.length > 0) {
        listval = dataLs;
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

function pushLS(){
    localStorage.setItem('data', JSON.stringify(listval));
}

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
else if(titleval.length > 0 && descval.length <= 0) {
    alert('please add description');
    desc.style.border = '2px solid red';
}
else if(descval.length > 0 && titleval.length <= 0) {
    alert('please add title');
    title.style.border = '2px solid red';
}
else{
    alert('Please add title and description');
    desc.style.border = '2px solid red';
    title.style.border = '2px solid red';
}}

function displaycontent() {
    let items = listval.map((e,i) => {
        let elem = `<div>
        <h1>${e.title}</h1>
        <h3>${e.desc}</h3>
        <button onclick="edit(${i})"><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></button>
        <button onclick="remove(${i})"><i class="fa fa-trash fa-2x" aria-hidden="true"></i></button></div>`
        return elem
    })
    content.innerHTML = items.join('')
}



function remove(i) {
    listval.splice(i, 1);
    pushLS();
    displaycontent();
}



function edit(i){
    ip.style.display = 'flex';
    title.value = listval[i].title
    desc.value = listval[i].desc
    btn.setAttribute('onclick',`editdone(${i})`);
    btn.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>Edit';
}
function editdone(i){
    titleval = title.value;
    descval = desc.value;
    if(titleval.length > 0 && descval.length > 0) {
    listval[i].title = titleval;
    listval[i].desc = descval;
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

title.addEventListener('click',()=>title.style.border = "1px solid black")
desc.addEventListener('click',()=>desc.style.border = "1px solid black")
