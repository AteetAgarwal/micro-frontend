 import getcrossoriginworker from 'crossoriginworker';
 
 export const createWorker = async(url) => {
     const localUrl = await getcrossoriginworker(url);
     return new Worker(localUrl);
 }