import React, { useContext, useState } from "react";
import StuContext from "../store/StuContext";

const StuForm = () => {
  const ctx = useContext(StuContext);

  const [inputData, setInputData] = useState({
    name: "",
    gender: "男",
    address: "",
  });

  const nameChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, name: e.target.value }));
  };
  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, gender: e.target.value }));
  };
  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, address: e.target.value }));
  };

  const addStu = () => {
    console.log(inputData);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={nameChangeHandler}
          value={inputData.name}
        />
      </td>
      <td>
        <select onChange={genderChangeHandler} value={inputData.gender}>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          onChange={addressChangeHandler}
          value={inputData.address}
        />
      </td>

      <td>
        <button onClick={addStu}>添加</button>
      </td>
    </tr>
  );
};

export default StuForm;
