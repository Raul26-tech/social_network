import { app } from "./app";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`\n\n   WELCOME, SERVER IS RUNNING ON PORT ${port}\n\n`);
});

app.on("error", () => {
  console.log("\n\n   FAILURE AN UNEXPECTED ERROR OCCURRED  \n\n");
});
