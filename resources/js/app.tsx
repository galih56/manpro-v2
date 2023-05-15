import ReactDOM from 'react-dom/client';     
import React from 'react';
import { AppProvider } from './stores/providers';
import { AppRoutes } from './routes';
import './../css/app.css'
import '@/lib/zod';

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