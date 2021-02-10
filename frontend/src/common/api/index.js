import axios from 'axios';
import {setInterceptors} from '../interceptors';

function createInstance() {
  const instance = axios.create();
  return instance;
}

export const instance = createInstance();

function createInstanceWithAuth() {
  const instance = axios.create();
  return setInterceptors(instance);
}

export const instanceWithAuth = createInstanceWithAuth();
