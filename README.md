# react-express-todo

1. `git clone`
2. `npm install`
3. In `package.json`:

```json
    "server": "nodemon lib/server.js  --ignore src/",
```

3. `npm install axios --save`
4. In `src/TodoApp.js`:

```javascript
import axios from "axios";
```

5. In `src/TodoApp.js`:

```javascript
componentDidMount() {
  axios.get("/todos").then(res => {
    if (res.data.todos) {
      this.setState({ todos: res.data.todos });
    }
  });
}
```

6. In `src/TodoApp.js`:

```javascript
addTodo = () => {
  axios.post(`/todos/${this.state.todo}`);
  this.clearInput();
};
```

7. In `src/TodoApp.js`:

```javascript
refresh = () => {
  axios.get("/todos").then(res => {
    if (res.data.todos) {
      this.setState({ todos: res.data.todos });
    }
  });
};
```

9. Then

```javascript
addTodo = () => {
  axios.post(`/todos/${this.state.todo}`).then(this.refresh);
  this.clearInput();
};
```

10. Then

```javascript
removeTodo = index => {
  axios.delete(`/todos/${index}`).then(this.refresh);
};
```
