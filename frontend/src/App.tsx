import './assets/css/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Nav from './components/Nav';
import Selling from './pages/Selling';

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Nav />
        <Routes>
          
        <Route path="/" element={ <Dashboard /> } />
        <Route path="/selling" element={ <Selling /> } />
        
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
