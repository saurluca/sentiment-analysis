import {useState} from "react";
import Tooltip from "./components/Tooltip";


type Sentiment = "P+" | "P" | "N" | "N+" | "NEU" | "NONE";
const sentimentColors: Record<Sentiment, string> = {
    "P+": "shadow-green-600 shadow-xl",
    "P": "shadow-green-500 shadow-lg",
    "NEU": "shadow-gray-500 shadow-lg",
    "N": "shadow-red-500 shadow-lg",
    "N+": "shadow-red-600 shadow-xl",
    "NONE": "shadow-gray-400 shadow-lg",
}

const sentimentDetails: Record<Sentiment, { text: string; icon: string; color: string }> = {
    "P+": { text: "Very Positive", icon: "😍", color: "text-green-600" },
    "P": { text: "Positive", icon: "😌", color: "text-green-500" },
    "NEU": { text: "Neutral", icon: "😑", color: "text-gray-500" },
    "N": { text: "Negative", icon: "😣", color: "text-red-500" },
    "N+": { text: "Very Negative", icon: "😫", color: "text-red-600" },
    "NONE": { text: "Unable to determine", icon: "❓", color: "text-gray-400" },
};

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
                console.log("sending api request")
                const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
                const data = await response.json();
                console.log("data", data);
                
                if (!data.score_tag || data.score_tag === "NONE") {
                    setSentiment("NONE");
                    console.log("No sentiment detected");
                } else {
                    setSentiment(data.score_tag);
                    console.log("Sentiment:", data.score_tag);
                }
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Error:", error);
            setSentiment("NONE");
        }
    }

    return (
        <div className="h-dvh w-dvh flex items-center justify-center bg-slate-100">
            <div className={`max-w-xl w-full p-6 bg-white rounded-lg  ${isLoading ? '' : sentimentColors[sentiment]}`}>
                <div className="flex flex-row items-center justify-between mb-2">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Sentiment Analysis</h1>
                        {useTestMode && (
                            <span className="text-xs text-gray-500 mt-1">
                                Test Mode: Using random sentiments
                            </span>
                        )}
                    </div>
                    <Tooltip content={
                        <div className="text-gray-600">
                            <p className="font-medium mb-2">How Sentiment Analysis Works</p>
                            <p className="mb-2">Using the MeaningCloud API, this tool analyzes text to determine its primary emotional tone:</p>
                            <ul className="list-disc ml-4 mt-2 space-y-1">
                                <li>Very Positive (P+): Extremely favorable</li>
                                <li>Positive (P): Generally favorable</li>
                                <li>Neutral (NEU): Neither positive nor negative</li>
                                <li>Negative (N): Generally unfavorable</li>
                                <li>Very Negative (N+): Extremely unfavorable</li>
                            </ul>
                        </div>
                    } />
                </div>

                {sentiment && (
                    <div className={`flex items-center gap-2 ${sentimentDetails[sentiment].color}`}>
                        <span className="text-2xl">{sentimentDetails[sentiment].icon}</span>
                        <p className="text-lg font-medium">
                            {sentiment === "NONE" 
                                ? "Unable to determine the sentiment. Please try different text."
                                : `The sentiment is ${sentimentDetails[sentiment].text.toLowerCase()}.`
                            }
                        </p>
                    </div>
                )}

                <textarea
                    rows={14}
                    className="w-full p-3 mt-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button
                    className="w-full mt-4 bg-blue-500 text-white text-lg font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:bg-blue-600 focus:outline-none active:bg-blue-500 duration-200 transition-all"
                    onClick={checkSentiment}
                >
                    {isLoading ? "Loading..." : "Check"}
                </button>

            </div>
        </div>
    )
}

export default App
