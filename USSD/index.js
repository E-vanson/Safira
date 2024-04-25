const express = require("express");
const app = express();
const UssdMenu = require("ussd-menu-builder");
const axios = require("axios");
let menu = new UssdMenu();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/test", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  res.send("Testing the requests");
  const number = phoneNumber;
});

menu.startState({
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con(
      "Welcome To Safira. Choose your route:" +
        "\n1. Langata" +
        "\n2. Kibra" +
        "\n3. Rongai" +
        "\n4. Westlands" +
        "\n5. Kabiria" +
        "\n6. Sattelite"
    );
  },
  // next object links to next state based on user input
  next: {
    1: "Langata",
    2: "Kibra",
    3: "Rongai",
    4: "Westlands",
    5: "Kabiria",
    6: "Sattelite",
  },
});

menu.state("Langata", {
  run: function () {
    menu.con(
      "Choose pickup point:" +
        "\n1. Langata Cemetery" +
        "\n2. Langata Police Station" +
        "\n3. Wilson Airport"
    );
  },
  next: {
    1: "Langata Cemetery",
    2: "Langata Police Station",
    3: "Wilson Airport",
  },
  defaultNext: "invalidOption",
});

menu.state("Kibra", {
  run: function () {
    menu.con("Choose pickup point:" + "\n1. Olympic");
  },
  next: {
    1: "Olympic",
  },
  defaultNext: "invalidOption",
});

menu.state("Rongai", {
  run: function () {
    menu.con("Choose pickup point:" + "\n1. Nyutu");
  },
  next: {
    1: "Nyutu",
  },
  defaultNext: "invalidOption",
});

menu.state("Westlands", {
  run: function () {
    menu.con("Choose pickup point:" + "\n1. Westlands Terminal");
  },
  next: {
    1: "Westlands Terminal",
  },
  defaultNext: "invalidOption",
});

menu.state("Kabiria", {
  run: function () {
    menu.con("Choose pickup point:" + "\n1. Kwa Maji");
  },
  next: {
    1: "Kwa Maji",
  },
  defaultNext: "invalidOption",
});

menu.state("Sattelite", {
  run: function () {
    menu.con("Choose pickup point:" + "\n1. Munaku Lane");
  },
  next: {
    1: "Munaku Lane",
  },
  defaultNext: "invalidOption",
});

menu.state("Langata Cemetery", {
  run: function () {
    menu.con("Choose Destination :" + "\n1. CBD");
  },
  next: {
    1: "CBD",
  },
  defaultNext: "invalidOption",
});

menu.state("Langata Police Station", {
  run: function () {
    menu.con("Choose Destination :" + "\n1. CBD");
  },
  next: {
    1: "CBD",
  },
  defaultNext: "invalidOption",
});

menu.state("Wilson Airport", {
  run: function () {
    menu.con("Choose Destination :" + "\n1. CBD");
  },
  next: {
    1: "CBD",
  },
  defaultNext: "invalidOption",
});

menu.state("Olympic", {
  run: function () {
    menu.con("Choose Destination :" + "\n1. CBD");
  },
  next: {
    1: "CBD",
  },
  defaultNext: "invalidOption",
});

menu.state("Nyutu", {
  run: function () {
    menu.con("Choose Destination :" + "\n1. CBD");
  },
  next: {
    1: "CBD",
  },
  defaultNext: "invalidOption",
});

menu.state("Westlands Terminal", {
  run: function () {
    menu.con("Choose Destination :" + "\n1. CBD");
  },
  next: {
    1: "CBD",
  },
  defaultNext: "invalidOption",
});

menu.state("Kwa Maji", {
  run: function () {
    menu.con("Choose Destination :" + "\n1. CBD");
  },
  next: {
    1: "CBD",
  },
  defaultNext: "invalidOption",
});

menu.state("Munaku Lane", {
  run: function () {
    menu.con("Choose Destination :" + "\n1. CBD");
  },
  next: {
    1: "CBD",
  },
  defaultNext: "invalidOption",
});

let price = 70;
menu.state("CBD", {
  run: function () {
    menu.con(`Price is ${price}` + "\n1. Accept" + "\n2. Decline");
  },
  next: {
    1: "Accept",
    2: "Decline",
  },
  defaultNext: "invalidOption",
});

menu.state("Accept", {
  // log here
  run: function () {
    console.log("before stk push method");
    const phoneNumber = menu.args.phoneNumber;
    axios
      .get(`http://payment.cradlevoices.com/?phone=${phoneNumber}&amount=${price}`)
      .then((res) => console.log("response", res))
      .catch((err) => console.log("error", err));
    // try {
    //   app.get("/", (req, res) => {
    //     console.log("inside stk push method");
    //     const { sessionId, serviceCode, phoneNumber, text } = req.body;
    //     const { phone } = phoneNumber; // Destructure the phoneNumber from the body
    //     console.log("Before STK push");
    //     // Construct the URL with the phone number
    //     const url = `http://payment.cradlevoices.com/?phone=${phone}&amount=${price}`;
    //     console.log(url);
    //     console.log("After STK push");
    //     // Redirect to the URL for STK push
    //     res.redirect(url);
    //   });
    // } catch (error) {
    //   res.send(error);
    // }
  },
});

menu.state("Decline", {
  run: function () {
    menu.end("You terminated the session");
  },
});

app.post("/ussd", function (req, res) {
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log(`Ussd server listening on port ${PORT}`);
});
