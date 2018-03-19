//1. 作为普通函数在全局环境中被调用
function a(){
    var name = "技能树";
    console.log(this.name); //undefined
    console.log(this); //Window
}
a();

//2.作为对象的属性被调用
// ①
var o = {
    name:"技能树",
    fn:function(){
        console.log(this.name);  
    }
}
o.fn();
//②
var o = {
    name:"技能树",
    fn:function(){
        console.log(this.name); 
    }
}
window.o.fn();//技能树

//③
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //12
        }
    }
}
o.b.fn();

//④
var name = 'Jane';
var person = {
    name: 'Abby',
    sayName: function() {
           console.log(this.name);
	}
};
var sayNameWin = person.sayName;

person.sayName(); //Abby  sayName 方法是作为 person 的一个属性方法被调用
sayNameWin(); //Jane   作为 window 的方法被调用的

//⑤变形
var person1 = {
    name: 'Jane',
    sayName: function() {
	   console.log(this.name)
	}
}

var person2 = {
    name: 'Abby',
    sayName: person1.sayName
}

person2.sayName(); //Abby  作为 person2 的属性方法被调用

//⑥但是当在在对象方法中再定义函数，这时候 this 又是 window 。
var name = 'Jane';
var person = {
    name: 'Abby',
    sayName: function () {
        function fn(){
            console.log(this);      //window
            console.log(this.name);    //Jane
        }
        fn();
    }
}
person.sayName();

//3. 作为构造函数被调用
function Person(name) {
    this.name = name;
    console.log(this);  //Person {name: "Abby"}
}

var person = new Person('Abby');
console.log(person.name);  //Abby

//如果不加 new,表示即作为普通函数调用，指向 window
function Person(name) {
	this.name = name;
	console.log(this);  //window
}

Person('Jane'); 
console.log(window.name); //Jane




//this遇到return
function fn() {  
    this.user = '技能树';  
    return {};  
}
var a = new fn;  
console.log(a.user); //undefined

//再看一个
function fn() {  
    this.user = '技能树';  
    return function(){};
}
var a = new fn;  
console.log(a.user); //undefined

//再来
function fn() {  
    this.user = '技能树';  
    return 1;
}
var a = new fn;  
console.log(a.user); //技能树


function fn() {  
    this.user = '技能树';  
    return undefined;
}
var a = new fn;  
console.log(a.user); //技能树

//什么意思呢？

//如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。


function fn() {  
    this.user = '技能树';  
    return undefined;
}
var a = new fn;  
console.log(a); //fn {user: "技能树"}
