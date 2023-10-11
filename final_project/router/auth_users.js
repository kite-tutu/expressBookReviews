const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
  //write code to check if username and password match the one we have in records.
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 120 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  
  const isbn = req.params.isbn;
    let book = books[isbn]
    if (book) { //Check is friend exists
        let review = req.body.reviews;
        current_user = req.params.username
        //Add similarly for firstName
        //Add similarly for lastName
        //if DOB the DOB has been changed, update the DOB 
        if(review) {
          if (req.session.authorization[1] = current_user){
            books[isbn].reviews[current_user] = review
           }else {
            books[isbn].reviews = {...books[isbn].reviews, current_user:review}
           }
        }
       // console.log(books[isbn].reviews)
        //console.log(review)
        //console.log(books[isbn])
        //Add similarly for firstName
        //Add similarly for lastName
        //friends[email]=friend;
        res.send(`Review for book with ISBN - ${isbn} added.`);
    }
    else{
        res.send("Unable to find book!");
    }
  //return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  if (isbn){
      delete books[isbn].reviews[req.params.username];
  }
  res.send(`Book with the ISBN  ${isbn} by user ${req.params.username} deleted.`);
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
