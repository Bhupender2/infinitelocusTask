import { useState } from "react";
import WeatherInfo from "./pages/WeatherInfo";
import { Routes, Route } from "react-router-dom";
import WeatherHistory from "./pages/WeatherHistory";

function App() {
  const [historyList, setHistoryList] = useState([]);

  function HandleAddHistory(city) {
    setHistoryList([...historyList, city]);
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<WeatherInfo addHistory={HandleAddHistory} />}
        />
        <Route
          path="/history"
          element={<WeatherHistory historyList={historyList} />}
        />
      </Routes>
    </>
  );
}

export default App;
