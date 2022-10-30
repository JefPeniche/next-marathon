import { useLocalStorage } from "./useLocalStorage";

export default function useToken() {
   const [token, setToken] = useLocalStorage('token', '')
   
   const updateToken = (newToken) => setToken(newToken)

   return [token, updateToken]
}; 
