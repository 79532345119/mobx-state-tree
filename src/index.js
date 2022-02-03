import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { types } from 'mobx-state-tree';
import { values } from 'mobx';

const Todo = types
    .model({
      name: types.optional(types.string, ""),
      done: types.optional(types.boolean, false),
    })
    .actions(self => ({
      setName(newName) {
        self.name = newName
      },
      toggle() {
        self.done = !self.done
      }
    }))

const User = types
  .model({
    name: types.optional(types.string, ""),
    status: types.union(types.literal("online"), types.literal("offline")),
    todos: types.optional(types.map(Todo), {})
  })
  .actions(self => ({
    addTodo(id) {
      self.todos.set(id, Todo.create({name: "Go!"}))
    }
  }))
  .views(self => ({
    get userTodoCount() {
      return values(self.todos).length
    }
  }))

const RootStore = types
    .model({
      users: types.map(User),
    })
    .actions(self => ({
      addUser(id, name) {
        self.users.set(id, User.create({status: "online", name: name, todos: {}}))
      }
    }))
    .views(self => ({
      get usersCount() {
        return values(self.users).length
      }
    }))

const store = RootStore.create()

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
