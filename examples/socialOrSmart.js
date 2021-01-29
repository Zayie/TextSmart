const Tsjs = require('../lib');
const tsjs = new Tsjs.Classifier();

tsjs.train("Issac nueton was born in Philidelphia, USA on March 20th during the first world war. He has many acomplishments, like inventing music.", "smart");
tsjs.train("Just dyed my hair blonde, ya'll fw it or nah. Todays gonna be a rich day, I hope ya'll can find peace and love, praying for everyone!", "social");
tsjs.train("When thinking about possible strategies to make the hypososis iniate conduction, consider the following:", "smart");
tsjs.train("3K+ YEYY!!! ITS FINALLY READY TYSM GUYS FOR ALL THE SUPPORT IT MAKES ME INCREDIBLE HAPPY! Sparkling heartBlue heart As a special for the 3k I'll do a little artist support to share my clout with you So drop your art here and a little presentation of yourself and ill rt/like/follow some Pleading faceTwo hearts.", "social");
tsjs.train("Kaja Kallas (born 18 June 1977) is an Estonian politician and the current Prime Minister of Estonia. Sworn in on 26 January 2021, she is the first woman to serve in the position.", "smart");
tsjs.train("My cousin lives near the NYC Line Friends store and shipped me all these goodies. I'm so happy Loudly crying facePleading facePurple heart #bts #BT21", "social");
tsjs.train("Young Kwok Corky Lee (1947 – January 27, 2021) was an American journalistic photographer. His work chronicled and explored the diversity and nuances of Asian American culture overlooked by mainstream media, and advocated for ensuring Asian American history was included as a part of American history.", "smart");
tsjs.train("I could honestly write a movie about what happened the past few days and make millions lmao, I didn’t see any of this coming and it’s such a total mindfuck! I’m glad it ended how it did, I wouldn’t have it any other way", "social");
tsjs.train("Lego System A/S (trade name: The Lego Group) is a Danish toy production company based in Billund.[5] It is best known for the manufacture of Lego-brand toys, consisting mostly of interlocking plastic bricks. The Lego Group has also built several amusement parks around the world, each known as Legoland, and operates numerous retail stores.", "smart");

console.log(JSON.stringify(tsjs.predict("if u want to draw something silly n small for yourself do it.  you don’t have to constantly pump out perfect completed pieces of art. some of my favorite pieces of art i’ve made are 10 minute doodles")));
console.log(JSON.stringify(tsjs.predict("Taylor Alison Swift is a multi-Grammy award-winning American singer/songwriter who, in 2010 at the age of 20, became the youngest artist in history to win the Grammy Award for Album of the Year. In 2011 Swift was named Billboard's Woman of the Year.")));