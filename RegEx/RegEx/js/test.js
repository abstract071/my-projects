console.log("test");

var str = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n<h1>Prechu</h1>\n<script src="scripts/jquery.sequence-min.js"></script>';
console.log(str.match(/<\w+\s+.+?>/g));

var mail = "abstract071@rambler.ru, abstract071@gmail.com";
console.log(mail.replace(/\b[\w\d_]+@\w+\.\w{2,3}\b/g, "<a href='mailto:$&'>$&</a>"));

var someString = "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.";
console.log(someString.replace(/(?=\b\w+)\w{2}/g, function(p1) {return p1[0] + p1[1].toUpperCase()}));



//console.log("test");
//
//var str = '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n<h1>Prechu</h1>\n<script src="scripts/jquery.sequence-min.js"></script>';
//console.log(str.match(/<\w+\s+.+?>/g));
//
//var mail = "abstract071@rambler.ru, abstract071@gmail.com";
//console.log(mail.replace(/\b[\w\d_]+@\w+\.\w{2,3}\b/g, "<a href='mailto:$&'>$&</a>"));
//
//var someString = "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.";
//console.log(someString.replace(/(?=\b\w+)\w{2}/g, function(p1) { return p1[0] + p1[1].toUpperCase() }));
//
//someString = "Заменить все теги <strike>some</strike> на <del> и <u>some</u> на <ins>";
//console.log(someString.match(/\<\/?strike\>/g));
//console.log(someString.replace(/(\<\/?strike\>)|(\<\/?u\>)/g, function(tag) {
//	if (tag === '<strike>' || tag === '</strike>') { return (tag[1] === '/') ? '</del>' : '<del>' }
//	else { return (tag[1] === '/') ? '</ins>' : '<ins>'; }
//}));
//
//someString = "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.";
//console.log(someString.replace(/\b\w{1,4}\b/g, function(word) { return '<b>' + word + '</b>' }));