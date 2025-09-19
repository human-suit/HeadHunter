import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FiltersState = {
  city: string;
  skills: string[];
  searchText: string;
};

const initialState: FiltersState = {
  city: '',
  skills: ['TypeScript', 'React', 'Redux'],
  searchText: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    addSkill(state, action: PayloadAction<string>) {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload);
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((skill) => skill !== action.payload);
    },
    clearSkills(state) {
      state.skills = [];
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
  },
});

export const { setCity, addSkill, removeSkill, clearSkills, setSearchText } =
  filtersSlice.actions;
export default filtersSlice.reducer;
