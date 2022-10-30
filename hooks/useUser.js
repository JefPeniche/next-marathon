import { useLocalStorage } from "./useLocalStorage";

export default function useUser() {
   const [user, setUser] = useLocalStorage('user', '')
   
   const updateUser = (user) => setUser(user)

   return [user, updateUser]
}; 
