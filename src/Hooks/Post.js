import { useState, useEffect } from 'react';
import { error } from '../Components/toast';

const usePostRequest = () => {
  const [response, setResponse] = useState(null);
  const [warning, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const makePostRequest = async (url, data) => {
    try {
      setLoading(true);
      console.log(data)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(url, requestOptions);
      const result = await res.json();
      setResponse(result);
      console.log(result)
      if(res.ok == false){
        error(result.message)
      }
      return result;
    } catch (err) {
      setError(err);
      console.log(err)
      return false;
    } finally {
      setLoading(false);
    }
  };
  const trigger = async (url, data) => {
    const success = await makePostRequest(url, data);
    return success;
  };

  return { response, warning , loading, trigger };
};

export default usePostRequest;