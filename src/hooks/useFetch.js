import React, { useState, useCallback } from "react";

const useFetch = (reqObj, cb) => {
  const [stuData, setStuData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (body) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:1337/api/" + reqObj.url, {
        method: reqObj.method || "get",
        headers: {
          "Content-type": "application/json",
        },
        body: body ? JSON.stringify({ data: body }) : null, //有问题
      });
      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        setStuData(data.data);
        cb && cb();
      } else {
        throw new Error(`${res.status} (${res.statusText})`);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  });

  //设置返回值
  return { stuData, loading, error, fetchData };
};

export default useFetch;
