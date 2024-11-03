import {useState} from "react";


type Sentiment = "P+" | "P" | "N" | "N+" | "NEU";
const sentimentColors: Record<Sentiment, string> = {
    "P+": "shadow-green-600 shadow-xl",
    "P": "shadow-green-500 shadow-lg",
    "NEU": "shadow-gray-500 shadow-lg",
    "N": "shadow-red-500 shadow-lg",
    "N+": "shadow-red-600 shadow-xl",
}

const useTestMode = true;

function App() {
    const [text, setText] = useState("")
    const [sentiment, setSentiment] = useState<Sentiment>("NEU");
    const [isLoading, setIsLoading] = useState(false);
    const apiKey = import.meta.env.VITE_MEANINGCLOUD_API_KEY

    function getRandomSentiment(): Sentiment {
        const sentiments: Sentiment[] = ["P+", "P", "NEU", "N", "N+"];
        return sentiments[Math.floor(Math.random() * sentiments.length)];
    }

    async function checkSentiment(): Promise<void> {
        const formdata = new FormData();
        formdata.append("key", apiKey);
        formdata.append("txt", text);
        formdata.append("lang", "en");

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        }

        try {
            setIsLoading(true);
            if (useTestMode) {
                console.log("Using test mode");

                await new Promise(resolve => setTimeout(resolve, 1000));
                setSentiment(getRandomSentiment());
            } else {
                const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
                const data = await response.json();
                console.log("data", data);
                setSentiment(data.score_tag);
                console.log("Sentiment:", data.score_tag);
            }


            setIsLoading(false);
        } catch {
            setIsLoading(false);
            console.log("error");
        }
    }

    return (
        <div className="h-dvh w-dvh flex items-center justify-center bg-slate-100">
            <div className={`max-w-xl w-full p-6 bg-white rounded-lg  ${isLoading ? '' : sentimentColors[sentiment]}`}>
                <h1 className="text-4xl font-bold mb-2">Sentiment Analysis</h1>


                {sentiment === "NEU" && <p className="text-gray-500">The sentiment is not determined.</p>}
                {sentiment === "P+" && <p className="text-green-500">The sentiment is positive.</p>}
                {sentiment === "P" && <p className="text-green-500">The sentiment is positive.</p>}
                {sentiment === "N" && <p className="text-red-500">The sentiment is negative.</p>}
                {sentiment === "N+" && <p className="text-red-500">The sentiment is negative.</p>}

                <textarea
                    rows={14}
                    className="w-full p-3 mt-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button
                    className="w-full mt-4 bg-blue-500 text-white text-lg font-bold py-2 px-4  rounded-md hover:bg-blue-700 duration-200 transition-all"
                    onClick={checkSentiment}
                >
                    {isLoading ? "Loading..." : "Check"}
                </button>

            </div>
        </div>
    )
}

export default App
