export type Sentiment = "P+" | "P" | "N" | "N+" | "NEU" | "NONE";

export interface SentimentDetail {
    text: string;
    icon: string;
    color: string;
}

export type SentimentColors = Record<Sentiment, string>;
export type SentimentDetails = Record<Sentiment, SentimentDetail>; 