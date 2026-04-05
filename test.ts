import JsonED from "./src";

const d = JsonED("hello")
d.insert("users", "username = user, password123 = pass, age = 10,active=true, hahaha='asdasda,sdfs'")
console.log(d.read("users", 1))
