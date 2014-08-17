![Droplifter](artwork/droplifter-logo.png)

# Droplifter

Droplifter is a proximity based chat application.
Messages have a score which determines their longevity.
Users are promoted based on their messages' score.

## Example usage:

- "Hey bro this bar is banging whose the dee jay?"
- "Dooood that dee jay is my brothers cousin"
- "Nooo way"

Hanging out in the world one dropping at a time.

## Design

- Mood board http://www.pinterest.com/brighita/droplifter/
- Font selection

## Tech

### Users

Sign up with Twitter, Facebook or Google+

- username
- avatar
- email/phone number (optional, private)
- gender (optional, private)
- location (city, optional, private)

Users can anonymize themselves completely which means that when you see their drops you are provide a completely fake persona with a gender neutral name such as `Jamie Jones`.

### Drops

- text message
- image message
- lat long
- points

Each drop gains points when users likes it which will be used to determine it's longevity for people.

## Stories

### Dave accepts his miserable life

> Dave is bored at his local bar and drink prices are expensive. It's cold outside though, and he doesn't want to chance going someplace else and it turning out to be rubbish. He checks Droplifter for a laugh, and notices a drop attached to the wine bar just a few doors down - ‘it’s awesome here and not too crowded - having a great night'. Just as he is about to relocate, a new new drop pops up from someone saying they've waited half an hour in line outside the wine bar, and the bouncers aren’t letting people in wearing trainers. Dave sits back down and orders another overpriced beer.

### Amelia shares a moment

> Amelia is a nature lover who enjoys going for hikes in the valley. On one such evening walk, she sits herself down beside a tree for a well-earned rest break. She notices her phone has a surprisingly strong signal, and seeing a cheeky opportunity fires up Droplifter. After a quick photo, she drops a note at her spot to point out that at this time and at this location, the sun setting over the hills looks a bit like an arse. Future hikers will no doubt share in the delight of her discovery.

### Maurice makes friends

> Maurice is sitting at home on his couch. It's Saturday night, and he needs to make plans, stat. He pulls out his smartphone: no missed calls, no messages, no tinder matches. On a whim, he fires up Droplifter... and settles back into his couch, chatting with a number of nearby players. He chats up a frisky young lady (who is, in fact, his dad on the ipad upstairs). In an effort to track her down in real life, he sets out to the nearest burger joint to see if she’s there. Inevitably, she disappears off his chat list as he moves, but others appear and take her place on his list. He sits at Hungry Spot on chat for the rest of the night, talking to many more men he thinks are women.

## Getting Started

### Requirements

- nodejs with npm (`brew install nodejs`)
- mongodb (`brew install mongodb`)

### Running your server

1. Clone the repo to your machine with `git clone git@github.com:thehumblebrag/droplifter.git`
2. Install dependencies with `npm install` (in your `/path/to/repo`)
3. _Optional:_ Update the `config.js` file with your own settings.
4. _Optional:_ Initialize your server using test data with `node bin/init`.
4. Launch your server with `npm start`

### Configuration

Your server can be configured by changing the `config.js` file within your repo. Droplifter supports the following settings:

- `port`: Port to use for your server to listen on (default `3000`)
- `database_url`: Location for your mongo instance (default `mongodb://localhost/droplifter`)
