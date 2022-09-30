# düsgörd

This is a super simple chat application solely built for the purpose to figure out how to work with web sockets in Rust. Even tho it might seem a bit like the name is insipred by a very popular ~~but absolutely overrated~~ chat platform out there, it isn't.

The [backend server](server/) is built with [async-tungstenite](https://crates.io/crates/async-tungstenite) on top of [async-std](https://crates.io/crates/async-std). The app can be accessed via the provided [web client](webclient/) which is built with [SolidJS](https://www.solidjs.com/).

## Demo

Currently, a little public demo is deployed on Heroku and GitHub Pages and can be accessed via [duesgoerd.zekro.de](https://duesgoerd.zekro.de). The web socket server address is `wss://duesgoerd.herokuapp.com`.

> If the demo is down, please create an issue to inform me about that. :)

## Suggestions

Because I have very little experience with Rust, I would be very happy if you would want to review my code and suggest changes and how I can do better. Same goes for the solid web app because I am very new to SolidJS as well.