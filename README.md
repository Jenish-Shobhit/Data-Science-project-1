# AI Fashion Classifier

A simple web app that tells you what clothing item is in your picture! 

## How to Use

1. Run: `python3 -m http.server 8000`
2. Open `http://localhost:8000`
3. Click "Choose Image" and upload any clothing picture
4. See what the AI thinks it is!

## Built With

- HTML, CSS, JavaScript
- TensorFlow.js + MobileNet

## How It Works

This app uses two powerful AI tools:

1. TensorFlow.js
   - It's Google's AI library that runs right in your web browser
   - No need to install anything - it loads automatically when you open the page
   - Handles all the complex math needed for image recognition

2. MobileNet
   - A pre-trained AI model that knows how to recognize over 1000 different things
   - Very fast and efficient - works well on phones and computers
   - We load it through TensorFlow.js when you start the app

When you upload a picture:
1. Your browser loads the image
2. MobileNet looks at the image and compares it to what it learned
3. It gives us its best guesses about what's in the picture
4. We show you the results!

That's it! Have fun trying it out! 🎉