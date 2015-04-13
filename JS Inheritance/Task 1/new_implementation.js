var Person = function (name, age) {
    this.name = name;
    this.age = age;
};

Person.new = function (parameters) {
    var obj = {};
    obj.__proto__ = this.prototype;

    //This part of the code works fine with parameters represented as an array
    //as well as object-based representation

    if (arguments.length <= 1) { 
        var parametersArray = [];
        for (var property in parameters) {
            if (parameters.hasOwnProperty(property)) {
                parametersArray.push(parameters[property]);
            }
        }
        this.apply(obj, parametersArray);
    } else {
        this.apply(obj, arguments);
    }

    return obj;
};

var obj = Person.new("John Doe", 30);
console.log(obj);
console.log(obj instanceof Person);

var obj = Person.new({name: "John Doe", age: 30});
console.log(obj);
console.log(obj instanceof Person);

var obj = Person.new({name1: "John Doe", name2: "Johanna Doe"}, {age1: 30, age2: 30});
console.log(obj);
console.log(obj instanceof Person);

var obj = Person.new(["John Doe", "Johanna Doe"], [30, 30]);
console.log(obj);
console.log(obj instanceof Person);