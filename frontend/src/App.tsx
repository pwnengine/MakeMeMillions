import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          
            <Route path="/" element={ <Dashboard /> } />
        
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
