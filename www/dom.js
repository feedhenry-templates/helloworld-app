/*
  This file contains all DOM manipulation related functionality
 */

/*
  Retrieves a template, and renders it's content
  replacing all {{placeholders}} with params
 */
function tpl(id, params){
  var tplHtml = document.getElementById(id).innerHTML;
  for (var key in params){
    if (params.hasOwnProperty(key)){
      tplHtml = tplHtml.replace('{{' + key + '}}', params[key]);
    }
  }
  return tplHtml;
}

/*
  Shows the loading spinner, uses the listTodos() function to call server-side 
  then draws every Todo entry received
 */
function drawTodoList(){
  var loadingText = tpl('listItem', {name : "Loading list..."});
  var todoListUlElement = document.getElementById("todoList");
  todoListUlElement.innedHTML = loadingText;
  listTodos(function(err, todoItems){
    if (err){
      return alert('An error occured: ' + err);
    }
    todoListUlElement.innerHTML = '';
    if (!todoItems || !todoItems.list || todoItems.list.length ===0){
      var emptyText = tpl('listItem', {name : "No items found", id : "empty"});
      todoListUlElement.innerHTML = emptyText;
      return;
    }
    todoItems.list.forEach(function(todoItem){
      var name = todoItem.fields.name;
      var id = todoItem.guid;
      var todoItemElement = tpl('listItem', {name : name, id : id});
      var appendedElement = todoListUlElement.innerHTML += todoItemElement;
    });
    // bind an event handler to the <UL>, everything clicked inside will get handled
    todoListUlElement.onclick = todoClicked;
  });
}

/*
 Decides if a user wants to edit or delete (i.e. mark as done)
 a todo
 */
function todoClicked(e){
  var el = e.target;
  var tagName = el.tagName.toLowerCase(),
  type = el.type;
  if (tagName === "input" && el.id == "todoInput"){
    return;
  }
  if (tagName !== 'li'){
    el = el.parentElement;
  }
  if (type === "checkbox"){
    return deleteTodo(el.id, function(err){
      if (err){
        return alert('An error occured deleting your Todo: ' + code + ' : ' + errorprops);
      }
      el.remove();
    });  
  }
  return editTodo(el);
}

/*
 Replaces the Todo row with an input box
 */
function editTodo(el){
  var todoText = el.innerHTML.replace(/<.+>/, '');
  var todoItemEditElement = tpl('listEditItem', { name : todoText, id : el.id });
  el.innerHTML = todoItemEditElement;
  var editInput = document.getElementById('todoInput');
  editInput.addEventListener("blur", function(e){
    var parentLi = editInput.parentElement;
    updateTodo(parentLi.id, editInput.value, function(err){
      if (err){
        return alert('An error occured updating your Todo: ' + err);
      }
      drawTodoList();
    });
  });
  editInput.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) { // user pressed the enter/submit key
      editInput.blur();
    }
  });
  editInput.focus();
}

/* 
  Creates the input box & binds event listeners whenever the add link is clicked
 */
document.getElementById('addLink').onclick = function(e){
  e.preventDefault(); // prevent focusing the link
  
  var todoListUlElement = document.getElementById("todoList");
  var input = document.getElementById('todoInput');
  if (input){
    // Don't recreate the input element for new todo items
    input.focus();
    return;
  }
  var todoItemElement = tpl('listEditItem', { name : '' });
  todoListUlElement.innerHTML += todoItemElement;
  input = document.getElementById('todoInput');
  input.focus();
  
  input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) { // user pressed the enter/submit key
      input.blur();
    }
  });
  // when leaving the input, commit the change
  input.addEventListener("blur", function(){
    if (input.value === ""){
      return;
    }
    input.parentElement.remove(); // remove the <li> tag for this entry
    createTodo(input.value);
  })
};
