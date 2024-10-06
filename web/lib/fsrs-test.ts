// run with `npm exec -- tsx lib/fsrs-test.ts`

import {
  Rating,
  createEmptyCard,
  formatDate,
  fsrs,
  generatorParameters,
} from "ts-fsrs";
import type { ReviewLog, RecordLogItem } from "ts-fsrs";

const f = fsrs(
  generatorParameters({
    enable_fuzz: true,
    enable_short_term: false,
  }),
);

const logs: ReviewLog[] = [];
const print = (scheduling_cards: RecordLogItem[]) => {
  for (const g of [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]) {
    const { log, card } = scheduling_cards[g];
    console.group(`${Rating[g]}`);
    console.table({
      [`card_${Rating[g]}`]: {
        ...card,
        due: formatDate(card.due),
        last_review: formatDate(card.last_review as Date),
      },
    });
    console.table({
      [`log_${Rating[g]}`]: {
        ...log,
        review: formatDate(log.review),
      },
    });
    console.groupEnd();
    console.log(
      "----------------------------------------------------------------",
    );
  }
};

const choose = (scheduling_cards: RecordLogItem[], rate: Rating) => {
  const { card, log } = scheduling_cards[rate];
  logs.push(log);
  return card;
};

const d0 = new Date("2022-1-1 10:00:00");
const card0 = createEmptyCard(d0);
console.log(
  ` 000 init @ ${d0}----------------------------------------------------------------`,
);
console.log({ card0 });

const d1 = new Date("2022-1-2 10:00:00");
console.log(
  ` 001 first visit @ ${d1}----------------------------------------------------------------`,
);
const scheduling_cards1 = f.repeat<RecordLogItem[]>(card0, d1);
print(scheduling_cards1);
console.log(
  ` 001 choose Good @ ${d1}----------------------------------------------------------------`,
);
const card1 = choose(scheduling_cards1, Rating.Good);
console.log({ card1 });

const d2 = new Date("2022-1-6 10:00:00");
console.log(
  ` 002 second visit @ ${d2}----------------------------------------------------------------`,
);
const scheduling_cards2 = f.repeat<RecordLogItem[]>(card1, d2);
print(scheduling_cards2);
console.log(
  ` 002 choose Easy @ ${d2}----------------------------------------------------------------`,
);
const card2 = choose(scheduling_cards2, Rating.Easy);
console.log({ card2 });

const d3 = new Date("2022-2-1 10:00:00");
console.log(
  ` 003 third visit @ ${d3}----------------------------------------------------------------`,
);
const scheduling_cards3 = f.repeat<RecordLogItem[]>(card2, d3);
print(scheduling_cards3);
console.log(
  ` 003 choose Easy @ ${d3}----------------------------------------------------------------`,
);
const card3 = choose(scheduling_cards3, Rating.Easy);
console.log({ card3 });

const d4 = new Date("2022-2-10 10:00:00");
console.log(
  ` 004 third visit @ ${d4}----------------------------------------------------------------`,
);
const scheduling_cards4 = f.repeat<RecordLogItem[]>(card3, d4);
print(scheduling_cards4);
console.log(
  ` 004 choose Easy @ ${d4}----------------------------------------------------------------`,
);
const card4 = choose(scheduling_cards4, Rating.Easy);
console.log({ card4 });

console.log("----------------------------------------------------------------");
console.group(`logs`);
console.table(
  logs.map((log) => ({
    ...log,
    stability: parseFloat(log.stability.toFixed(1)),
    difficulty: parseFloat(log.difficulty.toFixed(1)),
    due: `${log.due.toISOString().slice(2, 10).replace(/-/g, '/')}`,
    rating: Rating[log.rating],
    review: `${log.review.toISOString().slice(2, 10).replace(/-/g, '/')}`,
  })),
);
console.groupEnd();
console.log("----------------------------------------------------------------");
