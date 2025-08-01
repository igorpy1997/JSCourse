import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Button,
    Avatar,
    Fade,
    Tooltip,
    CardActions,
} from '@mui/material';
import {
    Person as PersonIcon,
    Public as PublicIcon,
    RocketLaunch as RocketIcon,
    Movie as MovieIcon,
    Visibility as VisibilityIcon,
    Height as HeightIcon,
    Scale as ScaleIcon,
    Cake as CakeIcon,
    Groups as GroupsIcon,
    Terrain as TerrainIcon,
    Air as AirIcon,
    Speed as SpeedIcon,
    Engineering as EngineeringIcon,
    DateRange as DateIcon,
} from '@mui/icons-material';

// Person Card
export const PersonCard = ({ person, onViewDetails, index = 0 }) => {
    const getGenderColor = (gender) => {
        switch (gender?.toLowerCase()) {
            case 'male': return 'primary';
            case 'female': return 'secondary';
            default: return 'default';
        }
    };

    const extractId = (url) => {
        const matches = url?.match(/\/(\d+)\/$/);
        return matches ? matches[1] : null;
    };

    return (
        <Fade in timeout={300 + index * 100}>
            <Card
                sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                    },
                    cursor: 'pointer',
                }}
                elevation={2}
            >
                <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            <PersonIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {person.name}
                            </Typography>
                            <Chip
                                label={person.gender || 'Unknown'}
                                size="small"
                                color={getGenderColor(person.gender)}
                                sx={{ mt: 0.5 }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HeightIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Зріст: {person.height !== 'unknown' ? `${person.height} см` : 'Невідомо'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ScaleIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Маса: {person.mass !== 'unknown' ? `${person.mass} кг` : 'Невідомо'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CakeIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Народження: {person.birth_year || 'Невідомо'}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>

                <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => onViewDetails(extractId(person.url), 'person')}
                        sx={{ textTransform: 'none' }}
                    >
                        Деталі
                    </Button>
                </CardActions>
            </Card>
        </Fade>
    );
};

// Planet Card
export const PlanetCard = ({ planet, onViewDetails, index = 0 }) => {
    const getClimateColor = (climate) => {
        if (!climate) return 'default';
        const climateStr = climate.toLowerCase();
        if (climateStr.includes('arid') || climateStr.includes('desert')) return 'warning';
        if (climateStr.includes('temperate')) return 'success';
        if (climateStr.includes('frozen') || climateStr.includes('cold')) return 'info';
        if (climateStr.includes('tropical')) return 'secondary';
        return 'default';
    };

    const extractId = (url) => {
        const matches = url?.match(/\/(\d+)\/$/);
        return matches ? matches[1] : null;
    };

    const formatPopulation = (population) => {
        if (!population || population === 'unknown') return 'Невідомо';
        const num = parseInt(population);
        if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return population;
    };

    return (
        <Fade in timeout={300 + index * 100}>
            <Card
                sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                    },
                    cursor: 'pointer',
                }}
                elevation={2}
            >
                <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                            <PublicIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {planet.name}
                            </Typography>
                            <Chip
                                label={planet.climate || 'Unknown'}
                                size="small"
                                color={getClimateColor(planet.climate)}
                                sx={{ mt: 0.5 }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TerrainIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Ландшафт: {planet.terrain || 'Невідомо'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupsIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Населення: {formatPopulation(planet.population)}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AirIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Клімат: {planet.climate || 'Невідомо'}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>

                <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => onViewDetails(extractId(planet.url), 'planet')}
                        sx={{ textTransform: 'none' }}
                    >
                        Деталі
                    </Button>
                </CardActions>
            </Card>
        </Fade>
    );
};

// Starship Card
export const StarshipCard = ({ starship, onViewDetails, index = 0 }) => {
    const getStarshipClass = (starshipClass) => {
        if (!starshipClass) return 'default';
        const classStr = starshipClass.toLowerCase();
        if (classStr.includes('fighter')) return 'error';
        if (classStr.includes('freighter')) return 'warning';
        if (classStr.includes('cruiser')) return 'primary';
        if (classStr.includes('destroyer')) return 'secondary';
        return 'default';
    };

    const extractId = (url) => {
        const matches = url?.match(/\/(\d+)\/$/);
        return matches ? matches[1] : null;
    };

    return (
        <Fade in timeout={300 + index * 100}>
            <Card
                sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                    },
                    cursor: 'pointer',
                }}
                elevation={2}
            >
                <CardContent sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                            <RocketIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {starship.name}
                            </Typography>
                            <Chip
                                label={starship.starship_class || 'Unknown'}
                                size="small"
                                color={getStarshipClass(starship.starship_class)}
                                sx={{ mt: 0.5 }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EngineeringIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Модель: {starship.model || 'Невідомо'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupsIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Екіпаж: {starship.crew || 'Невідомо'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SpeedIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Гіпердрайв: {starship.hyperdrive_rating || 'Відсутній'}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>

                <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => onViewDetails(extractId(starship.url), 'starship')}
                        sx={{ textTransform: 'none' }}
                    >
                        Деталі
                    </Button>
                </CardActions>
            </Card>
        </Fade>
    );
};

// Film Card
export const FilmCard = ({ film, index = 0 }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getEpisodeColor = (episodeId) => {
        if (episodeId <= 3) return 'warning'; // Prequels
        if (episodeId <= 6) return 'primary'; // Original trilogy
        return 'secondary'; // Sequels
    };

    return (
        <Fade in timeout={300 + index * 100}>
            <Card
                sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                    },
                }}
                elevation={2}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                            <MovieIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Chip
                                label={`Епізод ${film.episode_id}`}
                                size="small"
                                color={getEpisodeColor(film.episode_id)}
                                sx={{ mb: 1 }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {film.title}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {film.opening_crawl ? film.opening_crawl.substring(0, 120) + '...' : 'Опис недоступний'}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Режисер: {film.director || 'Невідомо'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EngineeringIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Продюсер: {film.producer || 'Невідомо'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <DateIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                                Реліз: {film.release_date ? formatDate(film.release_date) : 'Невідомо'}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Fade>
    );
};