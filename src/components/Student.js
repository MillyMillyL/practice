import React, { useCallback, useContext, useState } from "react";
import StuContext from "../store/StuContext";
import StuForm from "./StuForm";

const Student = ({ stu }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ctx = useContext(StuContext);
  const [isEdit, setIsEdit] = useState(false);

  const cancelHandler = () => {
    setIsEdit(false);
  };

  const deleteStudent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:1337/api/students/${stu.id}`, {
        method: "delete",
      });
      ctx.fetchData();
      if (!res.ok) {
        throw new Error("删除失败");
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      {!isEdit && (
        <tr>
          <td>{stu.attributes.Name}</td>
          <td>{stu.attributes.Gender}</td>
          <td>{stu.attributes.Address}</td>
          <td>
            <button onClick={deleteStudent} value={stu.id}>
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
