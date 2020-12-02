import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

function SavedBooks() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  const handleDelete = (event) => {
    event.persist();
    console.log("delete clicked");
    const bookid = event.target.id;
    API.deleteBook(bookid);
  }

    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Saved Books</h1>
            </Jumbotron>
              <List>
                {books.map(book => {
                  return (
                    <ListItem key={book.id}
                      id={book.id}
                      title={book.volumeInfo.title}
                      authors={book.volumeInfo.authors}
                      description={book.volumeInfo.description}
                      link={book.volumeInfo.previewLink}
                      imgsrc={book.volumeInfo.imageLinks.thumbnail}
                    >
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      <DeleteBtn id={book.id} onClick={handleDelete} />
                    </ListItem>
                  );
                })}
              </List>
          </Col>
        </Row>
      </Container>
    );
  }


export default SavedBooks;
