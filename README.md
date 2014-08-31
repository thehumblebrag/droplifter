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

#### Longevity of Drops

Longevity of a drop is influenced by the following factors:

- **Active** influence from users
- **Passive** influence from location factors

##### Active Influence: Likes & Reports

Users can *like* or *report* a drop, thereby increasing or decreasing its lifespan. *Likes* indicate users find a drop useful, interesting, or entertaining, and should stick around longer. *Reports* indicate users find a drop unhelpful, inappropriate, or harmful, and should disappear as soon as possible.

##### Passive Influence: Population & Frequency

A drop's initial lifespan is affected by drop population at a location, and drop frequency in a region. *Population* refers to the number of other active drops at a location. *Frequency* refers to the rate at which drops appear within a region, current to the time a new drop is to be created.

Both population and frequency have an inverse effect on lifespan.

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
- `proximity_radius`: The radius (in meters) that a user must be within to find a Drop (default `500`)

## Lexicon

- **bump**: Equivalent of a *like* or *heart*; a bump can extend the life of a drop.
- **comment**: Note left in response to a drop, attached to the drop.
- **connect**: Use of a social network service to join Droplifter.
- **convo**: (ie. conversation) View of drop and associated comments.
- **drop**: A new message, bound to a location. Drops have a natural lifespan, which can be extended with a bump.
- **stream**: View of drops within proximity radius.
