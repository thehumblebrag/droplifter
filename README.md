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

## Tech

### Users

Sign up with Twitter, Facebook or Google+

- username
- avatar
- email/phone number (optional, private)
- gender (optional, private)
- location (city, optional, private)

Users can anonymize themselves completely which means that when you see
their drops you are provide a completely fake persona with a gender neutral
name such as `Jamie Jones`.

### Drops

- text message
- image message
- lat long
- points

Each drop gains points when users likes it which will be used to determine
it's longevity for people.
