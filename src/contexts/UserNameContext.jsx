import { createContext, useState } from 'react';

export const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
  const [name, setName] = useState(null);

  return (
    <UserNameContext.Provider value={{ name, setName }}>
      {children}
    </UserNameContext.Provider>
  );
};
