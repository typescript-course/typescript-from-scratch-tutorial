import { shouldIncrementOrResetStreakCount, formattedDate, STREAK_KEY, buildStreak } from "./lib"

export interface Streak {
  currentCount: number
  startDate: string
  lastLoginDate: string
}

export function streakCounter(_localStorage: Storage, date: Date): Streak {
  const streakInLocalStorage = _localStorage.getItem("streak");
  if (streakInLocalStorage) {
    try {
      const streak = JSON.parse(streakInLocalStorage || "") as Streak
      const STATE = shouldIncrementOrResetStreakCount(date, streak.lastLoginDate)

      let updatedStreak = <Streak>{}

      switch (STATE) {
        case 'increment': {
          updatedStreak = buildStreak(date,
            {
              currentCount: streak.currentCount += 1
            })

          _localStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));
          break;
        }

        case 'reset': {
          updatedStreak = buildStreak(date)
          _localStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));
          break;
        }

        case 'none':
        default: {
          // leave as is
          updatedStreak = streak
        }
      }

      return updatedStreak
    } catch (error) {
      console.error("Failed to parse streak from localStorage");
    }
  }

  const streak = buildStreak(date)
  _localStorage.setItem(STREAK_KEY, JSON.stringify(streak));

  return streak
}