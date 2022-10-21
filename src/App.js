import { useState, useEffect, useCallback } from "react";
import "./App.css";
import StudentList from "./components/StudentList";
import useFetch from "./hooks/useFetch";
import StuContext from "./store/StuContext";

function App() {
  const { stuData, loading, error, fetchData } = useFetch({ url: "students" });

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
