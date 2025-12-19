import { createSlice, configureStore } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'user',
  initialState: { value: null },
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
    logout: (state) => {
      state.value = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

const store = configureStore({
  reducer: {
    user: authSlice.reducer
  }
})

export default store