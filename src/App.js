import { BrowserRouter,Routes, Route} from 'react-router-dom';
import './App.scss';
import HomePage from "./components/HomePage/HomePage";
import NoMatch from "./components/NoMatch/NoMatch";
import { CallPage } from "./components/CallPage/CallPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<CallPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
