import{BrowserRouter, Routes, Route} from 'react-router-dom';
import ShowArticles from './components/ShowArticles'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ShowArticles></ShowArticles>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
