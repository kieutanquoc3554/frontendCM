import { useState, useEffect, useCallback } from "react";

const useVoiceRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error("Trình duyệt của bạn không hỗ trợ Web Speech API.");
      return;
    }
  }, []);

  const recognition = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "vi-VN";

    recognitionInstance.onresult = (event) => {
      const transcriptResult = event.results[0][0].transcript;
      setTranscript(transcriptResult);
      setIsListening(false);
    };

    recognitionInstance.onerror = (event) => {
      console.error("Lỗi nhận diện giọng nói:", event.error);
      setIsListening(false);
    };

    recognitionInstance.onend = () => setIsListening(false);

    return recognitionInstance;
  }, []);

  const startListening = () => {
    setIsListening(true);
    recognition().start();
  };

  return { transcript, isListening, startListening };
};

export default useVoiceRecognition;
