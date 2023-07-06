import appGlobal from "./src/app";

const port = process.env.PORT || 3000;

appGlobal.listen(3000, () => {
  console.log(`Server Listening On Port ${port}`);
});