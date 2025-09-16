import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NewsState = {
  seenIds: Record<string, true>;
};
const initialState: NewsState = { seenIds: {} };

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addSeenIds(state, action: PayloadAction<string[]>) {
      for (const id of action.payload) state.seenIds[id] = true;
    },
    clearSeen(state) {
      state.seenIds = {};
    },
  },
});

export const { addSeenIds, clearSeen } = newsSlice.actions;
export default newsSlice.reducer;
