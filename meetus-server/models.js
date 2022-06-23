const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const CommentSchema = new mongoose.Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: false,
  },
});

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  subject: {
    type: String,
  },
  msg: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  }
});

const CategorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
});

const EventSchema = new mongoose.Schema({
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

// Mongoose will assume there is a collection called the plural of this name (i.e., 'users' in this case).
const User = mongoose.model("User", UserSchema);
const Contact = mongoose.model("Contact", ContactSchema);
const Category = mongoose.model("Category", CategorySchema);
const Event = mongoose.model("Event", EventSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { User, Contact, Category, Event, Comment };
