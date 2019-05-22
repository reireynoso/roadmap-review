const url = 'http://localhost:3000/animals';
const newAnimalForm = document.querySelector('#create-animal');
const zooAnimals = document.querySelector('#zoo-animals');
const nameField = document.querySelector('#name');
const speciesField = document.querySelector('#species');
const feralField = document.querySelector('#feral');
const hobbyField = document.querySelector('#hobby');
const imageField = document.querySelector('#image');
const animalInfo = document.querySelector('#animal-info');
const edit = document.querySelector('#edit');

const editAnimalForm = document.querySelector('#edit-animal');
const editNameField = document.querySelector('#edit-name');
const editSpeciesField = document.querySelector('#edit-species');
const editFeralField = document.querySelector('#edit-feral');
const editHobbyField = document.querySelector('#edit-hobby');
const editImageField = document.querySelector('#edit-image');

const displayName = document.querySelector('#displayName');
const displayHobby = document.querySelector('#displayHobby');
const displayFerociousness = document.querySelector('#displayFerociousness');
const displaySpecies = document.querySelector('#displaySpecies');
const displayImage = document.querySelector('#displayImage');

let currentAnimal = null;
let currentP = null;

document.addEventListener('DOMContentLoaded',function(){
    console.log('loaded');
    loadAnimals();
    newAnimalForm.addEventListener('submit',newAnimal);
    editAnimalForm.addEventListener('submit',editAnimal);
})

function newAnimal(e){
    e.preventDefault();
    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ferociousness: feralField.value,
            hobby: hobbyField.value,
            image: imageField.value,
            name: nameField.value,
            species: speciesField.value 
          })
    })
    .then(resp => resp.json())
    .then(data => {
        createElement(data);
    })
}

function editAnimal(e){
    e.preventDefault();
    fetch(`${url}/${currentAnimal.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ferociousness: editFeralField.value,
            hobby: editHobbyField.value,
            image: editImageField.value,
            name: editNameField.value,
            species: editSpeciesField.value 
          })
    })
    .then(resp => resp.json())
    .then(animal => {
        displayName.innerText = animal.name;
        displayHobby.innerText = animal.hobby;
        displayFerociousness.innerText = animal.ferociousness;
        displaySpecies.innerText = animal.species;
        displayImage.src = animal.image;
        currentP.innerText = `${animal.name} the ${animal.species}`;
    })
}

function remove(animal){
    fetch(`${url}/${animal.id}`,{
        method: "DELETE"
    })
}

function loadAnimals(){
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        data.forEach(animal => {
            createElement(animal);
        })
    })
}

function createElement(animal){
    let p = document.createElement('p');
    p.innerText = `${animal.name} the ${animal.species}`;
    p.addEventListener('click',function(){
        displayName.innerText = animal.name;
        displayHobby.innerText = animal.hobby;
        displayFerociousness.innerText = animal.ferociousness;
        displaySpecies.innerText = animal.species;
        displayImage.src = animal.image;
        edit.innerText = "Update";
        edit.addEventListener('click',function(){
            currentAnimal = animal;
            currentP = p;
            editNameField.value = animal.name;
            editHobbyField.value = hobby.name;
            editFeralField.value = animal.ferociousness;
            editSpeciesField.value = animal.species;
            editImageField.value = animal.image;
        })
    });
    
    let button = document.createElement('button');
    button.innerText = "Delete";
    button.addEventListener('click',function(){
        remove(animal);
        p.remove();
        button.remove();
    })
    zooAnimals.appendChild(p);
    zooAnimals.appendChild(button);
}