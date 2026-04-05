import JsonED from "./src";

const d = JsonED("hello")
d.insert("users", "username = user, password123 = pass, age = 10,active=true, h ahaha='asdasda,sdfs'")
console.log(d.read("users", 1))
d.update("users", 1, "username=world")
console.log(d.read("users", 1))
