import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SwapiAPI from '../../api/swapiAPI';

const api = new SwapiAPI();

// Async Thunks
export const fetchPeople = createAsyncThunk(
    'swapi/fetchPeople',
    async (page = 1, { rejectWithValue }) => {
        try {
            return await api.fetchPeople(page);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPlanets = createAsyncThunk(
    'swapi/fetchPlanets',
    async (page = 1, { rejectWithValue }) => {
        try {
            return await api.fetchPlanets(page);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchStarships = createAsyncThunk(
    'swapi/fetchStarships',
    async (page = 1, { rejectWithValue }) => {
        try {
            return await api.fetchStarships(page);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchFilms = createAsyncThunk(
    'swapi/fetchFilms',
    async (_, { rejectWithValue }) => {
        try {
            return await api.fetchFilms();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const searchAll = createAsyncThunk(
    'swapi/searchAll',
    async (query, { rejectWithValue }) => {
        try {
            return await api.searchAll(query);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAllCategories = createAsyncThunk(
    'swapi/fetchAllCategories',
    async (_, { rejectWithValue }) => {
        try {
            return await api.fetchAllCategories();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPersonDetails = createAsyncThunk(
    'swapi/fetchPersonDetails',
    async (id, { rejectWithValue }) => {
        try {
            return await api.fetchPerson(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPlanetDetails = createAsyncThunk(
    'swapi/fetchPlanetDetails',
    async (id, { rejectWithValue }) => {
        try {
            return await api.fetchPlanet(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchStarshipDetails = createAsyncThunk(
    'swapi/fetchStarshipDetails',
    async (id, { rejectWithValue }) => {
        try {
            return await api.fetchStarship(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const swapiSlice = createSlice({
    name: 'swapi',
    initialState: {
        // Data
        people: { results: [], count: 0, next: null, previous: null },
        planets: { results: [], count: 0, next: null, previous: null },
        starships: { results: [], count: 0, next: null, previous: null },
        films: { results: [], count: 0 },

        // Search results
        searchResults: {
            people: { results: [] },
            planets: { results: [] },
            starships: { results: [] }
        },

        // Selected item for details
        selectedItem: null,

        // UI State
        activeTab: 'people', // people, planets, starships, films
        currentPage: {
            people: 1,
            planets: 1,
            starships: 1
        },

        // Loading states
        loading: {
            people: false,
            planets: false,
            starships: false,
            films: false,
            search: false,
            details: false,
            initial: false
        },

        // Errors
        error: {
            people: null,
            planets: null,
            starships: null,
            films: null,
            search: null,
            details: null,
            general: null
        },

        // Search
        searchQuery: '',
        isSearchMode: false,
    },
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSearchMode: (state, action) => {
            state.isSearchMode = action.payload;
            if (!action.payload) {
                state.searchResults = {
                    people: { results: [] },
                    planets: { results: [] },
                    starships: { results: [] }
                };
                state.searchQuery = '';
            }
        },
        clearSelectedItem: (state) => {
            state.selectedItem = null;
        },
        clearError: (state, action) => {
            const errorType = action.payload || 'general';
            state.error[errorType] = null;
        },
        clearAllErrors: (state) => {
            Object.keys(state.error).forEach(key => {
                state.error[key] = null;
            });
        },
        setCurrentPage: (state, action) => {
            const { category, page } = action.payload;
            state.currentPage[category] = page;
        }
    },
    extraReducers: (builder) => {
        // Fetch People
        builder
            .addCase(fetchPeople.pending, (state) => {
                state.loading.people = true;
                state.error.people = null;
            })
            .addCase(fetchPeople.fulfilled, (state, action) => {
                state.loading.people = false;
                state.people = action.payload;
            })
            .addCase(fetchPeople.rejected, (state, action) => {
                state.loading.people = false;
                state.error.people = action.payload;
            })

        // Fetch Planets
        builder
            .addCase(fetchPlanets.pending, (state) => {
                state.loading.planets = true;
                state.error.planets = null;
            })
            .addCase(fetchPlanets.fulfilled, (state, action) => {
                state.loading.planets = false;
                state.planets = action.payload;
            })
            .addCase(fetchPlanets.rejected, (state, action) => {
                state.loading.planets = false;
                state.error.planets = action.payload;
            })

        // Fetch Starships
        builder
            .addCase(fetchStarships.pending, (state) => {
                state.loading.starships = true;
                state.error.starships = null;
            })
            .addCase(fetchStarships.fulfilled, (state, action) => {
                state.loading.starships = false;
                state.starships = action.payload;
            })
            .addCase(fetchStarships.rejected, (state, action) => {
                state.loading.starships = false;
                state.error.starships = action.payload;
            })

        // Fetch Films
        builder
            .addCase(fetchFilms.pending, (state) => {
                state.loading.films = true;
                state.error.films = null;
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.loading.films = false;
                state.films = action.payload;
            })
            .addCase(fetchFilms.rejected, (state, action) => {
                state.loading.films = false;
                state.error.films = action.payload;
            })

        // Search All
        builder
            .addCase(searchAll.pending, (state) => {
                state.loading.search = true;
                state.error.search = null;
            })
            .addCase(searchAll.fulfilled, (state, action) => {
                state.loading.search = false;
                state.searchResults = action.payload;
                state.isSearchMode = true;
            })
            .addCase(searchAll.rejected, (state, action) => {
                state.loading.search = false;
                state.error.search = action.payload;
            })

        // Fetch All Categories
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.loading.initial = true;
                state.error.general = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.loading.initial = false;
                state.people = action.payload.people;
                state.planets = action.payload.planets;
                state.starships = action.payload.starships;
                state.films = action.payload.films;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading.initial = false;
                state.error.general = action.payload;
            })

        // Fetch Details
        builder
            .addCase(fetchPersonDetails.pending, (state) => {
                state.loading.details = true;
                state.error.details = null;
            })
            .addCase(fetchPersonDetails.fulfilled, (state, action) => {
                state.loading.details = false;
                state.selectedItem = { ...action.payload, type: 'person' };
            })
            .addCase(fetchPersonDetails.rejected, (state, action) => {
                state.loading.details = false;
                state.error.details = action.payload;
            })

        builder
            .addCase(fetchPlanetDetails.pending, (state) => {
                state.loading.details = true;
                state.error.details = null;
            })
            .addCase(fetchPlanetDetails.fulfilled, (state, action) => {
                state.loading.details = false;
                state.selectedItem = { ...action.payload, type: 'planet' };
            })
            .addCase(fetchPlanetDetails.rejected, (state, action) => {
                state.loading.details = false;
                state.error.details = action.payload;
            })

        builder
            .addCase(fetchStarshipDetails.pending, (state) => {
                state.loading.details = true;
                state.error.details = null;
            })
            .addCase(fetchStarshipDetails.fulfilled, (state, action) => {
                state.loading.details = false;
                state.selectedItem = { ...action.payload, type: 'starship' };
            })
            .addCase(fetchStarshipDetails.rejected, (state, action) => {
                state.loading.details = false;
                state.error.details = action.payload;
            })
    },
});

export const {
    setActiveTab,
    setSearchQuery,
    setSearchMode,
    clearSelectedItem,
    clearError,
    clearAllErrors,
    setCurrentPage,
} = swapiSlice.actions;

// Selectors
export const selectPeople = (state) => state.swapi.people;
export const selectPlanets = (state) => state.swapi.planets;
export const selectStarships = (state) => state.swapi.starships;
export const selectFilms = (state) => state.swapi.films;
export const selectSearchResults = (state) => state.swapi.searchResults;
export const selectActiveTab = (state) => state.swapi.activeTab;
export const selectLoading = (state) => state.swapi.loading;
export const selectError = (state) => state.swapi.error;
export const selectSearchQuery = (state) => state.swapi.searchQuery;
export const selectIsSearchMode = (state) => state.swapi.isSearchMode;
export const selectSelectedItem = (state) => state.swapi.selectedItem;
export const selectCurrentPage = (state) => state.swapi.currentPage;

// Complex selectors
export const selectCurrentData = (state) => {
    const { activeTab, isSearchMode } = state.swapi;

    if (isSearchMode) {
        return state.swapi.searchResults[activeTab] || { results: [] };
    }

    return state.swapi[activeTab] || { results: [] };
};

export const selectStats = (state) => {
    const { people, planets, starships, films } = state.swapi;
    return {
        people: people.count || people.results.length,
        planets: planets.count || planets.results.length,
        starships: starships.count || starships.results.length,
        films: films.count || films.results.length
    };
};

export default swapiSlice.reducer;