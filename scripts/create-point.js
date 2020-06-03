const ufSelect = document.querySelector('select[name=uf]');
const citySelect = document.querySelector('select[name=city]');
const inputHiddenSelect = document.querySelector('[name="state"]');
const itensList = document.querySelectorAll('.items-grid li');
const SelectedItemsInput = document.querySelector('input[name=items]');
const buttonSend = document.querySelector('button[type=submit]');
const form = document.querySelector('form');
let selectedItems = [];


function populateUf(){
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(res=> res.json())
        .then(states=>{
            const estados = states
            estados.sort(ordernar);
            for(estado of estados){
                ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`;
            };
        });
        
};

function createOptions(options, element){
    for(option of options){
        element.innerHTML += `<option value="${option.id}">${option.nome}</option>`;
    };
}

populateUf();

function getCities(event){
    const id = event.target.value;
    const indexSelected = event.target.selectedIndex;
    inputHiddenSelect.value = event.target.options[indexSelected].text;
    citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
    citySelect.disabled = true;

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
        .then(res=> res.json())
        .then(cities=>{
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            };
            citySelect.disabled = false;
        });
}


ufSelect.addEventListener('change', getCities);



function ordernar(a,b){

    if (a.nome < b.nome)
        return -1;
    if (a.nome > b.nome)
        return 1;
    return 0;

}

for (const item of itensList){
    item.addEventListener('click', handleSelectionItem);
}

function handleSelectionItem(event){
    const itemLi = event.target;
    const itemId = itemLi.dataset.id;

    itemLi.classList.toggle('selected');

    const selectedItemNow = selectedItems.findIndex(item=> item== itemId);

    if(selectedItemNow >=0 ){
        const filteredItems = selectedItems.filter(item=> item !=itemId);
        selectedItems = filteredItems;
    }else{
        selectedItems.push(itemId);
    };

    SelectedItemsInput.value = selectedItems;
}

function handleSendDatas(){
    if(SelectedItemsInput.value == "" || SelectedItemsInput.value == null){
        alert('Selecione ao menos um item de coleta!');
        return false;
    };
}

form.onsubmit = handleSendDatas;