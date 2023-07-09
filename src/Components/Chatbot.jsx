import React, { useState, useEffect } from "react";
import "./styleCB.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      content: "Xin chào! tôi là ChatGPT",
      role: "bot",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [openChat, setOpenChat] = useState(false);


  const fetchChatbotMessage = async (input) => {
    // Make an API call to the ChatGPT API with the user input
    const response = await fetch(
      "http://35.197.157.86:6789/api/test/chat?prompt=" + input,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_KEY", // Replace with your actual API key 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
        },
      }
    );

    //

    // Extract the chatbot's response from the API response
    const chatbotResponse = await response.json();

    const mess = messages;
    mess.push(chatbotResponse);

    // Update the messages state with the chatbot's response
    setMessages(mess);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      // Add user's message to the messages state
      const mess = messages;
      mess.push({ role: "user", content: inputValue });
      setMessages(mess);

      // Fetch chatbot's response
      fetchChatbotMessage(inputValue);

      // Clear input field
      setInputValue("");
    }
  };
  return (
    <div className="container_chat">
      <div className="main">
        <div className="icon_main">
          <img
            onClick={() => setOpenChat(!openChat)}
            alt=""
            className="icon"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDcm7kiokRTfw0s-dbrAk2P_aMjFGQnx9UfkLfmiHvADa9I4DuHzaLu8DNUzTGjqTGZds&usqp=CAU"
          />
        </div>
        {openChat && (
          <div className="chat">
            <div className="chatbot-container">
              {messages.map((message, index) => (
                  <div key={index} className={`message ${message.role}`}>
                    <div className={`content-${message.role}`}>{message.content}</div>
                  </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Nhập tin nhắn của bạn..."
                className="input"
              />
              <button type="submit" className="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-send text-blue-500 m-auto mx-2 mt-2"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />{" "}
                </svg>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
