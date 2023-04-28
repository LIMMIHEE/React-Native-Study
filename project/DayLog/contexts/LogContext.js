import React, { useEffect, useRef } from 'react';
import {createContext, useState} from 'react';
import { v4 } from "uuid";
import logsStorages from '../storages/logsStorage';

const LogContext = createContext();

export function LogContextProvider({children}) {
  const initialLogsRef = useRef(null);
  const [logs, setLogs] = useState([]);

  const onCreate = ({title, body, date}) => {
    const log = {
      id : v4(),
      title,
      body,
      date
    };

    setLogs([log, ...logs]);
  }

  const onModify = (modified) => {
    const nextLogs = logs.map((log) => log.id === modified.id ? modified : log);
    setLogs(nextLogs);
  }

  const onRemove = (id) => {
    const nextLogs = logs.filter((log) => log.id !== id);
    setLogs(nextLogs);
  }

  useEffect(()=>{
     // useEffect 내에서 async 함수를 만들고 바로 호출
    // IIFE 패턴
    (async () => {
      const savedLogs = await logsStorages.get();
      if(savedLogs){
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  },[])

  useEffect(()=>{
    if(logs === initialLogsRef.current){
      return;
    }
    logsStorages.set(logs);
  },[logs]);

  return (
    <LogContext.Provider value={{logs,onCreate,onModify,onRemove}}>
      {children}
    </LogContext.Provider>
  );
}

export default LogContext;