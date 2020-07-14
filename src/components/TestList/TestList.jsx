class TodoList extends React.Component{
  constructor(props){
      super(props);
  }
  render(){
      const {todos} = this.props;
      return (<div>
              <ul>
                  {todos.map((item,index)=>{
                      return <li key={item.id}>{item.name}</li>
                  })}
              </ul>
          </div>)
  }