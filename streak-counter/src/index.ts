import { formattedDate } from "../__tests__/index.test"

interface Streak {
    currentCount: number
    startDate: string
    lastLoginDate: string
}

function differenceInDays(dateLeft: Date, dateRight: Date): number {
  const diffTime = Math.abs(dateLeft.getTime() - dateRight.getTime());
  const differenceInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return differenceInDays;
}

function shouldIncrementOrResetStreakCount(
   currentDate: Date,
   lastLoginDate: string
 ): "increment" | undefined   {
   // We get 11/5/2021
   // so to get 5, we use our helper function
   const difference = differenceInDays(currentDate, new Date(lastLoginDate));
    // This means they logged in the day after the currentDate
   if (difference === 1) {
     return "increment"
   }
    // Otherwise they logged in after a day, which would
   // break the streak
   return undefined 
 }

export function streakCounter(_localStorage: Storage, date: Date): Streak {
    const streakInLocalStorage = _localStorage.getItem("streak");
    if (streakInLocalStorage) {
      try {
        const streak = JSON.parse(streakInLocalStorage || "") as Streak
        const SHOULD_INCREMENT = shouldIncrementOrResetStreakCount(date, streak.lastLoginDate)

        if (SHOULD_INCREMENT === 'increment') {
          const updatedStreak: Streak = {
            ...streak,
            currentCount: streak.currentCount += 1
          }
          _localStorage.setItem("streak", JSON.stringify(updatedStreak));

          return updatedStreak
        }

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