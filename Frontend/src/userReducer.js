import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: "user",
    initialState: {
      initialLoad: true,
      loggedInUserData: JSON.parse(localStorage.getItem('user')) || {},
      reportData: {},
    },
    reducers: {
      setLoggedInUserData(state, { payload }) {
        state.loggedInUserData = payload;
        localStorage.setItem('user', JSON.stringify(payload));
      },
      setReportData(state, { payload }) {
        state.reportData = payload;
        localStorage.setItem('report', JSON.stringify(payload));
      },
      setInitialLoad(state, { payload }) {
        state.initialLoad = false;
      },
    },
  });
  
  export const userActions = userSlice.actions;
  export default userSlice.reducer;
  