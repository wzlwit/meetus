require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const { User, Contact, Category, Event, Comment } = require("./models");

const app = express();
// const port = 3001; 
// Must be different than the port of the React app
const port = process.env.PORT || 3001;

const validator = require("validator");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

app.use(cors()); // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
mongoose.connect(
  "mongodb+srv://mongouser:" +
  process.env.MONGODB_PWD +
  "@cluster0.y2ne1iy.mongodb.net/finalProject?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.json()); // Allows express to read a request body
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

app.get("/events", async (req, res) => {
  Event.find()
    .populate("categoryid")
    .exec((err, events) => {
      res.send(events);
    });
});

app.get("/events/:id", async (req, res) => {
  const id = req.params.id;
  const event = await Event.findOne({ _id: id })
    .populate("user")
    .populate("categoryid")
    .populate("comments");
  const comments = await Comment.find().populate("user");
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].event != id) {
      comments.splice(i, 1);
      i--;
    }
  }
  res.send({ event, comments });
});

app.post("/createEvent", async (req, res) => {
  const event = req.body;
  if (
    event.username &&
    event.title &&
    event.location &&
    event.description &&
    event.categoryname &&
    event.date &&
    event.time &&
    event.imageURL
  ) {
    const user = await User.findOne({ username: event.username });
    const category = await Category.findOne({
      categoryname: event.categoryname,
    });
    const eventToSave = {
      user: [user._id],
      title: event.title,
      location: event.location,
      description: event.description,
      categoryid: category._id,
      date: event.date,
      time: event.time,
      imageURL: event.imageURL,
      comment: [],
    };
    await Event.create(eventToSave);
    const events = await Event.find();
    res.send({ success: true, msg: "Event created successfully.", events });
  } else {
    res.send({
      success: false,
      msg: "You have to fill in the form completely.",
    });
  }
});

app.post("/joinEvent", async (req, res) => {
  const user = req.body.user;
  const eventid = req.body.eventid;

  try {
    const result = await Event.updateOne(
      { _id: eventid },
      { $addToSet: { user: [user._id] } }
    );
    if (result.modifiedCount > 0) {
      const event = await Event.findOne({ _id: eventid }).populate('user');
      res.send({ success: true, msg: "User added successfully", event });
    } else {
      res.send({
        success: false,
        msg: "No user added, pleaes try again later",
      });
    }
  } catch (err) {
    res.send(err);
  }
});

app.post("/leaveComment", async (req, res) => {
  const user = req.body.user;
  const eventid = req.body.eventid;
  const content = req.body.comment;

  try {
    const comment = await Comment.create({
      content,
      user: user._id,
      event: eventid,
    });
    const result = await Event.updateOne(
      { _id: eventid },
      { $addToSet: { comments: [comment._id] } }
    );
    if (result.modifiedCount > 0) {
      const event = await Event.findOne({ _id: eventid })
        .populate("user")
        .populate("comments");
      const comments = await Comment.find().populate("user");
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].event != eventid) {
          comments.splice(i, 1);
          i--;
        }
      }
      res.send({
        success: true,
        msg: "Comment added successfully",
        event,
        comments,
      });
    } else {
      res.send({
        success: false,
        msg: "No user added, pleaes try again later",
      });
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/comments", async (req, res) => {
  let comments = await Comment.find();
  res.send(comments);
});

app.get("/categories", async (req, res) => {
  let categories = await Category.find();
  res.send(categories);
});

//registration
app.post("/register", async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  const photoURL = request.body.photoURL;
  try {
    if (
      username &&
      password &&
      validator.isAlphanumeric(username) &&
      validator.isStrongPassword(password)
    ) {
      const user = await User.findOne({ username });
      if (user) {
        response.send({ success: false, msg: "username already exists." });
      } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userToSave = {
          username,
          password: hashedPassword,
          photoURL,
          description: "",
          email: "",
        };
        await User.create(userToSave);
        response.send({ success: true });
      }
    } else {
      response.send({ success: false, msg: "username or password not valid." });
    }
  } catch (err) {
    response.send({ success: false, msg: err.message });
  }
});

