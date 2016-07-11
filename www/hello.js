/*
  hello.js contains all $fh.cloud calls to the server-side:
  Create
  Update
  Delete
  List
 */

document.addEventListener("DOMContentLoaded", function(event) { 
  drawTodoList();
});


/*
  Client-side create operation - uses $fh.cloud to send a POST /todo request to the server-side
 */
function createTodo(name){
  $fh.cloud(
      {
        path: 'todo',
        method : 'POST',
        data : {
          name : name
        }
      },
      function (createResult) {
        drawTodoList(); // redraw the todolist - will trigger another list operation
      },
      function (code, errorprops, params) {
        alert('An error occured creating your Todo: ' + code + ' : ' + errorprops);
      }
  );
}

/*
  Client-side update operation. Uses $fh.cloud to send a PUT /todo/:id request to the server-side.
 */
function updateTodo(id, value, cb){
  
  $fh.cloud(
      {
        path: 'todo/' + id,
        method : 'PUT',
        data : {
          name : value
        }
      },
      function (updateResult) {
        return cb();
      },
      function (code, errorprops, params) {
        return cb(errorprops);
      }
  );
}

/*
 Client-side delete operation. Uses $fh.cloud to send a DELETE /todo/:id request to the server-side.
 */
function deleteTodo(id, cb){
  $fh.cloud(
      {
        path: 'todo/' + id,
        method : 'DELETE'
      },
      function (deleteResult) {
        return cb();
      },
      function (code, errorprops, params) {
        return cb(errorprops);
      }
  );
}


/*
  Client-side list request - uses $fh.cloud to send a GET /todo request to the server-side
 */
function listTodos(cb){
  $fh.cloud(
      {
        path: 'todo',
        method : 'GET'
      },
      function (todoItems) {
        return cb(null, todoItems);
      },
      function (code, errorprops, params) {
        return cb(errorprops);
      }
  );
}
