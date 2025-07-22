import './styles/main.scss';
import TodoApp from './js/TodoApp';

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Starting TodoApp with API integration...');
    new TodoApp();
});