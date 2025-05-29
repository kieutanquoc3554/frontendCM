export default function useWebsocket({ audio, isLogin, setNotifications }) {
  const connectWebsocket = () => {
    if (isLogin) {
      const ws = new WebSocket("ws://localhost:8080");

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "ORDER_STATUS_UPDATED") {
          setNotifications((prevNotifications) => [
            { ...data, read: false },
            ...prevNotifications,
          ]);

          audio.play();
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        ws.close();
      };
    }
  };

  return { connectWebsocket };
}
