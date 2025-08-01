import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Chip,
    Typography,
    CircularProgress,
} from '@mui/material';
import {
    Search as SearchIcon,
    Clear as ClearIcon,
    TravelExplore as TravelExploreIcon,
} from '@mui/icons-material';
import {
    searchAll,
    setSearchQuery,
    setSearchMode,
    selectSearchQuery,
    selectIsSearchMode,
    selectLoading,
} from '../../store/slices/swapiSlice';

const SwapiSearch = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const isSearchMode = useSelector(selectIsSearchMode);
    const loading = useSelector(selectLoading);
    const [localQuery, setLocalQuery] = useState(searchQuery);

    const handleSearch = () => {
        if (localQuery.trim()) {
            dispatch(setSearchQuery(localQuery.trim()));
            dispatch(searchAll(localQuery.trim()));
        }
    };

    const handleClearSearch = () => {
        setLocalQuery('');
        dispatch(setSearchQuery(''));
        dispatch(setSearchMode(false));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const popularSearches = [
        'Luke Skywalker',
        'Darth Vader',
        'Tatooine',
        'Death Star',
        'Millennium Falcon'
    ];

    return (
        <Box sx={{ mb: 4 }}>
            {/* Search Header */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                    <TravelExploreIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Дослідіть галактику
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    Знайдіть персонажів, планети та кораблі з всесвіту Star Wars
                </Typography>
            </Box>

            {/* Search Input */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    fullWidth
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Введіть ім'я персонажа, планети або корабля..."
                    variant="outlined"
                    disabled={loading.search}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: localQuery && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setLocalQuery('')}
                                    edge="end"
                                    size="small"
                                >
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: 3,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'divider',
                            },
                        }
                    }}
                />

                <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={!localQuery.trim() || loading.search}
                    startIcon={
                        loading.search ?
                            <CircularProgress size={20} color="inherit" /> :
                            <SearchIcon />
                    }
                    sx={{
                        minWidth: 120,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    {loading.search ? 'Пошук...' : 'Знайти'}
                </Button>
            </Box>

            {/* Current Search Status */}
            {isSearchMode && searchQuery && (
                <Box sx={{ mb: 2 }}>
                    <Chip
                        label={`Результати пошуку: "${searchQuery}"`}
                        onDelete={handleClearSearch}
                        deleteIcon={<ClearIcon />}
                        color="primary"
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            '& .MuiChip-deleteIcon': {
                                fontSize: 18,
                            }
                        }}
                    />
                </Box>
            )}

            {/* Popular Searches */}
            {!isSearchMode && (
                <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Популярні пошуки:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {popularSearches.map((search) => (
                            <Chip
                                key={search}
                                label={search}
                                size="small"
                                variant="outlined"
                                clickable
                                onClick={() => {
                                    setLocalQuery(search);
                                    dispatch(setSearchQuery(search));
                                    dispatch(searchAll(search));
                                }}
                                sx={{
                                    borderRadius: 2,
                                    '&:hover': {
                                        bgcolor: 'primary.light',
                                        color: 'primary.contrastText',
                                        borderColor: 'primary.main',
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            {/* Search Tips */}
            {!isSearchMode && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 2, border: '1px solid', borderColor: 'info.main' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: 'info.contrastText' }}>
                        💡 Поради для пошуку:
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'info.contrastText', opacity: 0.9 }}>
                        • Використовуйте англійські назви для кращих результатів
                        <br />
                        • Спробуйте різні варіанти написання
                        <br />
                        • Пошук працює по всіх категоріях одночасно
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default SwapiSearch;