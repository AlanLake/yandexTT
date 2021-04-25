import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("")
  const [books, setBooks] = useState("")
  const getBook = async (title) => {
    const titleQuery = title.toLowerCase().split(" ").join("+");
    try {
      const response = await fetch(
        `http://openlibrary.org/search.json?q=${titleQuery}`
      );
      const data = await response.json();
      const results = data.docs.filter((elem) => elem.title === title);
      results.map(elem => console.log(elem.title))
      console.log(results)
      setBooks(results)
    } catch {
      console.log("error");
    }
  };
  const getCover = (ISBN) => {
      return  `http://covers.openlibrary.org/b/isbn/${ISBN}-S.jpg`
  }
  useEffect(() => {
    console.log(search)
    const interval = setTimeout(() =>{
          getBook(search);
    }, 1000)

    return () => {
      clearTimeout(interval)
    }
  }, [search])
  return (
    <div className="App">
      <input type="text" onChange={(event) => setSearch(event.target.value)}/>
      {books ? (
        books.map((book) => {
          return (
            <>
              <p>{book.title}</p>
              <p>
                Author:{" "}
                {book.author_name ? book.author_name.join(", ") : "Not listed"}
              </p>
              {book.isbn ? <img src={getCover(book.isbn[0])} alt="" /> : "Cover"}
            </>
          );
        })
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default App;
