function getSeasonStart(date: Date): Date {
  const y = date.getFullYear();

  // Season starts: Mar=2, Jun=5, Sep=8, Dec=11
  const starts = [
    new Date(y, 2, 1), // Spring: Mar 1
    new Date(y, 5, 1), // Summer: Jun 1
    new Date(y, 8, 1), // Autumn: Sep 1
    new Date(y, 11, 1), // Winter: Dec 1
  ];

  const prevWinter = new Date(y - 1, 11, 1);
  let seasonStart = prevWinter;

  for (const s of starts) {
    if (s <= date && s > seasonStart) {
      seasonStart = s;
    }
  }
  return seasonStart;
}

function getDayOfSeason(date: Date): number {
  const start = getSeasonStart(date);
  const msPerDay = 24 * 60 * 60 * 1000;
  const startMidnight = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const dateMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  return (
    Math.floor((dateMidnight.getTime() - startMidnight.getTime()) / msPerDay) +
    1
  );
}

// Memoized points calculation
const memo: Map<number, number> = new Map();
function calcPoints(day: number): number {
  if (memo.has(day)) return memo.get(day)!;
  let val: number;
  if (day === 1) val = 2;
  else if (day === 2) val = 3;
  else val = calcPoints(day - 2) + 0.6 * calcPoints(day - 1);
  memo.set(day, val);
  return val;
}

export function getTodayPoints(): number {
  const today = new Date();
  const day = getDayOfSeason(today);
  return Math.round(calcPoints(day));
}

export function formatPoints(points: number): string {
  if (points > 1000) {
    return `${Math.round(points / 1000)}K`;
  }
  return String(points);
}
