import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Grid,
    Paper,
    CircularProgress,
    Alert,
    Snackbar,
    IconButton,
    Card,
    CardContent,
    Pagination,
    Button,
    Divider,
} from '@mui/material';
import {
    Person as PersonIcon,
    Public as PublicIcon,
    RocketLaunch as RocketIcon,
    Movie as MovieIcon,
    Close as CloseIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';

import SwapiSearch from '../../components/SwapiSearch/SwapiSearch';
import { PersonCard, PlanetCard, StarshipCard, FilmCard } from '../../components/SwapiCards/SwapiCards';
import {
    fetchAllCategories,
    fetchPeople,
    fetchPlanets,
    fetchStarships,
    fetchFilms,
    fetchPersonDetails,
    fetchPlanetDetails,
    fetchStarshipDetails,
    setActiveTab,
    setCurrentPage,
    clearError,
    selectActiveTab,
    selectCurrentData,
    selectLoading,
    selectError,
    selectIsSearchMode,
    selectStats,
    selectCurrentPage,
} from '../../store/slices/swapiSlice';

const SwapiPage = () => {
    const dispatch = useDispatch();

    // Selectors
    const activeTab = useSelector(selectActiveTab);
    const currentData = useSelector(selectCurrentData);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const isSearchMode = useSelector(selectIsSearchMode);
    const stats = useSelector(selectStats);
    const currentPage = useSelector(selectCurrentPage);

    // Load initial data
    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    const handleTabChange = (event, newValue) => {
        dispatch(setActiveTab(newValue));

        // Load data for new tab if needed
        if (!isSearchMode) {
            switch (newValue) {
                case 'people':
                    if (currentPage.people > 1) {
                        dispatch(fetchPeople(currentPage.people));
                    }
                    break;
                case 'planets':
                    if (currentPage.planets > 1) {
                        dispatch(fetchPlanets(currentPage.planets));
                    }
                    break;
                case 'starships':
                    if (currentPage.starships > 1) {
                        dispatch(fetchStarships(currentPage.starships));
                    }
                    break;
                case 'films':
                    // Films don't have pagination
                    break;
                default:
                    break;
            }
        }
    };

    const handlePageChange = (event, page) => {
        dispatch(setCurrentPage({ category: activeTab, page }));

        switch (activeTab) {
            case 'people':
                dispatch(fetchPeople(page));
                break;
            case 'planets':
                dispatch(fetchPlanets(page));
                break;
            case 'starships':
                dispatch(fetchStarships(page));
                break;
            default:
                break;
        }
    };

    const handleViewDetails = (id, type) => {
        switch (type) {
            case 'person':
                dispatch(fetchPersonDetails(id));
                break;
            case 'planet':
                dispatch(fetchPlanetDetails(id));
                break;
            case 'starship':
                dispatch(fetchStarshipDetails(id));
                break;
            default:
                break;
        }
    };

    const handleRefresh = () => {
        if (isSearchMode) {
            // If in search mode, refresh search results
            return;
        }

        switch (activeTab) {
            case 'people':
                dispatch(fetchPeople(currentPage.people));
                break;
            case 'planets':
                dispatch(fetchPlanets(currentPage.planets));
                break;
            case 'starships':
                dispatch(fetchStarships(currentPage.starships));
                break;
            case 'films':
                dispatch(fetchFilms());
                break;
            default:
                break;
        }
    };

    const handleClearError = (errorType) => {
        dispatch(clearError(errorType));
    };

    const tabsConfig = [
        { value: 'people', label: 'Персонажі', icon: <PersonIcon />, count: stats.people },
        { value: 'planets', label: 'Планети', icon: <PublicIcon />, count: stats.planets },
        { value: 'starships', label: 'Кораблі', icon: <RocketIcon />, count: stats.starships },
        { value: 'films', label: 'Фільми', icon: <MovieIcon />, count: stats.films },
    ];

    const renderContent = () => {
        const currentLoading = loading[activeTab] || loading.search || loading.initial;
        const currentError = error[activeTab] || error.search || error.general;

        if (currentLoading) {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
                    <CircularProgress size={60} thickness={4} sx={{ mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        {isSearchMode ? 'Виконується пошук...' : 'Завантаження даних...'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Зачекайте, будь ласка
                    </Typography>
                </Box>
            );
        }

        if (currentError) {
            return (
                <Alert
                    severity="error"
                    action={
                        <Button color="inherit" size="small" onClick={handleRefresh}>
                            <RefreshIcon sx={{ mr: 1 }} />
                            Спробувати знову
                        </Button>
                    }
                    sx={{ borderRadius: 2 }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Помилка завантаження
                    </Typography>
                    <Typography variant="body2">
                        {currentError}
                    </Typography>
                </Alert>
            );
        }

        if (!currentData?.results || currentData.results.length === 0) {
            return (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2, opacity: 0.7 }}>
                        🔍 Нічого не знайдено
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {isSearchMode
                            ? 'Спробуйте змінити пошуковий запит або перевірте правильність написання'
                            : 'Дані недоступні в цій категорії'
                        }
                    </Typography>
                </Paper>
            );
        }

        return (
            <Grid container spacing={3}>
                {currentData.results.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={item.url || item.name || index}>
                        {activeTab === 'people' && (
                            <PersonCard
                                person={item}
                                onViewDetails={handleViewDetails}
                                index={index}
                            />
                        )}
                        {activeTab === 'planets' && (
                            <PlanetCard
                                planet={item}
                                onViewDetails={handleViewDetails}
                                index={index}
                            />
                        )}
                        {activeTab === 'starships' && (
                            <StarshipCard
                                starship={item}
                                onViewDetails={handleViewDetails}
                                index={index}
                            />
                        )}
                        {activeTab === 'films' && (
                            <FilmCard film={item} index={index} />
                        )}
                    </Grid>
                ))}
            </Grid>
        );
    };

    const shouldShowPagination = () => {
        return !isSearchMode &&
            activeTab !== 'films' &&
            currentData?.count > 10 &&
            !loading[activeTab];
    };

    const getTotalPages = () => {
        if (!currentData?.count) return 1;
        return Math.ceil(currentData.count / 10);
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 800,
                        mb: 2,
                        background: 'linear-gradient(45deg, #FFE81F, #FFA500)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    🌌 SWAPI Explorer
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Дослідіть всесвіт Star Wars
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ⚡ Powered by Redux-Thunk • 🎬 Star Wars API
                </Typography>
            </Box>

            {/* Search */}
            <SwapiSearch />

            {/* Statistics */}
            {!isSearchMode && (
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {tabsConfig.map((tab) => (
                        <Grid item xs={6} sm={3} key={tab.value}>
                            <Card elevation={2}>
                                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                    <Box sx={{ color: 'primary.main', mb: 1 }}>
                                        {React.cloneElement(tab.icon, { sx: { fontSize: 40 } })}
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                        {tab.count || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {tab.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Main Content */}
            <Paper elevation={3} sx={{ borderRadius: 3 }}>
                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                            }
                        }}
                    >
                        {tabsConfig.map((tab) => (
                            <Tab
                                key={tab.value}
                                value={tab.value}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {tab.icon}
                                        <span>{tab.label}</span>
                                        {tab.count > 0 && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    bgcolor: 'primary.main',
                                                    color: 'primary.contrastText',
                                                    px: 1,
                                                    borderRadius: 1,
                                                    minWidth: 20,
                                                    height: 20,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                {tab.count}
                                            </Typography>
                                        )}
                                    </Box>
                                }
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* Content */}
                <Box sx={{ p: 3 }}>
                    {renderContent()}
                </Box>

                {/* Pagination */}
                {shouldShowPagination() && (
                    <Box sx={{ p: 3, pt: 0 }}>
                        <Divider sx={{ mb: 3 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Pagination
                                count={getTotalPages()}
                                page={currentPage[activeTab] || 1}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    </Box>
                )}
            </Paper>

            {/* Error Snackbars */}
            {Object.entries(error).map(([errorType, errorMessage]) => (
                errorMessage && (
                    <Snackbar
                        key={errorType}
                        open={Boolean(errorMessage)}
                        autoHideDuration={6000}
                        onClose={() => handleClearError(errorType)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert
                            onClose={() => handleClearError(errorType)}
                            severity="error"
                            variant="filled"
                            action={
                                <IconButton
                                    size="small"
                                    color="inherit"
                                    onClick={() => handleClearError(errorType)}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        >
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                )
            ))}
        </Box>
    );
};

export default SwapiPage;