import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Card,
    CardContent,
    Checkbox,
    Typography,
    IconButton,
    Box,
    TextField,
    Button,
    Chip,
    Fade,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    AccessTime as AccessTimeIcon,
    Update as UpdateIcon,
} from '@mui/icons-material';
import { updateTodoStart } from '../../store/slices/todoSlice';

const TodoItem = ({ todo, onToggle, onDelete, index }) => {
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleToggle = () => {
        onToggle(todo._id, !todo.completed);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(todo._id);
        } catch (error) {
            setIsDeleting(false);
            console.error('Error deleting todo:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditText(todo.text);
    };

    const handleSaveEdit = () => {
        const newText = editText.trim();
        if (newText.length === 0) {
            alert('Текст не може бути пустим!');
            return;
        }
        if (newText.length < 5) {
            alert('Мінімальна довжина - 5 символів!');
            return;
        }

        dispatch(updateTodoStart({
            id: todo._id,
            updates: { text: newText }
        }));
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditText(todo.text);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Fade in timeout={300 + index * 100}>
            <Card
                sx={{
                    mb: 2,
                    opacity: isDeleting ? 0.5 : 1,
                    transform: isDeleting ? 'scale(0.95)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    border: isEditing ? 2 : 1,
                    borderColor: isEditing ? 'primary.main' : 'divider',
                    ...(todo.completed && {
                        bgcolor: 'action.hover',
                        opacity: 0.7,
                    }),
                }}
                elevation={isEditing ? 4 : 1}
            >
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        {/* Checkbox */}
                        <Tooltip title={todo.completed ? 'Позначити як активне' : 'Позначити як виконане'}>
                            <Checkbox
                                checked={todo.completed}
                                onChange={handleToggle}
                                disabled={isEditing}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<CheckCircleIcon />}
                                sx={{
                                    mt: -0.5,
                                    color: 'primary.main',
                                    '&.Mui-checked': {
                                        color: 'success.main',
                                    },
                                }}
                            />
                        </Tooltip>

                        {/* Content */}
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            {isEditing ? (
                                <Box>
                                    <TextField
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        fullWidth
                                        multiline
                                        maxRows={4}
                                        variant="outlined"
                                        size="small"
                                        autoFocus
                                        inputProps={{ maxLength: 500 }}
                                        helperText={`${editText.length}/500 символів`}
                                        sx={{ mb: 1 }}
                                    />
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            onClick={handleSaveEdit}
                                            disabled={editText.trim().length < 5}
                                            startIcon={<SaveIcon />}
                                            variant="contained"
                                            size="small"
                                            color="success"
                                        >
                                            Зберегти
                                        </Button>
                                        <Button
                                            onClick={handleCancelEdit}
                                            startIcon={<CancelIcon />}
                                            variant="outlined"
                                            size="small"
                                        >
                                            Скасувати
                                        </Button>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textDecoration: todo.completed ? 'line-through' : 'none',
                                            color: todo.completed ? 'text.secondary' : 'text.primary',
                                            wordBreak: 'break-word',
                                            mb: 1,
                                        }}
                                    >
                                        {todo.text}
                                    </Typography>

                                    {/* Даты */}
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                                        <Chip
                                            icon={<AccessTimeIcon />}
                                            label={`Створено: ${formatDate(todo.createdAt)}`}
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                        />
                                        {todo.updatedAt !== todo.createdAt && (
                                            <Chip
                                                icon={<UpdateIcon />}
                                                label={`Оновлено: ${formatDate(todo.updatedAt)}`}
                                                size="small"
                                                variant="outlined"
                                                color="secondary"
                                            />
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        {/* Actions */}
                        {!isEditing && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                <Tooltip title="Редагувати завдання">
                                    <span>
                                        <IconButton
                                            onClick={handleEdit}
                                            disabled={todo.completed}
                                            size="small"
                                            color="primary"
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </span>
                                </Tooltip>

                                <Tooltip title="Видалити завдання">
                                    <IconButton
                                        onClick={() => setDeleteDialogOpen(true)}
                                        disabled={isDeleting}
                                        size="small"
                                        color="error"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                    </Box>
                </CardContent>

                {/* Delete confirmation dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>Підтвердити видалення</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ви впевнені, що хочете видалити це завдання? Цю дію неможливо скасувати.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>
                            Скасувати
                        </Button>
                        <Button
                            onClick={() => {
                                setDeleteDialogOpen(false);
                                handleDelete();
                            }}
                            color="error"
                            variant="contained"
                        >
                            Видалити
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </Fade>
    );
};

export default TodoItem;