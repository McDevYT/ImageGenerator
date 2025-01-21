document.getElementById('generate').addEventListener('click', function() {
    const prompt = document.getElementById('prompt').value.trim();
    const messageElement = document.getElementById('message');
    const gridElement = document.getElementById('image-grid');

    // Clear previous messages and images
    messageElement.innerHTML = '';
    gridElement.innerHTML = '';

    if (!prompt) {
        messageElement.innerHTML = 'Please enter a prompt first.';
        return;
    }

    // Fetch images from a public API (e.g., Unsplash)
    fetchImages(prompt);
});

async function fetchImages(query) {
    const accessKey = '1AJjQjdSGMzM0XfRpu4nEKSIAAyfLBqttMGICGz_D84'; // Replace with your Unsplash API access key
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=4`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const images = data.results.map(img => img.urls.small);

        displayImages(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        document.getElementById('message').innerHTML = 'Failed to fetch images.';
    }
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
