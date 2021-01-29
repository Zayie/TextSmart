![](https://i.imgur.com/uVN8IP9.png)

<br>

# TextSmart
A Javascript library from Zayie for interpreting and classifying binary and text inputs with machine learning, sorting, ngrams, probability and other engines working together.

## Installation
To use TS.JS, you'll need to install via source or using a package manager like [NPM](https://npmjs.com), Github NPM, Apt or Yarn.

```
gh repo clone Zayie/TextSmart
git clone https://github.com/zayie/textsmart

npm install textsmart
apt-get install textsmart
yarn install textsmart
```

## Initalization

Once you've installed the library and sourced it in your code, just like this. (Use whatever variable you want.)

```javascript
const TextSmart = require('textsmart');
const tsjs = new TextSmart.Classifier();
```

## Usage
### Training

You can train your model to understand what goes where, for example, let's make a classifier that sees if text is informational or social, these examples are from me, Wikipedia and random Twitter posts.

```js

tsjs.train("Issac nueton was born in Philidelphia, USA on March 20th during the first world war. He has many acomplishments, like inventing music.", "smart");

tsjs.train("Just dyed my hair blonde, ya'll fw it or nah. Todays gonna be a rich day, I hope ya'll can find peace and love, praying for everyone!", "social");

tsjs.train("When thinking about possible strategies to make the hypososis iniate conduction, consider the following:", "smart");

// Twitter - @kokoa_garden
tsjs.train("3K+ YEYY!!! ITS FINALLY READY TYSM GUYS FOR ALL THE SUPPORT IT MAKES ME INCREDIBLE HAPPY! As a special for the 3k I'll do a little artist support to share my clout with you So drop your art here and a little presentation of yourself and ill rt/like/follow some. :)", "social");

tsjs.train("Kaja Kallas (born 18 June 1977) is an Estonian politician and the current Prime Minister of Estonia. Sworn in on 26 January 2021, she is the first woman to serve in the position.", "smart");

// Twitter - @BernSoto
tsjs.train("My cousin lives near the NYC Line Friends store and shipped me all these goodies. I'm so happy #bts #BT21", "social");

tsjs.train("Young Kwok Corky Lee (1947 – January 27, 2021) was an American journalistic photographer. His work chronicled and explored the diversity and nuances of Asian American culture overlooked by mainstream media, and advocated for ensuring Asian American history was included as a part of American history.", "smart");

// Twitter - @SugarPineNW
tsjs.train("I could honestly write a movie about what happened the past few days and make millions lmao, I didn’t see any of this coming and it’s such a total mindfuck! I’m glad it ended how it did, I wouldn’t have it any other way", "social");

tsjs.train("Lego System A/S (trade name: The Lego Group) is a Danish toy production company based in Billund.[5] It is best known for the manufacture of Lego-brand toys, consisting mostly of interlocking plastic bricks. The Lego Group has also built several amusement parks around the world, each known as Legoland, and operates numerous retail stores.", "smart");
```

### Parsing

Now we can test it using the `tsjs.predict()` meathod, the expected outputs are below with the real responses! You can test this demo at [this link](https://sandbox.zayie.net/javascript/83kk9E92ikM11?node=true) (in the zayie.net sandbox) or see the full code in [examples/socialOrSmart.js](examples/socialOrSmart.js)

```javascript
// Text Scrap #1
// Twitter - @ciaraturnerart

console.log(JSON.stringify(tsjs.predict("if u want to draw something silly n small for yourself do it.  you don’t have to constantly pump out perfect completed pieces of art. some of my favorite pieces of art i’ve made are 10 minute doodles")));

// Text Scrap #2
// IMDB - Taylor Swift

console.log(JSON.stringify(tsjs.predict("Taylor Alison Swift is a multi-Grammy award-winning American singer/songwriter who, in 2010 at the age of 20, became the youngest artist in history to win the Grammy Award for Album of the Year. In 2011 Swift was named Billboard's Woman of the Year.")));
```

### Results

```js
// Text Scrap #1

What we wanted - Social
What we got    - Social (21.55%)

// Text Scrap #2

What we wanted - Smart
What we got    - Smart (59.13%)
```

The system hit the nail on the head on this one with only 4 scraps for each type, you can add dozens, hundreds or even millions (if you can handle it) of examples into the dictionary in order to get the most optimal results.

## Footnotes

Improvements, controbutions, and editors are welcome! Email opensource@zayie.com for more information.