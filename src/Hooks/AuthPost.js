import { useState, useEffect } from 'react';

const usePost = () => {
  const [data2, setData] = useState(null);
  const [loading2, setLoading] = useState(true);
  const [error2, setError] = useState(null);

  const trigger = async(url,data) => {
      const token = localStorage.getItem('token')
      console.log("******I",data)
      try {
        const response = await fetch(url,{
            headers:{
                Authorization: 'Bearer '+token, 
                'Content-Type': 'application/json',
            },
            method:"POST",
            body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("*****",result)
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

  return { data2, loading2, error2 , trigger};
};

export default usePost;
