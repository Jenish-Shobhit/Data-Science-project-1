document.addEventListener("DOMContentLoaded", () => {
    const imageUpload = document.getElementById("imageUpload");
    const previewImage = document.getElementById("previewImage");
    const resultDiv = document.getElementById("result");
    const loadingDiv = document.getElementById("loading");

    let model;

    // Load MobileNet model
    async function loadModel() {
        try {
            model = await mobilenet.load();
            console.log("Model loaded successfully");
        } catch (error) {
            console.error("Error loading model:", error);
            resultDiv.innerHTML = "Error loading AI model. Please refresh the page.";
        }
    }

    // Function to classify image
    async function classifyImage() {
        if (!model) {
            resultDiv.innerHTML = "Model is still loading... Please try again in a moment.";
            return;
        }

        try {
            loadingDiv.style.display = "block";
            resultDiv.style.display = "none";

            const predictions = await model.classify(previewImage);
            
            // Format predictions
            const topPredictions = predictions.map(pred => ({
                category: pred.className.split(',')[0], // Take only the first category if multiple
                confidence: (pred.probability * 100).toFixed(1)
            }));

            // Display results
            resultDiv.innerHTML = `
                <strong>Top Predictions:</strong><br>
                ${topPredictions.map(pred => 
                    `${pred.category}: ${pred.confidence}%`
                ).join('<br>')}
            `;
        } catch (error) {
            console.error("Error classifying image:", error);
            resultDiv.innerHTML = "Error analyzing image. Please try another image.";
        } finally {
            loadingDiv.style.display = "none";
            resultDiv.style.display = "block";
        }
    }

    // Event Listener for image upload
    imageUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
                
                // Wait for image to load before classification
                previewImage.onload = () => {
                    classifyImage();
                };
            };

            reader.onerror = (error) => {
                console.error("Error reading file:", error);
                resultDiv.innerHTML = "Error reading image file. Please try another image.";
            };

            reader.readAsDataURL(file);
        }
    });

    // Initialize
    loadModel();
});
