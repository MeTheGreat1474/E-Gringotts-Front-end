import React, { useState, useEffect ,useRef} from 'react';
import './Chatbot.css';
import { useChatbot } from './Chatboxapi';

function Chatbot() {
    const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 600);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const {response, sendPrompt} = useChatbot();
    const messagesEndRef = useRef(null); // create a ref

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }


    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        const handleResize = () => {
            setIsResponsive(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log('Updating messages with :', response)
        if (response) {
            setMessages(prevMessages => {
                const newMessages = [...prevMessages, {text: response, sender: 'ai'}];
                console.log('Messages : ', newMessages);
                return newMessages;
            });
        }
    }, [response]);


    const sendMessage = async (message) => {
        setMessages(prevMessages => [...prevMessages, {text: message, sender: 'user'}]);
        await sendPrompt(message);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
        setIsOpen(true);
    };

    return (
        <div>
            <div className={`ai-circle ${isOpen ? 'open' : 'closed'}`} onClick={() => setIsOpen(!isOpen)}>
                <img src='/images/wowl.png' alt="Logo" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '40px',
                    height: '40px',
                    userSelect: 'none'
                }}/>
            </div>
            <div className={`ai-box ${isResponsive ? 'ai-box-responsive' : ''} ${isOpen ? 'open' : 'closed'}`}
                 onClick={() => setIsOpen(!isOpen)}>
                {isOpen && (
                    <>
                        <button className="close-button" onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                        }}>X
                        </button>
                        <div className="chat-messages">
                            {messages.map((message, index) => (
                                <p key={index}><strong>{message.sender}:</strong> {message.text}</p>
                            ))}
                            <div ref={messagesEndRef}/>
                            {/* add ref to the last element */}
                        </div>
                        <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                            <input type="text" value={input} onChange={e => setInput(e.target.value)}/>
                            <button type="submit">Send Message</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}


export default Chatbot;