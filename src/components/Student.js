import React, { useCallback, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import StuContext from "../store/StuContext";
import StuForm from "./StuForm";

const Student = ({ stu }) => {
  const ctx = useContext(StuContext);
  const [isEdit, setIsEdit] = useState(false);

  const cancelHandler = () => {
    setIsEdit(false);
  };

  const {
    loading,
    error,
    fetchData: deleteStu,
  } = useFetch(
    {
      url: `students/${stu.id}`,
      method: "delete",
    },
    ctx.fetchData
  );

  return (
    <>
      {!isEdit && (
        <tr>
          <td>{stu.attributes.Name}</td>
          <td>{stu.attributes.Gender}</td>
          <td>{stu.attributes.Address}</td>
          <td>
            <button onClick={deleteStu} value={stu.id}>
              删除
            </button>
            <button onClick={() => setIsEdit(true)}>修改</button>
          </td>
        </tr>
      )}

      {isEdit && <StuForm stu={stu} cancelHandler={cancelHandler} />}

      {loading && (
        <tr>
          <td colSpan={5}>正在删除数据</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5}>删除失败</td>
        </tr>
      )}
    </>
  );
};

export default Student;
