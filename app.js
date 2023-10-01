const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearAll = document.querySelector("#clear");
const itemFilter= document.getElementById('filter');


function submitAddItem(e){
    e.preventDefault();

    //
    let newItem=itemInput.value;
    
    //input validation
    if( newItem==='' || newItem===' '){
        alert('Please add an item');
        return;
    }
    
    //Create item DOM element
    addItemToDOM(newItem);

    //add item to storage
    addItemToStorage(newItem)

    itemInput.value='';
    // Add item to DOM

    checkUI();
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
    itemList.appendChild(li);
}

function addItemToStorage(item){
    let itemsFromStorage;

    //checking existing items in local storage
    if(localStorage.getItem('items') == null){
        itemsFromStorage = [];
    }else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    //add new item to storage array
    itemsFromStorage.push(item)

    //convert to JSON string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}



function removeItem(e){
    let removeButton= e.target;
    // checking the clicked item
    if(removeButton.className === "fa-solid fa-xmark") {
        //Navigating to the parent(list item)
        if(confirm('Remove \"'+removeButton.parentElement.parentElement.textContent+'\"?')){
            removeButton.parentElement.parentElement.remove();
        }
    }
    checkUI();    
}

function removeAll(e){
    if(confirm("Are you sure?")){
        //convert html collection to array and loop
        Array.from(itemList.children).forEach(element => {
            element.remove();

            checkUI();
        });
    }
}

function checkUI(){
    const items= itemList.querySelectorAll('li');
    if(items.length === 0){
        itemFilter.style.display='none';
        clearAll.style.display='none';
    }else if(items.length <= 1){
        itemFilter.style.display='none';
        clearAll.style.display='block';
    }else{
        itemFilter.style.display='block';
        clearAll.style.display='block';
    }
}

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
itemForm.addEventListener('submit', submitAddItem);
itemList.addEventListener('click', removeItem);
clearAll.addEventListener('click', removeAll);
itemFilter.addEventListener('keyup', filterList);
checkUI();



