import React, { useEffect } from 'react';

const ChatBotIframe = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("chatbotId", "kOTXspwCLlT4-B8zy0trB");
    script.setAttribute("domain", "www.chatbase.co");

    script.onerror = () => {
      console.error("Failed to load chatbase script.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on component unmount
    };
  }, []);

  return (
    <iframe
      src="https://www.chatbase.co/chatbot-iframe/kOTXspwCLlT4-B8zy0trB"
      width="100%"
      style={{ height: "100%", minHeight: "700px" , display: "none"}}
      frameBorder="0"
      title="ChatBotIframe"

    ></iframe>
  );
};

export default ChatBotIframe;