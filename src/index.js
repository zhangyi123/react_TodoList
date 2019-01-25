import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import './index.css';
class Item extends React.Component {
  // constructor(props) { useless constructor warning
  //   super(props);
  // }
  render() {
    return (
      <li>
           {this.props.it}
           <button onClick={this.props.action}>done</button>
           <button onClick={this.props.del}>remove</button>
      </li>
    );
  }
}
class Board extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    //inclass "this" is necessary for props, in function it is fine
    //render() the parenthesis are necessary, without it, it will be a function reference, not react element
    //which can be rendered. no same as
    // <button className="square"
    //   onClick={props.onClick}   >
    //     {props.value}
    //   </button>
    return (
      <div>
      <h2>{this.props.title}</h2>
      <ul>{this.props.render()}</ul>
      </div>
    )
  }
}
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
    <Item key={index} it={i} action={() => this.handleClick(i, !d)} del={() => this.handleDelete(i)} />
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
    var temp = this.state.arry;
    return (
      <div>
      <h1>My TodoList</h1>
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value}
          onChange={this.handleChange}   />
        <input type="submit" value= "Add" />
      </form>
      <Board title="Todo:" render={() => this.RenderItem(false, temp)}/>
      <Board title="Finished:" render={() => this.RenderItem(true, temp)}/>
      </div>
    );
  }
}
ReactDOM.render(<Todo />, document.getElementById('root'));
