import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import './index.css';

// function Item(props){
//     var item;
//     var array = props.item;
//     var item = array.reduce((item, array) => {
//        if(array.done==props.done)item.push(array.name);
//        return item;
//     }, []);
//     var ItemFiltered = item.map((i,index) =>
//     <div key={index}>
//      <li>{i}
//          <button onClick={() => this.handleClick(item, done=true)}>done</button>
//          // <button onClick={() => this.handleDelete(item)}>remove</button>
//      </li>
//     </div>
//   );
//     return ItemFiltered;
// }
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
  RenderItem(d, i) {
    var array = i;
    var each = array.reduce((each, array) => {
       if(array.done==d)each.push(array.name);
       return each;
    }, []);
    var ItemFiltered = each.map((i,index) =>
    <div key={index}>
     <li>
          {i}
          <button onClick={() => this.handleClick(i, !d)}>done</button>
          <button onClick={() => this.handleDelete(i)}>remove</button>
     </li>
    </div>
  );
    return ItemFiltered;
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
        tmp[i].done=done;
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
    return (
      <div>
      <h1>My TodoList</h1>
      <form onSubmit={this.handleSubmit}>
      <input type="text" value={this.state.value}
       onChange={this.handleChange}   />
      <input type="submit" value= "Add" />
      </form>
      <ul>{this.RenderItem(false, temp)}</ul>
      <h2>Finished</h2>
      <ul>{this.RenderItem(true, temp)}</ul>
      </div>
    );
  }
}



ReactDOM.render(<Todo />, document.getElementById('root'));
