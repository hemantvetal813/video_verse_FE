"use client";
// @ts-nocheck
import Image from "next/image";
import { useRouter } from "next/compat/router";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams, useSearchParams } from "next/navigation";
import { useRoom } from '../../../context/RoomContext';

const socket = io('ws://localhost:3001/local', {
  autoConnect: false,
  auth: {
    // token: userData?.token,
    userId: 1,
  }
});
socket.connect();
const userName = "User" + Math.floor(Math.random()*1000)

export default function Room() {

  // const router = useRouter();
  const { roomId, param1 } = useParams();
  const router = useRouter();
  const query = router?.query
  socket.emit("join_room", roomId);

  const { rooms } = useRoom();
  const room = rooms.filter(r => r?.id == roomId)[0]

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    const data = { room: roomId, text: inputValue, sender: userName }
    setMessages([...messages, data]);
    setInputValue("");

    socket.emit("send_message", data);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleSendMessage();
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // console.log(data.text);
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  return (
    //className="grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    <>
    <div className="flex flex-col h-[80vh] bg-gray-100">
      <div className="p-4 bg-blue-500 text-white text-lg font-semibold shadow">
        {room.name}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white shadow-inner scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        { messages.map((msg, i) => {
            const isUser = msg.sender === userName;
            return (
              <div className={`max-w-xs p-3 rounded-lg ${
                isUser
                  ? "ml-auto bg-gray-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`} key={ i }> {!isUser && (
                <div className="text-xs text-gray-400 mb-1">{msg.sender}</div>
              )}{ msg.text }</div>
            );
          }) }
      </div>

      <div className="flex items-center p-4 bg-gray-200 border-t">
        <input
          type="text"
          value={ inputValue }
          onChange={ handleInputChange }
          onKeyDown={ handleKeyPress }
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={ handleSendMessage }>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
        </button>
      </div>
    </div>
    </>
  );
}
