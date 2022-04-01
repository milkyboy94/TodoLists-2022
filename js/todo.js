const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const weather = document.getElementById("weather");

let toDos = [];
// application이 시작할때 toDos는 항상 비어있다
// 이를 시정하기 위해 const를 let으로 바꾼다.
const TODOS_KEY = "todos";

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  //
}

function finishToDo(event) {
  // const li = event.target.parentElement;
  const li = this.nextSibling;
  li.classList.toggle("checked");
  // li.remove();
  // toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  // saveToDos();
}

function deleteToDo(event) {
  const exo = this.parentElement;
  exo.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(exo.id));
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  const button = document.createElement("button");
  const exo = document.createElement("button");
  button.innerText = "👍";
  exo.innerText = "❌";
  li.appendChild(button);
  li.appendChild(span);
  li.appendChild(exo);
  span.innerText = newTodo.text;
  toDoList.appendChild(li);
  // 이제 list를 지우는 작업을 해보자.
  // button이 클릭을 인식해야하므로 eventlister가 필요하다
  button.addEventListener("click", finishToDo);
  exo.addEventListener("click", deleteToDo);
}

function handleToDoSubmit(event) {
  // javascript는 방금 발생한 event를 handleToDoSubmit함수의 첫번째 인자로 준다
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  //   toDoInput value를 비웠다고 해서 newToDo가 비워지는 것은 아니다
  // toDos.push(newTodo);
  // paintToDo(newTodo)를 하기전에 toDos array를 가지고 와서 newToDo를 push
  // text를 push할수도 있고 object를 push할수도 있다

  if (toDos.length > 3) {
    alert("할일은 하루에 최대 4개만!");
  } else {
    const newTodoObj = {
      text: newTodo,
      id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
    // array 안에 요소들이 들어가면 이제 이걸 localStorage안에 넣는다
  }
}
toDoForm.addEventListener("submit", handleToDoSubmit);
weather.addEventListener(
  "focus",
  (event) => (event.target.style.background = "none")
);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
} else {
}

// (item) => console.log("turn of", item)

// function sayHello(item){
//   console.log("turn of", item)
// }

console.log(toDos.length);
