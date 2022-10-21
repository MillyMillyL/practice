import React, { useCallback, useContext, useState } from "react";
import StuContext from "../store/StuContext";

const StuForm = () => {
  const ctx = useContext(StuContext);

  const nameChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Name: e.target.value }));
  };
  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Gender: e.target.value }));
  };
  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Address: e.target.value }));
  };

  const [inputData, setInputData] = useState({
    Name: "",
    Gender: "男",
    Address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addStu = useCallback(async (inputData) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch("http://localhost:1337/api/students", {
        method: "post",
        body: JSON.stringify({ data: inputData }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("添加失败");
      }
      console.log(res);
      ctx.fetchData();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            onChange={nameChangeHandler}
            value={inputData.Name}
          />
        </td>
        <td>
          <select onChange={genderChangeHandler} value={inputData.Gender}>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            onChange={addressChangeHandler}
            value={inputData.Address}
          />
        </td>

        <td>
          <button onClick={() => addStu(inputData)}>添加</button>
        </td>
      </tr>
      {loading && (
        <tr colSpan={5}>
          <td>添加中...</td>
        </tr>
      )}
      {error && (
        <tr colSpan={5}>
          <td>添加失败</td>
        </tr>
      )}
    </>
  );
};

export default StuForm;
