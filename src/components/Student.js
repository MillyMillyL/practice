import React, { useCallback, useContext, useState } from "react";
import StuContext from "../store/StuContext";

const Student = ({
  stu: {
    id,
    attributes: { Name, Gender, Address },
  },
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ctx = useContext(StuContext);

  const deleteStudent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:1337/api/students/${id}`, {
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
      <tr>
        <td>{Name}</td>
        <td>{Gender}</td>
        <td>{Address}</td>
        <td>
          <button onClick={deleteStudent} value={id}>
            删除
          </button>
        </td>
      </tr>
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
