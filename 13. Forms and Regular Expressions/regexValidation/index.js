document.addEventListener('DOMContentLoaded', () => {
    // Form elements
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const submitButton = document.getElementById('submitButton');

    const nameError = document.getElementById('nameError');
    const messageError = document.getElementById('messageError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');

    const patterns = {
        name: /^.+$/,                              // Required, any text
        message: /^.{5,}$/,                        // At least 5 characters
        phone: /^\+380\d{9}$/,                     // Starts with +380 followed by 9 digits
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/        // Contains @ and at least one dot
    };

    const validateInput = (input, pattern, errorElement, errorMessage) => {
        const value = input.value.trim();
        const isValid = pattern.test(value);

        if (isValid) {
            input.classList.add('valid');
            input.classList.remove('invalid');
            errorElement.textContent = '';
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
            errorElement.textContent = errorMessage;
        }

        return isValid;
    };

    const checkFormValidity = () => {
        const isNameValid = validateInput(
            nameInput,
            patterns.name,
            nameError,
            'Name is required'
        );

        const isMessageValid = validateInput(
            messageInput,
            patterns.message,
            messageError,
            'Message must be at least 5 characters'
        );

        const isPhoneValid = validateInput(
            phoneInput,
            patterns.phone,
            phoneError,
            'Phone must start with +380 followed by 9 digits'
        );

        const isEmailValid = validateInput(
            emailInput,
            patterns.email,
            emailError,
            'Please enter a valid email address'
        );

        submitButton.disabled = !(isNameValid && isMessageValid && isPhoneValid && isEmailValid);
    };

    nameInput.addEventListener('input', () => {
        validateInput(
            nameInput,
            patterns.name,
            nameError,
            'Name is required'
        );
        checkFormValidity();
    });

    messageInput.addEventListener('input', () => {
        validateInput(
            messageInput,
            patterns.message,
            messageError,
            'Message must be at least 5 characters'
        );
        checkFormValidity();
    });

    phoneInput.addEventListener('input', () => {
        validateInput(
            phoneInput,
            patterns.phone,
            phoneError,
            'Phone must start with +380 followed by 9 digits'
        );
        checkFormValidity();
    });

    emailInput.addEventListener('input', () => {
        validateInput(
            emailInput,
            patterns.email,
            emailError,
            'Please enter a valid email address'
        );
        checkFormValidity();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        checkFormValidity();

        if (!submitButton.disabled) {
            const userData = {
                name: nameInput.value.trim(),
                message: messageInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                submittedAt: new Date().toISOString()
            };

            console.log('Form submitted with the following data:');
            console.log(userData);
            alert('Message sent successfully!');
            form.reset();

            const inputs = [nameInput, messageInput, phoneInput, emailInput];
            inputs.forEach(input => {
                input.classList.remove('valid');
                input.classList.remove('invalid');
            });

            submitButton.disabled = true;
        }
    });

    checkFormValidity();
});