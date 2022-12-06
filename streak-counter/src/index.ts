import { formattedDate } from "../__tests__/index.test"

interface Streak {
    currentCount: number
    startDate: string
    lastLoginDate: string
}
export function streakCounter(_localStorage: Storage, date: Date): Streak {
    const streakInLocalStorage = _localStorage.getItem("streak");
    if (streakInLocalStorage) {
      try {
        const streak = JSON.parse(streakInLocalStorage || "");
        return streak;
      } catch (error) {
        console.error("Failed to parse streak from localStorage");
      }
    }

    const streak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date)
    }

    _localStorage.setItem("streak", JSON.stringify(streak));

    return streak
}