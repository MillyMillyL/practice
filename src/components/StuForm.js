import React, { useCallback, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import StuContext from "../store/StuContext";

const StuForm = ({ stu, cancelHandler }) => {
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
    Name: stu ? stu.attributes.Name : "",
    Gender: stu ? stu.attributes.Gender : "男",
    Address: stu ? stu.attributes.Address : "",
  });

  const {
    loading,
    error,
    fetchData: addEditStu,
  } = useFetch(
    {
      url: stu ? `students/${stu.id}` : "students",
      method: stu ? "put" : "post",
    },
    ctx.fetchData
  );

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
          {stu && (
            <>
              <button onClick={() => addEditStu(inputData)}>确认</button>
              <button onClick={cancelHandler}>取消</button>
            </>
          )}
          {!stu && <button onClick={() => addEditStu(inputData)}>添加</button>}
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
