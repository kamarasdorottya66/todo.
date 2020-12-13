(function(){


    const bodyDay = document.querySelector('.body__day');
    const bodyDate = document.querySelector('.body__date');
    const todoAddBtn = document.querySelector('.todo__btn');
    const todoInput = document.querySelector('.todo__input');
    const todoListPending = document.querySelector('.todo__list--pending');


    const dayNames = ['Sunday', 'Monday', 'Tuesday' , 'Wednesday', 'Thursday', 'Firday', 'Saturday'];

    const localDB = {
        setItem(key, value) {
            value = JSON.stringify(value);
            localStorage.setItem(key, value);
        },
        getItem(key) {
            const value = localStorage.getItem(key);
            if(!value){
                return null;
            }

            return JSON.parse(value);
            
        },
        removeItem(key) {
            localStorage.removeItem(key);
           
        }
    };

    const init = () => {
        const savedTodos = localDB.getItem('todos');
        if (savedTodos){
todos = savedTodos;
        }
showDate();
setListeners();

    };

    const showDate = () => {
        const currentDate = new Date();
        const day = [ 
                     currentDate.getMonth() + 1, 
                     currentDate.getDate(),
                     currentDate.getFullYear() 
        ].map( num => num < 10 ? `0${num}` : num );

        bodyDay.textContent = dayNames[currentDate.getDay()];

        bodyDate.textContent = day.join('-');
         };

         const setListeners = () => {
todoAddBtn.addEventListener('click', addNewTodo);
         };

 const addNewTodo = () => {
     const value = todoInput.value;

if(value === '') {
    
    return;
};

 const todo = {
     text: value,
     done: false
 };

 todos.push(todo);

 localDB.setItem('todos', todos);


 };

 const showTodo = todo => {
 const todoItem = document.querySelector('div');
 todoListPending.appendChild(todoItem);

 todoItem.innerHTML = `
   <input type="checkbox">
   <span>${todo.text}</span>
   <button> 
   <i class="fa fa-trash"></i>
   </button>
 

 `;

 };
   

    init();

})();