//login
app.post("/login", async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  try {
    if (username && password) {
      // Check to see if the user already exists. If not, then create it.
      const user = await User.findOne({ username: username });
      if (!user) {
        const msg = "Invalid login - username " + username + " doesn't exist.";
        response.send({ success: false, msg });
        return;
      } else {
        const isSame = await bcrypt.compare(password, user.password);
        if (isSame) {
          response.send({ success: true, user });
          return;
        } else {
          response.send({ success: false, msg: "Password Not Correct" });
          return;
        }
      }
    }
  } catch (error) {
    console.log(error.message);
    response.send({ success: true, msg: error.message });
    return;
  }
  response.send({
    success: false,
    msg: "username or password cannot be blank",
  });
});

//update user
app.patch("/update", async (request, response) => {
  const _id = request.body._id;
  const username = request.body.username;
  const password = request.body.password;
  const email = request.body.email;
  const description = request.body.description;
  const photoURL = request.body.photoURL;

  try {
    const userToUpdate = {};
    var validated = true;
    var message = '';

    if (!_id) {
      throw new Error('_id is required');
    }

    if (username) {
      if (validator.isAlphanumeric(username)) {
        userToUpdate.username = username;
      } else {
        validated = false;
        message += "username not valid. ";
      }
    }

    if (password) {
      if (validator.isStrongPassword(password)) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        userToUpdate.password = hashedPassword;
      } else {
        validated = false;
        message += "password not valid. ";
      }
    }

    if (email) {
      if (validator.isEmail(email)) {
        userToUpdate.email = email;
      } else {
        validated = false;
        message += "email not valid. ";
      }
    }

    if (description) {
      userToUpdate.description = description;
    }

    if (validated) {
      console.log(userToUpdate);
      const user = await User.findOneAndUpdate({ _id }, userToUpdate);
      response.send({ success: true, user });
    } else {
      throw new Error(message);
    }

  } catch (err) {
    response.send({ success: false, msg: err.message });
  }
});

