
import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  let page = 6
  const [progress, setProgress] = useState(0)
  const set = (progress) => {
    setProgress(progress)
  }

  return (
    <div className="App">


      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
          

        />
        <Routes>
          <Route exact path="/business" element={<News set={set} key="business" pageSize={page} country="in" category="business" />} />
          <Route exact path="/" element={<News set={set} key="general" pageSize={page} country="in" category="general" />} />
          <Route exact path="/general" element={<News set={set} key="general" pageSize={page} country="in" category="general" />} />
          <Route exact path="/sport" element={<News set={set} key="sport" pageSize={page} country="in" category="sport" />} />
          <Route exact path="/technology" element={<News set={set} key="technology" pageSize={page} country="in" category="technology" />} />
          <Route exact path="/science" element={<News set={set} key="science" pageSize={page} country="in" category="science" />} />
          <Route exact path="/sports" element={<News set={set} key="sports" pageSize={page} country="in" category="sports" />} />
          <Route exact path="/health" element={<News set={set} key="health" pageSize={page} country="in" category="health" />} />
          <Route exact path="/entertainment" element={<News set={set} key="entertainment" pageSize={page} country="in" category="entertainment" />} />


        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
