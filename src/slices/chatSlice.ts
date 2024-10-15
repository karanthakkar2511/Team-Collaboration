import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatRoom {
  id: string;
  name: string;
  messages: Message[];
}

interface ChatState {
  rooms: ChatRoom[];
  activeRoom: string | null;
}

const initialState: ChatState = {
  rooms: [],
  activeRoom: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      state.rooms = action.payload;
    },
    setActiveRoom: (state, action: PayloadAction<string>) => {
      state.activeRoom = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ roomId: string; message: Message }>) => {
      const room = state.rooms.find(r => r.id === action.payload.roomId);
      if (room) {
        room.messages.push(action.payload.message);
      }
    },
  },
});

export const { setRooms, setActiveRoom, addMessage } = chatSlice.actions;
export default chatSlice.reducer;