//contacts - leave message
app.post("/contacts", async (request, response) => {
  const msg = request.body;
  try {
    await Contact.create(msg);
    response.send({ success: true });
  } catch (err) {
    response.send({ success: false, msg: err.message });
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);

// async function updateEvent() {
//   const users = await User.find();
//   try {
//     const result = await Event.updateOne(
//       { title: "French Conversation - - FREE & OPEN TO ALL LEVELS" },
//       { $addToSet: { user: [users[3]._id]} }
//     );
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// }

// seedData();

async function seedData() {
  // seedUserData()
  // seedCategoryData()
  // seedEvent();
}

// seed user data
function seedUserData() {
  insertUser(
    createUser(
      "Frankie Welch",
      "123456",
      "images/user1.jpeg",
      "Interested in fantasy movies, rocks, and swimming.",
      "aurelio@email.com"
    )
  );
  insertUser(
    createUser(
      "Nicolas Fletcher",
      "123456",
      "images/user2.jpeg",
      "Interested in puzzle games, cars, and paleontolgy.",
      "nicolasf@email.com"
    )
  );
  insertUser(
    createUser(
      "Nick V.",
      "123456",
      "images/user3.jpeg",
      "Interested in web design, fairies, and herbalism.",
      "nickv@email.com"
    )
  );
  insertUser(
    createUser(
      "Bryce Rich",
      "123456",
      "images/user4.jpeg",
      "Interested in photography, fossils, and old castles.",
      "bryce@email.com"
    )
  );
  insertUser(
    createUser(
      "Jospeh H.",
      "123456",
      "images/user5.jpeg",
      "Interested in science fiction movies, gymnastics, and jack o'lanterns.",
      "jospeh@email.com"
    )
  );
  insertUser(
    createUser(
      "Kathy E.",
      "123456",
      "images/user6.jpeg",
      "Interested in dolls, rubber stamps, and preparing for the downfall of civilization.",
      "kathy@email.com"
    )
  );
  insertUser(
    createUser(
      "Allie Hale",
      "123456",
      "images/user7.jpeg",
      "Interested in flying saucers, classical music, and cosplaying.",
      "allieh@email.com"
    )
  );
}
function createUser(
  username,
  password,
  photoURL = "",
  description = "",
  email = ""
) {
  return { username, password, photoURL, description, email };
}
function insertUser(user) {
  bcrypt.hash(user.password, saltRounds).then((hashedPassword) => {
    User.create({ ...user, password: hashedPassword });
  });
}

// seed category data
function seedCategoryData() {
  createCategory("Outdoors");
  createCategory("Foods");
  createCategory("Connect Over Tech");
  createCategory("Share Language + Culture");
}
function createCategory(categoryname) {
  Category.create({ categoryname });
}

function seedEvent() {
  createEvent(
    "Outdoors",
    "Outdoor Morning Yoga",
    "1343 rue Levy,Montreal, H3C 5K4",
    "1",
    "/images/event1_yoga.jpeg",
    "22 June 2022",
    "09:00"
  );
  createEvent(
    "Outdoors",
    "Hitch a Ferry Ride in Montreal",
    "718 Duke Street, Montreal, H3C 5K4",
    "2",
    "/images/event2_bike.jpeg",
    "25 June 2022",
    "09:45"
  );
  createEvent(
    "Outdoors",
    "Sunday Afternoon Fun Run in Plateau Mont-Royal",
    "1572 chemin Hudson, Montreal, H4J 1M9",
    "3",
    "/images/event3_running.jpeg",
    "26 June 2022",
    "13:00"
  );
  createEvent(
    "Foods",
    "Let's have Brunch @ Pub Papineau",
    "2467 Papineau Avenue, Montreal, H2K 4J5",
    "4",
    "/images/event4_pubPapineau.jpeg",
    "26 June 2022",
    "13:00"
  );
  createEvent(
    "Foods",
    "Vegetarian Picnic",
    "4755 Lynden Road, Montreal, J0N 1P0",
    "5",
    "/images/event5_vegetarian.jpeg",
    "26 June 2022",
    "13:00"
  );
  createEvent(
    "Foods",
    "Past to Apron: Food Program",
    "342 St. John Street, Montreal, H4P 3Y2",
    "6",
    "/images/event6_pastToApron.jpeg",
    "08 July 2022",
    "19:30"
  );
  createEvent(
    "Connect Over Tech",
    "Write-In Online",
    "Online Event",
    "7",
    "/images/event7_writing.jpeg",
    "29 June 2022",
    "19:45"
  );
  createEvent(
    "Connect Over Tech",
    "Online Social Game Night",
    "Online Event",
    "8",
    "/images/event8_social.jpeg",
    "25 June 2022",
    "21:45"
  );
  createEvent(
    "Connect Over Tech",
    "Rejuvenate with Dance Online",
    "Online Event",
    "9",
    "/images/event9_dancing.jpeg",
    "02 July 2022",
    "13:00"
  );
  createEvent(
    "Share Language + Culture",
    "Language Exchange & Party & Social in Montreal",
    "1084 rue Ellice, Montreal, J6N 1W6",
    "10",
    "/images/event10_party.jpeg",
    "25 June 2022",
    "13:00"
  );
  createEvent(
    "Share Language + Culture",
    "French Conversation - - FREE & OPEN TO ALL LEVELS",
    "84 Glen Long Avenue, Montreal, Quebec , H6B 1J8",
    "11",
    "/images/event11_french.jpeg",
    "17 July 2022",
    "19:00"
  );
  createEvent(
    "Share Language + Culture",
    "Italian and English FREE Dual Language Learning Hour",
    "109 Central Pkwy, Montreal, Quebec, J6N 1W6",
    "12",
    "/images/event12_italian.jpeg",
    "28 June 2022",
    "18:00"
  );
}
function createEvent(
  categoryname,
  title,
  location,
  description,
  imageURL,
  date,
  time
) {
  Category.findOne({ categoryname }).then((category) => {
    const event = {
      categoryid: category._id,
      title,
      location,
      description,
      imageURL,
      date,
      time,
    };
    Event.create(event);
  });
}

function createComment(username, title, content) {
  User.findOne({ username }).then((user) => {
    Event.findOne({ title }).then((event) => {
      const comment = {
        user: user._id,
        event: event._id,
        content,
      };
      Comment.create(comment);
    });
  });
}
