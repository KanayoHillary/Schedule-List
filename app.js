const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearAll = document.querySelector("#clear");
const itemFilter= document.getElementById('filter');
const formButtton = document.querySelector('button[type=submit]');
let isEditMode=false;

function displayList(e){

    //reverse the array to get ordered output to DOM
    let itemsFromStorage = getItemFromStorage().reverse();

    itemsFromStorage.forEach(item => addItemToDOM(item));
}

//get item from storage
function getItemFromStorage(){
    let itemsFromStorage;

    //checking existing items in local storage
    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}


function submitAddItem(e){
    e.preventDefault();

    let itemsFromStorage = getItemFromStorage();

    //Save user input
    let newItem=itemInput.value;
    
    //input validation
    if( newItem==='' || newItem===' '){
        alert('Please add an item');
        return;
    }
   

     //check for edit mode
    if(isEditMode){
        const itemToEdit= itemList.querySelector('.edit-mode');
        
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false;
    }else{
        if(itemsFromStorage.indexOf(newItem) != -1){
            alert('Item already exist');
            itemInput.value = '';
            formButtton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
            formButtton.style.background = '#333';
            itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
            isEditMode = false;
            return;
        }
    }
    
    
    //Create item DOM element
    addItemToDOM(newItem);

    //add item to storage
    addItemToStorage(newItem)

    itemInput.value='';
    // Add item to DOM
    
    checkUI();

    alert("Task saved!");
  
}


function addItemToDOM(item){
     
    //create items
    const li= document.createElement('li');
    const button= document.createElement('button');
    const icon= document.createElement('i');
    const itemValue= document.createTextNode(item);
    
    //add class names
    button.className= 'remove-item btn-link text-red';
    icon.className='fa-solid fa-xmark';

    //create list item
    button.appendChild(icon);
    li.appendChild(itemValue);
    li.appendChild(button);
    
    //add item to DOM list
    let listNum= itemList.querySelectorAll('li');

    //add new element to top of list
    if(listNum.length < 1){
        itemList.appendChild(li);
       
    }else if (listNum.length >=1){
        listNum[0].insertAdjacentElement('beforebegin',li);
    }

    checkUI();
}


function addItemToStorage(item){
    let itemsFromStorage = getItemFromStorage();

    //add new item to storage array
    itemsFromStorage.unshift(item)

    //convert to JSON string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

//click on list item and work with selected target
function onClickItem(e){

    if(e.target.parentElement.classList.contains("remove-item")){

        removeitem(e.target.parentElement);
    }else {
        updateItem(e.target);
        
    }
}

function updateItem(item){
    isEditMode = true;

    if(isEditMode){

        itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))
    
        item.classList.add('edit-mode');
    
        itemInput.value = item.textContent;
        formButtton.innerHTML = ('<i class="fa-solid fa-pen"></i>  Update Item');
        formButtton.style.background= '#228B22';
    }
}

////////////////....
function removeitem(item){
    // checking the clicked item
    if (confirm('Are you sure?')) {
        // Remove item from DOM
        item.parentElement.remove();

        // Remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
       
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemFromStorage();
    
  
    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  
    // Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//clear all button function
function removeAll(e){
    if(confirm("Are you sure?")){
        //convert html collection to array and loop
        Array.from(itemList.children).forEach(element => {
            element.remove();
           
            localStorage.clear();

        });
        checkUI();
    }
}

function checkUI(){
    itemInput.value='';

    const items= itemList.querySelectorAll('li');
    if(items.length === 0){
        itemFilter.style.display='none';
        clearAll.style.display='none';
    }
    else if(items.length === 1){
        itemFilter.style.display='none';
        clearAll.style.display='block';
    }else{
        itemFilter.style.display='block';
        clearAll.style.display='block';
    }

    isEditMode=false; 
    formButtton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formButtton.style.background = '#333';
   
}

//search list from search item section
function filterList(e){
    let text=e.target.value.toLowerCase();
    let items= itemList.querySelectorAll('li');
    items.forEach(item=>{
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.includes(text)){
            item.style.display='flex';
        }else{
            item.style.display='none';
        }

    });
    

}


// console.log();
//Event listeners
function init(){
    itemForm.addEventListener('submit', submitAddItem);
    itemList.addEventListener('click', onClickItem);
    clearAll.addEventListener('click', removeAll);
    itemFilter.addEventListener('keyup', filterList);
    document.addEventListener('DOMContentLoaded', displayList);
    checkUI();
}


init();



