const btnSearch = document.querySelector('#btn-search');
const modal = document.querySelector('#modal');
const btnClose = document.querySelector('#modal .header a');

btnSearch.addEventListener('click', showModal);
btnClose.addEventListener('click', showModal);


function showModal(){
    modal.classList.toggle('hidden');
}