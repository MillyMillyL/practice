import { useState, useEffect, useCallback } from "react";
import "./App.css";
import StudentList from "./components/StudentList";
import StuContext from "./store/StuContext";

function App() {
  const [stuData, setStuData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:1337/api/students/");
      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        setStuData(data.data);
      } else {
        throw new Error(`${res.status} (${res.statusText})`);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StuContext.Provider value={{ fetchData }}>
      <div className="App">
        <button onClick={fetchData}>加载数据</button>
        {!loading && !error && <StudentList stus={stuData} />}
        {loading && <p>Data Loading...</p>}
        {error && <p>Data Loading Error {error.message}</p>}
      </div>
    </StuContext.Provider>
  );
}

export default App;
