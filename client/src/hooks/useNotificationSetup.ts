import { useEffect } from "react";

export const useNotificationSetup = () => {
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notifications enabled ✅");
        } else {
          console.warn("Notifications denied ❌");
        }
      });
    }
  }, []);
};
