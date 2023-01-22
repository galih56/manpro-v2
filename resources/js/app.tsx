import ReactDOM from 'react-dom/client';     
import React from 'react';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes';

class App extends React.Component<{greeting: string}, {count:number}> {
   render() {
      return (
         <AppProvider>
           <AppRoutes />
         </AppProvider>
      )
   }
}
ReactDOM.createRoot(document.getElementById('app') as Element).render(     
   <App greeting='Hellooooooo!!!'/>
);