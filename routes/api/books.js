const router = require("express").Router();
const Book = require("./bookModel");

router.get("/api/books", (req, res) => {
  Book.find({})
      .then(result => res.json(result))
      .catch(err => res.json(err));
});

// /api/books (post) - Will be used to save a new book to the database.
router.post("/api/books", ({body}, res) => {
  const book = new Book(body);
  Book.create(book)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });
// /api/books/:id (delete) - Will be used to delete a book from the database by BookID.
router.delete("/api/books/:id", (req,res) => {
  Book.deleteOne({ id: req.params.id })
      .then(console.log("delete successful"))
      .catch(err => res.status(422).json(err));
});

// send the apikey
router.get("/api/get_apikey", function (req, res) {
  let apiKey = process.env.API_KEY;
  res.send(apiKey);
});
module.exports = router;