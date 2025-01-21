<script src="https://cdn.jsdelivr.net/npm/pexels"></script> <!-- Load Pexels SDK via CDN -->

<script>
let isCooldown = false; // Track cooldown state

document.getElementById('generate').addEventListener('click', function() {
    if (isCooldown) return; // Prevent action if cooldown is active

    const prompt = document.getElementById('prompt').value.trim();
    const messageElement = document.getElementById('message');
    const gridElement = document.getElementById('image-grid');

    // Clear previous messages and images
    messageElement.innerHTML = '';
    gridElement.innerHTML = '';

    if (!prompt) {
        messageElement.innerHTML = 'Please enter a prompt first. Or just type "funny" for a surprise!';
        return;
    }

    // Start cooldown
    isCooldown = true;
    document.getElementById('generate').disabled = true; // Disable the button

    // Fetch images from Pexels API
    fetchImages(prompt);

    // Set a timeout to re-enable the button after 0.5 seconds (500ms)
    setTimeout(function() {
        isCooldown = false;
        document.getElementById('generate').disabled = false; // Enable the button
    }, 500); // Cooldown period: 500ms
});

// Allow pressing Enter to trigger the search
document.getElementById('prompt').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('generate').click();
    }
});

async function fetchImages(query) {
    const encryptedApiKey = 'd1VkcklIZU5sNFlJNEFHb1dTRDZZajBtM0FXclZvb1ROeDU3TW90dGJMNlZXcDVGNU1Y'; // Correct Base64-encoded key
    const apiKey = decryptApiKey(encryptedApiKey);

    // Create the Pexels client
    const client = createClient(apiKey); // Using the API key here

    try {
        const photos = await client.photos.search({ query, per_page: 4 });

        // Extract image URLs
        const images = photos.photos.map(photo => photo.src.small);

        displayImages(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        document.getElementById('message').innerHTML = 'Failed to fetch images. Maybe try a different prompt?';
    }
}

function decryptApiKey(encryptedKey) {
    const decodedBytes = atob(encryptedKey); // Base64 decode
    return decodedBytes;
}

function displayImages(imageUrls) {
    const gridElement = document.getElementById('image-grid');

    imageUrls.forEach((imgSrc, index) => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = imgSrc;
        const button = document.createElement('button');
        button.classList.add('download-btn');
        button.innerHTML = 'Download';
        button.onclick = function() {
            const a = document.createElement('a');
            a.href = img.src;
            a.download = 'image' + (index + 1) + '.jpg';
            a.click();
        };

        div.appendChild(img);
        div.appendChild(button);
        gridElement.appendChild(div);
    });
}
</script>
