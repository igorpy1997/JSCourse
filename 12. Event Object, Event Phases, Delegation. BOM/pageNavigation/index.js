let savedUrl = '';

document.addEventListener('DOMContentLoaded', function() {
    const enterLinkBtn = document.getElementById('enterLinkBtn');
    const redirectBtn = document.getElementById('redirectBtn');
    const linkInput = document.getElementById('linkInput');
    const urlInput = document.getElementById('urlInput');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('status');

    enterLinkBtn.addEventListener('click', function() {
        linkInput.style.display = 'block';
        status.textContent = 'Please enter a valid URL';
    });

    saveBtn.addEventListener('click', function() {
        const url = urlInput.value.trim();

        if (!url) {
            status.textContent = 'URL cannot be empty';
            return;
        }

        if (!isValidUrl(url)) {
            status.textContent = 'Please enter a valid URL (with http:// or https://)';
            return;
        }

        savedUrl = url;
        status.textContent = 'URL saved successfully: ' + savedUrl;
        linkInput.style.display = 'none';
        redirectBtn.disabled = false;
    });

    redirectBtn.addEventListener('click', function() {
        if (savedUrl) {
            window.location.href = savedUrl;
        } else {
            status.textContent = 'No URL saved. Please enter a URL first.';
            linkInput.style.display = 'block';
        }
    });

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
});