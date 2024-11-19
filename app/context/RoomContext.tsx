'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Room = {
  id: string;
  name: string;
}

type RoomContextType = {
  rooms: (Room | null)[];
  // toggleTheme: () => void;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setTheme] = useState([{
    id:"room1",
    name: "Loom 1"
  }, {
    id:"room2",
    name: "Room 2"
  }, null]);

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  // };

  return (
    <RoomContext.Provider value={{ rooms, /* toggleTheme */ }}>
      {children}
    </RoomContext.Provider>
  );
};
