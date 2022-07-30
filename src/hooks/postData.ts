import axios from 'axios';
import { useState, useEffect } from 'react';
import { IformData, IResponseData } from './../types/types';

export function usePostData(url:string) {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<IResponseData>();

  useEffect(()=>{
    if (response) {
      setTimeout(() => {
        setResponse(undefined)
      }, 5000)
    }
  }, [response])

  const pushData = async (data:IformData) => {
    try {
      setLoading(true);
      const res = await axios.post<IResponseData>(
        url,
        {
          ...data,
        }
      );
      setLoading(false);
      setResponse({
        status: res.data.status !== "success",
        message: res.data.message
      });

      return res.data
    } catch (error) {
      setLoading(false);
      setResponse({
        status: false,
        message: (error as Error).message
      })
    }
    
  }

  return {pushData, isLoading, response, setResponse}
}