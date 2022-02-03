import './App.css';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { values } from 'mobx';

const App = (props) => {
    console.log(getSnapshot(props.store))
    const idCreator = () => {
      return Date.now().toString()
    }
    const addUser = () => {
      props.store.addUser(idCreator(), "New one")
    }

    return (
      <div className="App">
        <button onClick={e =>addUser()}>Add user</button>
        <div>
          {props.store.usersCount}
        </div>
        { values(props.store.users).map((user, i) => <div key={i}>
          <div>{user.name}</div>
          <div>{user.userTodoCount}</div>
          <button onClick={e => user.addTodo(idCreator())}>Добавить туду</button>
        </div>)}
      </div>
    );
  }
 

export default observer(App);
