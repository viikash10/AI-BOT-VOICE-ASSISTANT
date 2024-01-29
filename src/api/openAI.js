import axios from 'axios';
import {apiKey} from '../constants';

const client = axios.create({
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

const chatGptEndPoint = 'https://api.openai.com/v1/chat/completions';
const dalleEndPoint = 'https://api.openai.com/v1/images/generations';

export const apiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatGptEndPoint, {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`,
        },
      ],
    });
    console.log('data', res.data.choices[0]);
    let isArt = res.data?.choices[0]?.message?.content;
    if (isArt.toLowerCase().includes('yes')) {
      console.log('dalle api call');
      return dalleApiCall(prompt, messages || []);
    } else {
      return chatgptApiCall(prompt, messages || []);
      console.log('chatgpt api call');
    }
  } catch (error) {
    console.log('error', error);
    return Promise.resolve({success: false, msg: error.message});
  }
};

const chatgptApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatGptEndPoint, {
      model: 'gpt-3.5-turbo',
      messages,
    });

    let answer = res.data?.choices[0]?.message?.content;
    messages.push({role: 'assistant', content: answer.trim()});
    return Promise.resolve({success: true, data: messages});
  } catch (error) {
    console.log('error', error);
    return Promise.resolve({success: false, msg: error.message});
  }
};

const dalleApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(dalleEndPoint, {
    //   model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
    });
    let url = res.data?.data[0]?.url;
    console.log('got url of the image:', url);
    messages.push({role: 'assistant', content: url});
    return Promise.resolve({success: true, data: messages});
  } catch (error) {
    console.log('error', error);
    return Promise.resolve({success: false, msg: error.message});
  }
};
