// １.グローバル変数の定義
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));

//配列を引数として受け取って、forEachで回す
if (todos) {
    todos.forEach(todo => {
        add(todo);
    })
}

//エンターキーを押してサブミットしたらデフォルトのページ更新を止めて、add関数を実行
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // console.log(input.value);
    add();
})

//add関数を定義　一番の肝
function add(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const li = document.createElement("li");
        li.innerText = todoText;
        li.classList.add("list-group-item");
        
        if(todo && todo.completed) {
            li.classList.add("text-decoration-line-through")
        }

        li.addEventListener("contextmenu", function(event) {
            event.preventDefault;
            li.remove();
            saveData();
        })

        li.addEventListener("click", function(){
            li.classList.toggle("text-decoration-line-through")
            saveData();
        })

        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}

//saveDataの定義　li属性を全てせれくたーで取ってきて、listsに代入、
function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];

    //listsを回してtodoというオブジェクトを定義、textにそれぞれのinnerTextを指定してcompletedにbool(classの有無)を代入
    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains("text-decoration-line-through")
        }
        //配列にオブジェクトを代入する
        todos.push(todo);        
    });
    //todosとしてJSON形式で保存
    localStorage.setItem("todos", JSON.stringify(todos));

    console.log(todos);
}



