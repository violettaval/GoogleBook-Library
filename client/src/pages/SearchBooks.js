import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import SaveBtn from "../components/SaveBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function SearchBooks() {
  // Setting our component's initial state
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])

  // Load all books and store them with setBooks
  useEffect(() => {
    searchBooks()
  }, [search]);

  // Loads all books and sets them to books
  function searchBooks() {
    API.getBooks()
      .then(res => 
        setResults(res.data)
      )
      .catch(err => console.log(err));
  };

  const handleSearchInput = event => {
    setSearch(event.target.value);
  };

  const handleSave = (event) => {
    event.persist();
    const bookid = event.target.id;
    const getClickedBook = async() => {
      const clickedBook = results.filter(item => item.id === bookid)
      const bookToSave =  {                  
          id:clickedBook[0].id,
          title: clickedBook[0].volumeInfo.title,
          authors: clickedBook[0].volumeInfo.authors,
          description: clickedBook[0].volumeInfo.description,
          link: clickedBook[0].volumeInfo.previewLink,
          imgsrc: clickedBook[0].volumeInfo.imageLinks.thumbnail
      }
      return bookToSave;
    }
    getClickedBook().then(
      (bookData) => {
        API.saveBook(bookData);
      }
    ).catch(err => console.log(err));
  }

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Book Search</h1>
            </Jumbotron>
            <form>
              <TextArea handleSearch={handleSearchInput} value={search}/>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
              <List>
                {results.map(book => {
                  return (
                    <ListItem key={book.id} 
                    id={book.id}
                    title={book.volumeInfo.title}
                    authors={book.volumeInfo.authors}
                    description={book.volumeInfo.description}
                    link={book.volumeInfo.previewLink}
                    imgsrc={book.volumeInfo.imageLinks.thumbnail}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      <SaveBtn id={book.id} onClick={handleSave} />
                    </ListItem>
                  );
                })}
              </List>
          </Col>
        </Row>
      </Container>
    );
  }


export default SearchBooks;
