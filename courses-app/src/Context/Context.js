import { createContext, useContext } from 'react';

const authContext = createContext();

export const useAuth = () => {
	return useContext(authContext);
};
