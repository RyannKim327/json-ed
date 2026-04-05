import JsonED from "./src";

const d = JsonED("hello")
d.insert("users", "username = user, password123 = pass,age=10,active=true")
console.log(d.read("users", 1))
