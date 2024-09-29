# Some thoughts

## Deck and cards

A deck is a collection of cards. It has a name, a (optional) description and a list of cards. It might be a shared deck or a user's private deck. A shared deck is a snapshot of a deck at a specific time, and it's immutable once shared. It is immutable means that we don't allow to add or remove cards from a shared deck.

A card is a piece of information that the user wants to learn. It has a front (question) and a back (answer). A card must belong to a deck. For simplicity, we don't allow to edit a card. If the user wants to change a card(in their private deck), they have to delete the old card and create a new one. A card might be a created card or an imported card. If it's an imported card, we keep track of the original source and omit the card's front and back(this is possible because we prevent editing cards or shared decks).

When importing a card to a deck, we generate a new card id for it, the old card id is preserved in the `original_card_id` field of the card. This is used to prevent duplication of cards when importing.

## [open-spaced-repetition/ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs)

We use the [open-spaced-repetition/ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) library to implement the FSRS algorithm.
