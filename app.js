const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

function addItem(e){
    e.preventDefault();

    //create items
    let newItem=itemInput.value;
    const li= document.createElement('li');
    const button= document.createElement('button');
    const icon= document.createElement('i');
    const itemValue= document.createTextNode(newItem);
    
    //add class names
    button.className= 'remove-item btn-link text-red';
    icon.className='fa-solid fa-xmark';

    //input validation
    if( newItem==='' || newItem===' '){
        alert('Please add an item');
        return;
    }
        
    //create list item
    button.appendChild(icon);
    li.appendChild(itemValue);
    li.appendChild(button);
    

    //add item to DOM list
    itemList.appendChild(li);

}

itemForm.addEventListener('submit', addItem);
