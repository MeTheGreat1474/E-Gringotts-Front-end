import { useState } from "react";
import api from "../../api/axiosConfig";


export const useChatbot = () => {
    const [response, setResponse] = useState('');

    const sendPrompt = async (prompt) => {
        try {
            const res = await api.post(`/chatGPT5/prompt?prompt=${encodeURIComponent(prompt)}`);

            console.log('Api response :',res);
            if (res.status === 200) {
                setResponse(res.data);
            } else {
                console.log('Oops, we haven\'t got JSON!');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { response, sendPrompt };
};