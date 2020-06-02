const ufSelect = document.querySelector('select[name=uf]');
const citySelect = document.querySelector('select[name=city]');
const inputHiddenSelect = document.querySelector('[name="state"]');
let text = '';

function populateUf(){
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(res=> res.json())
        .then(states=>{
            const estados = states
            estados.sort(ordernar);
            createOptions(estados, ufSelect);
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
    text = event.target.options[indexSelected].text

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
        .then(res=> res.json())
        .then(cities=>{
            citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
            createOptions(cities, citySelect);
            citySelect.removeAttribute('disabled');
        });
}


function getAddress(event){
    inputHiddenSelect.value = ''
    const indexSelected = event.target.selectedIndex;
    inputHiddenSelect.value = event.target.options[indexSelected].text + `/${text}`;  
}

ufSelect.addEventListener('change', getCities)
citySelect.addEventListener('change',  getAddress);



function ordernar(a,b){

    if (a.nome < b.nome)
        return -1;
    if (a.nome > b.nome)
        return 1;
    return 0;

}