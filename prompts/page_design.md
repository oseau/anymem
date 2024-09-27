# Feature detail page links from the home page
  - [x] [/spaced-repetition](../web/app/(with-headers)/spaced-repetition)
  - [x] [/multi-platform](../web/app/(with-headers)/multi-platform)
  - [x] [/customizable-decks](../web/app/(with-headers)/customizable-decks)

# [/dashboard](../web/app/(with-headers)/dashboard)

We have a overview of user's learning progress, including:
  - [x] cards count
    - learned
    - total imported
  - [x] cards due count
    - today
    - this week
    - this month
  - [x] streak days
  - [x] for each user created deck, we show:
    - deck name
    - card count
      - learned
      - total imported
    - cards due count
      - today
      - this week
      - this month
    - button to browse cards in the deck(/me/deck/:deck_id)
    - button to revisit the deck now(/review/deck/:deck_id)

# /me/decks

List of all the decks that user created, show info like in dashboard page, but with a button to edit the deck's name, and a button to delete the deck.
At the top of the page, we have a button to create a new deck.

# /me/deck/:deck_id

User can only access their own decks. In this page, we show all the cards in the deck:
  - with pagination, each page show 20 cards
  - filterable by whether the card is already learned, or not
  - sortable by:
    - card's due date
    - card's stability score
  - for each card, we show the following information:
    - front content
    - back content
    - card stats: such as revisited count, correct rate, stability score(in Open Spaced Repetition algorithm), next due date, etc

# /decks

Under this route, we have a list of admin pre-made decks
  - [ ] paginated, each page show 20 decks (implement in next version)
  - [ ] searchable by deck's name (implement in next version)
  - [x] each deck has:
    - title
    - card count: number of cards in the deck
    - imported rate: number of cards that are already imported to user's deck / total number of cards in the deck
    - the deck is clickable, and user can click into the deck to see the detail page at /deck/:id

# /deck/:id

We only show decks that are pre-made by admin, if the deck is not created by admin, we show a 404 page, as user should not have access to other user's decks.
Under this route, we show the cards in the admin pre-made deck.The list of cards is:
  - paginated, each page show 20 cards
  - filterable by whether the card is already imported to user's deck, or not
  - has a button at the top to import X cards(unimported) from the deck to user's deck in id order, and another button to import X random cards from the deck to user's deck, where X is customizable through input field(default value is 10, between 5 to 100).

each card in the list has:
  - front content
  - back content
  - card stats: if the card is already imported to user's deck, we show stats of the card, such as revisited count, correct rate, stability score(in Open Spaced Repetition algorithm), next due date, etc
  - button to add card to user's deck
