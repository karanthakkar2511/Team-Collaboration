import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setRooms, setActiveRoom, addMessage } from '../../slices/chatSlice';
import { Send, Plus } from 'lucide-react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your actual backend URL

const Chat: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, activeRoom } = useSelector((state: RootState) => state.chat);
  const user = useSelector((state: RootState) => state.auth.user);
  const [message, setMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Fetch chat rooms from API
    const mockRooms = [
      { id: '1', name: 'General', messages: [] },
      { id: '2', name: 'Project A', messages: [] },
    ];
    dispatch(setRooms(mockRooms));
    dispatch(setActiveRoom(mockRooms[0].id));

    socket.on('message', (message) => {
      dispatch(addMessage({ roomId: activeRoom!, message }));
    });

    return () => {
      socket.off('message');
    };
  }, [dispatch, activeRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [rooms, activeRoom]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && activeRoom) {
      const newMessage = {
        id: Date.now().toString(),
        sender: user?.username || 'Anonymous',
        content: message,
        timestamp: new Date().toISOString(),
      };
      socket.emit('sendMessage', { roomId: activeRoom, message: newMessage });
      dispatch(addMessage({ roomId: activeRoom, message: newMessage }));
      setMessage('');
    }
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      const newRoom = {
        id: Date.now().toString(),
        name: newRoomName,
        messages: [],
      };
      dispatch(setRooms([...rooms, newRoom]));
      setNewRoomName('');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 via-indigo-100 to-purple-100">
      <div className="w-1/4 bg-white border-r border-gray-300">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Chat Rooms</h2>
          <form onSubmit={handleCreateRoom} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="New room name"
                className="flex-grow p-3 border border-gray-300 rounded-l-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="bg-indigo-500 text-white p-3 rounded-r-md hover:bg-indigo-600 transition">
                <Plus size={20} />
              </button>
            </div>
          </form>
          <ul>
            {rooms.map((room) => (
              <li
                key={room.id}
                className={`p-3 mb-2 cursor-pointer rounded-md ${
                  activeRoom === room.id ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => dispatch(setActiveRoom(room.id))}
              >
                {room.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-grow flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-indigo-50 to-indigo-100">
          {activeRoom &&
            rooms.find((room) => room.id === activeRoom)?.messages.map((msg) => (
              <div key={msg.id} className="flex flex-col space-y-1">
                <span className="font-semibold text-indigo-600">{msg.sender}</span>
                <span className="bg-white p-3 rounded-lg shadow-sm">{msg.content}</span>
                <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</span>
              </div>
            ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-300">
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button type="submit" className="bg-indigo-500 text-white p-3 rounded-r-md hover:bg-indigo-600 transition">
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
