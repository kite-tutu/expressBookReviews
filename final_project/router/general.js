const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise 1 resolved")
    },3000)})
   
    myPromise1.then((successMessage) => {
      res.send(JSON.stringify(books,null,4));
    
  })
  //res.send(JSON.stringify(books,null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn_num = req.params.isbn
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(isbn_num)
    },3000)})
   
    myPromise1.then((isbn_num) => {
      //console.log(isbn_num)
      res.send(books[isbn_num])
    
  })





  //const isbn = req.params.isbn;
  //res.send(books[isbn])
  //return res.status(300).json({message: "Yet to be implemented"});
 });

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code 

  const isbn_num = req.params.isbn
  let author = req.params.author
  let book_keys = Object.keys(books);
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(author)
    },3000)})
   
    myPromise1.then((author) => {
      //console.log(isbn_num)
      //console.log(book_keys);
  
      let details = book_keys.filter((book_key)=>{
        //console.log(author);
        //console.log(books[book_key].author);
        if (books[book_key].author === author) {
          return books[book_key].author
        } 
      });

      if(details.length > 0 ){
        res.send(books[details])
      } else {
        return res.status(404).json({message: "Details Not Found"});
      }
    
  })


});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

  let book_keys = Object.keys(books);
  //console.log(book_keys);
  let title = req.params.title



  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(title)
    },3000)})
   
    myPromise1.then((title) => {
      //console.log(isbn_num)
      //console.log(book_keys);
  
      let details = book_keys.filter((book_key)=>{
        //console.log(author);
        //console.log(books[book_key].author);
        if (books[book_key].title === title) {
          return books[book_key].title
        } 
      });
      if(details.length > 0 ){
        res.send(books[details])
      } else {
        return res.status(404).json({message: "Details Not Found"});
      }
    });
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;
  const reviews = req.params.reviews;
  res.send(books[isbn].reviews)

  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
