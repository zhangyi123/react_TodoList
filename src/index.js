import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import './index.css';


class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      value: '',
      arry: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
  }
  handleSubmit(event) {
    var item = {
      name: this.state.value,
      done: false
    }
    this.setState(prevState => ({arry: [...prevState.arry, item]}));
    event.preventDefault();
  }
  handleClick(item, done) {
    var tmp = [...this.state.arry];
    for(var i=0; i<tmp.length;i++){
      if(tmp[i].name == item){
        if(done == true)tmp[i].done=true; //this can be revised
        else tmp[i].done=false;
        break;
      }
    }
    this.setState({arry: tmp});
  }
  handleDelete(item) {
    var tmp = [...this.state.arry];
    for(var i=0; i<tmp.length;i++){
      if(tmp[i].name == item){
        tmp.splice(i, 1);
        break;
      }
    }
    this.setState({arry: tmp});
  }
  render(){
     var temp = this.state.arry; //this is must, cannot directly put it into callback reduce below
     var item_todo = temp.reduce((item_todo, temp) => {
        if(temp.done==false)item_todo.push(temp.name); //cause a warning
        return item_todo;
     }, []);
     var item_done = temp.reduce((item_done, temp) => {
        if(temp.done==true)item_done.push(temp.name); //cause a warning
        return item_done;
     }, []);;
     var ItemTodo = item_todo.map((item,index,done) =>
     <div key={index}>
      <li>{item}
          <button onClick={() => this.handleClick(item, done=true)}>done</button>
          <button onClick={() => this.handleDelete(item)}>remove</button>
      </li>
     </div>
   );
     var ItemDone = item_done.map((item,index,done) =>
     <div key={index}>
      <li>{item}
          <button onClick={() => this.handleClick(item, done=false)}>Undone</button>
          <button onClick={() => this.handleDelete(item)}>remove</button>
      </li>
     </div>
 );

    return (
      <div>
      <h1>My TodoList</h1>
      <form onSubmit={this.handleSubmit}>
      <input type="text" value={this.state.value}
       onChange={this.handleChange}   />
      <input type="submit" value= "Add" />
      </form>
      <ul>{ItemTodo}</ul>
      <h2>Finished</h2>
      <ul>{ItemDone}</ul>
      </div>
    );
  }
}



ReactDOM.render(<Todo />, document.getElementById('root'));
