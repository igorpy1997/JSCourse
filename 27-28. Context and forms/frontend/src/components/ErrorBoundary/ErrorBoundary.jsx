import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    handleReload = () => {
        // Reset error state and reload
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
        window.location.reload();
    };

    handleGoHome = () => {
        // Reset error state and go to home
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={styles.container}>
                    <div style={styles.errorCard}>
                        <div style={styles.iconContainer}>
                            <span style={styles.icon}>😵</span>
                        </div>

                        <h1 style={styles.title}>Упс! Щось пішло не так</h1>
                        <p style={styles.message}>
                            Сталася неочікувана помилка. Спробуйте перезавантажити сторінку або повернутись на головну.
                        </p>

                        <div style={styles.actions}>
                            <button
                                style={{...styles.button, ...styles.primaryButton}}
                                onClick={this.handleReload}
                            >
                                🔄 Перезавантажити
                            </button>
                            <button
                                style={{...styles.button, ...styles.secondaryButton}}
                                onClick={this.handleGoHome}
                            >
                                🏠 На головну
                            </button>
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details style={styles.details}>
                                <summary style={styles.summary}>Деталі помилки (тільки для розробки)</summary>
                                <pre style={styles.errorText}>
                  {this.state.error && this.state.error.toString()}
                                    <br />
                                    {this.state.errorInfo.componentStack}
                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Inline styles (since we can't use CSS modules in class components easily)
const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    errorCard: {
        background: '#ffffff',
        borderRadius: '12px',
        padding: '3rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
    },
    iconContainer: {
        marginBottom: '1.5rem'
    },
    icon: {
        fontSize: '4rem'
    },
    title: {
        color: '#333333',
        fontSize: '2rem',
        fontWeight: '600',
        marginBottom: '1rem',
        margin: '0 0 1rem 0'
    },
    message: {
        color: '#666666',
        fontSize: '1.1rem',
        lineHeight: '1.5',
        marginBottom: '2rem',
        margin: '0 0 2rem 0'
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    button: {
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        outline: 'none'
    },
    primaryButton: {
        backgroundColor: '#007bff',
        color: '#ffffff'
    },
    secondaryButton: {
        backgroundColor: '#6c757d',
        color: '#ffffff'
    },
    details: {
        marginTop: '2rem',
        textAlign: 'left',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '1rem'
    },
    summary: {
        cursor: 'pointer',
        fontWeight: '600',
        marginBottom: '1rem'
    },
    errorText: {
        fontSize: '0.85rem',
        color: '#dc3545',
        overflow: 'auto',
        maxHeight: '200px'
    }
};

export default ErrorBoundary;