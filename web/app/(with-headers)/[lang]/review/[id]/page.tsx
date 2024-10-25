import { getDictionary } from "@/get-dictionary";
import { Flashcard } from "@/components/Flashcard";
import { Locale } from "@/i18n-config";
import { getDueCards } from "@/app/actions/review";

async function fetchCards(deckId: string) {
  const cards = await getDueCards(deckId);
  // for each card, we randomly select another card's back as a "distractor" choice
  // 1. if we only have 1 card, we use a default distractor
  // 2. if we have multiple cards, we use a random distractor, and make sure it's not the same as the original card
  const cardsWithDistractors = cards.map((card) => {
    if (cards.length <= 1) {
      return { ...card, distractor: ":)" };
    } else {
      while (true) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        if (cards[randomIndex].id !== card.id) {
          return { ...card, distractor: cards[randomIndex].back };
        }
      }
    }
  });
  // for each card, we need to make a random choices list and a correct answer index
  const cardsWithChoicesAndCorrectAnswer = cardsWithDistractors.map((card) => {
    const choices = [card.back, card.distractor].sort(
      () => Math.random() - 0.5,
    );
    const correctAnswer = choices.indexOf(card.back);
    return { ...card, choices, correctAnswer };
  });
  return cardsWithChoicesAndCorrectAnswer;
}

export default async function ReviewDeckPage({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const dict = await getDictionary(lang);
  const cards = await fetchCards(id);
  console.log(cards);

  return (
    <div>
      <Flashcard
        params={{
          front: cards[0].front,
          choices: cards[0].choices,
          correctAnswer: cards[0].correctAnswer,
          timeLimit: 10,
          dict,
        }}
      />
    </div>
  );
}
