import defaultAxios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useEffect, useState } from 'react';

type useAxiosState<T> = {
  loading: boolean;
  error: Error | null;
  data: AxiosResponse<T> | null;
};
/**
 * Get or Post data in function call
 * @param {AxiosRequestConfig} opts Axios Options
 * @param {AxiosInstance} axiosInstance Axios Instance
 */

export const useAxiosAuto = <T = any>(
  opts: AxiosRequestConfig,
  axiosInstance: AxiosInstance = defaultAxios
) => {
  const [state, setState] = useState<useAxiosState<T>>({
    loading: true,
    error: null,
    data: null,
  });
  const [trigger, setTrigger] = useState(0);
  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    setTrigger(Date.now());
  };
  useEffect(() => {
    if (!opts.url) return;
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);
  return { ...state, refetch };
};

/**
 * Get or Post data in execute function call
 * @param {AxiosRequestConfig} opts Axios Options
 * @param {AxiosInstance} axiosInstance Axios Instance
 */

export const useAxiosExec = <T = any>(
  opts: AxiosRequestConfig,
  axiosInstance: AxiosInstance = defaultAxios
) => {
  const [state, setState] = useState<useAxiosState<T>>({
    loading: false,
    error: null,
    data: null,
  });
  const exec = <I = any>(data: I, urlParams?: string) => {
    if (!opts.url) return;
    setState({
      ...state,
      loading: true,
    });
    axiosInstance({
      ...opts,
      url: urlParams ? opts.url.concat(urlParams) : opts.url,
      data,
    })
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((error) => {
        setState({
          ...state,
          loading: false,
          error,
        });
      });
  };

  return { ...state, exec };
};
