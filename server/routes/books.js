// modules required for routing
let express = require('express');
let router = express.Router();

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (_, res) => {
  let books = new Array();
  // find all books in the books collection
  book.find((err, model) => {
    if (err) {
      return console.error(err);
    }
    else {
        for (i=0; i<model.length; i++){
          books.push(model[i]._doc)
        }
        res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (_, res) => {
  res.render('books/add', {title: 'Add Book'});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res) => {
  let item = {
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  };
  book.create(item, (err) =>{
    if(err)
    {
      console.log(err)
      res.render('error',{message:'fail to create',error:err})
    }
    else
    {
        // refresh the book list
        res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res) => {
  let id = req.params.id || req.query.id;

  book.findById(id, (err, edit_content) => {
      if(err)
      {
          console.log(err)
          res.render('error',{message:'invalid book id',error:err})
      }
      else
      {
        //show the edit view
        res.render('books/edit', {title: 'Edit Book', book: edit_content})
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res) => {
  let id = req.body.id;

  let item = {
    "title": req.body.title,
    "description": req.body.description,
    "price": req.body.price,
    "author": req.body.author,
    "genre": req.body.genre
  };
  console.log(item)
  book.findOneAndUpdate(id, {$set:item}, (err) => {
      if(err)
      {
        console.log(err)
        res.render('error',{message:'fail to update',error:err})
      }
      else
      {
          // refresh the book list
          res.redirect('/books');
      }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res) => {
  let id = req.params.id || req.query.id;

  book.deleteOne({_id: id}, (err) => {
      if(err)
      {
        console.log(err)
        res.render('error',{message:'fail to delete',error:err})
      }
      else
      {
          // refresh the book list
          res.redirect('/books');
      }
  });
});

module.exports = router;