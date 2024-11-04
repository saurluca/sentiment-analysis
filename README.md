# Sentiment Analysis

A React-based web application that analyzes the emotional tone of text using the MeaningCloud Sentiment Analysis API. The application provides a simple interface to input text and receive sentiment analysis results ranging from very positive to very negative.

## Features

- Real-time sentiment analysis of text input
- Visual feedback with color-coded results
- Emoji indicators for different sentiment levels
- Responsive design with Tailwind CSS
- Informative tooltip explaining sentiment levels
- Test mode for development without API calls

## Sentiment Categories

- 😍 Very Positive (P+)
- 😌 Positive (P)
- 😑 Neutral (NEU)
- 😣 Negative (N)
- 😫 Very Negative (N+)

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- MeaningCloud API

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- MeaningCloud API key (for production use)

### Setting up MeaningCloud API
1. Visit [MeaningCloud](https://www.meaningcloud.com/developer/login) and create a free account
2. Navigate to [account subscriptions](https://www.meaningcloud.com/developer/account/subscriptions) where you can find your API key
3. Copy the API key to your `.env` file

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/saurluca/sentiment-analysis

cd sentiment-analysis
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add your MeaningCloud API key:

```bash
VITE_MEANINGCLOUD_API_KEY=your_meaningcloud_api_key
```

4. Start the development server:

```bash
npm run dev
```


5. Open your browser and navigate to `http://localhost:5173`

## Getting Started with Development



### Development Mode
The application includes a test mode for development:
- Set `useTestMode = true` in `src/App.tsx` to use random sentiment responses
- Set `useTestMode = false` to make real API calls to MeaningCloud

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run lint` - Runs ESLint to check code quality
- `npm run preview` - Previews the production build locally

