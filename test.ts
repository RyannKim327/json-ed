import { JsonED } from "./src";

const d = JsonED("hello")
d.insert("users", {
	"user": "user hahaha"
})
console.log(d.read("users", 1))
