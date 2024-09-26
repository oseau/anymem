# Feature detail page from the home page
  - [/spaced-repetition](../web/app/(with-headers)/spaced-repetition)
  - [/multi-platform](../web/app/(with-headers)/multi-platform)
  - [/customizable-decks](../web/app/(with-headers)/customizable-decks)

# [/dashboard](../web/app/(with-headers)/dashboard)

We have a overview of user's learning progress, including:
  - cards count
    - learned
    - imported but not learned yet
  - cards due count
    - today
    - this week
    - this month
  - streak days
  - for each user created deck, we show:
    - deck name
    - card count
      - learned
      - imported but not learned yet
    - cards due count
      - today
      - this week
      - this month
    - button to browse cards in the deck
    - button to revisit the deck now

# /me/decks

# /me/decks/:deck_id

# /decks

Under this route, we have a list of admin pre-made decks, each deck has:
  - title
  - description
  - card count: number of cards that are already imported to user's deck, and how many cards are not imported.
  - button to browse cards in the deck

# /deck/:id

We only show decks that are pre-made by admin, if the deck is not created by admin, we show a 404 page, as user should not have access to other user's decks.
Under this route, we show the cards in the admin pre-made deck. The list of cards is:
  - paginated, each page show 20 cards
  - filterable by whether the card is already imported to user's deck, or not
  - has a button at the top to import X cards(unimported) from the deck to user's deck in id order, and another button to import X random cards from the deck to user's deck, where X is customizable through input field(default value is 10, between 5 to 100).

each card in the list has:
  - front content
  - back content
  - card stats: if the card is already imported to user's deck, we show stats of the card, such as revisited count, correct rate, stability score(in Open Spaced Repetition algorithm), next due date, etc
  - button to add card to user's deck
