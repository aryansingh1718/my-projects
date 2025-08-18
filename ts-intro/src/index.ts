import { number, TypeOf } from "zod";

function greet(firstName : string | number){
    console.log("Hello" + firstName)
}
greet("aryan");
greet(1);

function sum(a: number,b: number):number{
    return a+b;
}
let ans = sum(1,2);
console.log(ans);

function isLegal(age: number){
    if(age >= 18){
        return "user is above 18";
    } 
    else{
        return "user is under age";
    }
}
console.log(isLegal(19))



//defining type as a function on the basis of its arguments and return type
function delayedCall(fn:() => void){
    setTimeout(fn,1000);
}
delayedCall(function () {
    console.log("hiii there")
})



//using interfaces for objects
interface userType {
    name:string,
    age:number
}
function greetUser(user:userType){
    console.log("hello " + user.name);
}
 let user: userType = {
    name:"aryan",
    age:20
 }
 greetUser(user)



 //if u want a certain key in an object to be optional
 interface UserType {
    name:string,
    age:number,
    address?:{          //? shows that adress is the optional field for any object following this interface
        city:string,
        pinCode:number
    }
 }
 let accountHolder: UserType = {
    name:"aryan",
    age:20,
 }



 //one interface using another interface
 interface Address {
    city:string,
    country:string,
    pinCode:number
 }
 interface User {
    name:string,
    age: number,
    address:Address
 }
 interface Office {
    address:Address     //here, the interface of address is used by both User and Office interface
 }



 //implementing interfaces to a class
 interface Person {
    name:string,
    age:Number,
    isLegal:() => boolean
 }
 class Worker implements Person {
    number: number          //we can add extra fields apart from Person interface   
    constructor(public name:string, public age:number){   //if we use public, we don't have to define name and age in Manager class explicitly
        this.name = name;
        this.age = age;
        this.number = 37342787887
    }
    isLegal() {
        return this.age>18;
    }
 }
 let manager = new Worker("Aryan",20);
 console.log(manager.isLegal())



 //intersection using types
 type Employee = {
    name:string,
    startDate: Date
 }
 type Manager = {
    name:string,
    department:string
 }
 type TeamLead = Employee & Manager     //this & is used for intersection.means Teamlead will have the types of both Employee and Manager
 const teamLead : TeamLead = {
    name:"Aryan singh",
    startDate: new Date(),
    department:"Web developer"
 }


 //union using types
 type GoodUser = {
    name:string,
    gift: string
 }
 type BadUser = {
    name:string,
    ip: string
 }
 type NetUser = GoodUser | BadUser;     //either gud user or baduser or both
 const netUser: NetUser = {
    name: "aryan singh",
    gift: "ipad",
    ip:"!47837"
 }



 //arrays as a type
 function getMax(arr: number[]){
    let maxValue = -10000000;
    for(let i = 0;i<arr.length;i++){
        if(arr[i]>maxValue)
            maxValue = arr[i];
    }
    return maxValue
 }
 const maxValue = getMax([1,3,78,3,4]);
 console.log(maxValue)



 //pick-> it is used when we wanna get a particular subset of an existing type/interface
 //partial-> it is used to make certain properties of a type optional
 interface Customer {
   id:string,
   name:string,
   age:number,
   email:string,
   password:string
 }
 type UpdateProps = Pick<Customer, 'name' | 'age' | 'password'>      //here the updateProps get the name,age, password from Customer interface
 type UpdatePropsOptional = Partial<UpdateProps>

 function updateCustomer(updateProps:UpdatePropsOptional){     //since updatePropsOptional has all the 3 fields but it's not necessary to provide all three of them to the function, so this helps user to update only the desired field.
         //hit the database to update the customer profile
 }



 //readOnly-> if we don't want to alter any value
 type Player = {
   readonly name:string,
   readonly age:number
 }
 const player: Player = {     //we can also use readOnly<Player> instead of using it again n again for keys.
   name:"aryan",
   age:20
 }
 console.log(player.name)


 //Record->used to give cleaner type to objects
 type Kids = Record<string,number>  //it says that the key is a string and value is a number
 const kids:Kids = {
   "sdjfsk":21
 }


 //Maps-> it's more of a js concept
 const users = new Map();
 users.set("ifhk",{name:"aryan",age:21})
 users.set("hrkjwh",{name:"singh",age:21})
 const getUser = users.get("ifhk")
 console.log(getUser)


 //Exclude-> if we want to exclude a particular type
 type EventType = 'click' | 'scroll' | 'mousemove';
 type ExcludeEvent = Exclude<EventType,'scroll'>;
 const handleEvent =  (event:ExcludeEvent) => {
   console.log(`Handling event : ${event}`);
 }
 handleEvent('mousemove');


 //type inference in zod
 import {z} from 'zod';
 import express from 'express';
 const app = express();
 const userProfileSchema = z.object({
   name:z.string().min(1),
   age:z.number().min(18).optional()
 })
 type FinalUserSchema = z.infer<typeof userProfileSchema>
 app.put("/user",(req,res) => {
   const {success } = userProfileSchema.safeParse(req.body);
   const updateBody: FinalUserSchema = req.body;
   if(!success){
      res.status(411).json({});
      return;
   }
 })