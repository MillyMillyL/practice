import React from "react";
import Student from "./Student";
import StuForm from "./StuForm";

const StudentList = ({ stus }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {stus.map((stu) => (
          <Student key={stu.id} stu={stu} />
        ))}
      </tbody>
      <tfoot>
        <StuForm />
      </tfoot>
    </table>
  );
};

export default StudentList;
