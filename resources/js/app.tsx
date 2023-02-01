import ReactDOM from 'react-dom/client';     
import React from 'react';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';
import './../css/app.css'

class App extends React.Component{
   render() {
      return (
         <AppProvider>
           <AppRoutes />
         </AppProvider>
      )
   }
}
ReactDOM.createRoot(document.getElementById('app') as Element).render(     
   <App/>
);