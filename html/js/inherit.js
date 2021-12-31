/*
 * @Descripttion: 继承测试
 * @version: 1.0
 * @Author: 谭义洋
 * @Date: 2021-12-31 11:40:09
 * @LastEditors: 谭义洋
 * @LastEditTime: 2021-12-31 18:23:43
 */

function SuperType(name){
    console.log('SuperType constructor')
    this.name = name
    this.color = ['blue']
}

SuperType.prototype.say = () => {
    console.log('hi')
}

/* 组合继承 start*/
function SubType(name, age){
    SuperType.call(this, name)
    this.age = age
}
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType  //之前指向SuperType, 重新指向SubType
SubType.prototype.walk = () => {
    console.log('walk')
}
/* 组合继承 end*/


/* 寄生组合继承 start*/
function SubType1(name, age) {
    SuperType.call(this, name)
    this.age = age
}

const tt = Object.create(SuperType.prototype)
tt.constructor = SubType1 // 修正constructor指向
SubType1.prototype = tt

SubType1.prototype.run = () => {
    console.log('run')
}
/* 寄生组合继承 end*/

/* 寄生继承 start */
function createAnother(original){
    var clone = Object.create(original);    //通过调用函数创建一个新对象
    clone.sayHi = function(){               //以某种方式来增强这个对象
        console.log("Hi");
    };
    
    return clone;                        //返回这个对象
}

var person = {
    name: "Bob",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = createAnother(person);
// anotherPerson.sayHi();
/* 寄生继承 end */

/* 借助中间对象实现（JSON的发明者道格拉斯的方法）start */
function F(){}
F.prototype = SuperType.prototype

function SubType2(age, name){
    SuperType.call(this, name)
    this.age = age
}

SubType2.prototype = new F()
SubType2.prototype.constructor = SubType2
// SubType2原型新增jump方法
SubType2.prototype.jump = () => {
    console.log('jump')
}
/* 借助中间对象实现（JSON的发明者道格拉斯的方法）end */