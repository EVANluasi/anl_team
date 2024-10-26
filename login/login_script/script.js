document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', () => {
        // Toggle the form visibility by toggling the 'active' class
        container.classList.toggle('active');

        // Smoothly change the button text based on the active form
        if (container.classList.contains('active')) {
            toggleButton.textContent = 'Sign In'; // Display "Sign In" when "Sign Up" form is visible
        } else {
            toggleButton.textContent = 'Sign Up'; // Display "Sign Up" when "Sign In" form is visible
        }
    });
});
