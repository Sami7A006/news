import OpenAI from 'openai';
import { NewsItem } from '../types';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function factCheckNews(news: NewsItem): Promise<{
  isFactual: boolean;
  confidence: number;
  explanation: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a fact-checking expert specializing in Indian news verification. Analyze the provided news content and determine its factuality based on known information and reliable sources."
        },
        {
          role: "user",
          content: `Please fact check this news item:
            Headline: ${news.headline}
            Summary: ${news.summary}
            Source: ${news.sourceId}
            Topics: ${news.topics.join(', ')}
            
            Provide a JSON response with:
            - isFactual (boolean)
            - confidence (number between 0-100)
            - explanation (string with your analysis)`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error fact-checking news:', error);
    throw error;
  }
}