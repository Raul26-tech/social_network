"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT;
console.log(port);
app_1.app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
app_1.app.on("error", () => {
    console.log("FAILURE AN UNEXPECTED ERROR OCCURRED");
});
//# sourceMappingURL=server.js.map