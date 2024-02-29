import React, { useEffect, useState } from "react";

const CreateAccount = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myroute");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" container d-flex align-items-center justify-content-center text-black">
      <div>Hello World</div>
      {/* <div className="text-black">{JSON.stringify(data)}</div> */}
      <div className="text-black">{data && data["message"]}</div>

      <div className="text-black">{error}</div>
    </div>
  );
};

export default CreateAccount;
