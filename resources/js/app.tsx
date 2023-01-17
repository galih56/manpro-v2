import ReactDOM from 'react-dom/client';     
import React from 'react';
import Login from './login';

class App extends React.Component<{greeting: string}, {count:number}> {
   render() {
       return (
        <Login/>
          //  <div>
          //      <h2>{this.props.greeting}</h2>
          //      <button onClick={() => this.setState(
          //        {count: this.state.count+1})}>
          //        This button has been clicked {this.state.count} times.
          //      </button>
          //  </div>
          );
   }
}
ReactDOM.createRoot(document.getElementById('app') as Element).render(     
   <App greeting='Hellooooooo!!!'/>
);