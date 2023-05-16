import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import Dropdown from "react-bootstrap/Dropdown";

const SideBar = () => {
  const [titles, setTitles] = useState([]);
  const [content, setContent] = useState([]);
  const [authors, setAuthor] = useState([]);
  const [genres, setGenre] = useState([]);
  const [publishers, setPublisher] = useState([]);
  const [isbn, setISBN] = useState([]);
  const [published, setPublished] = useState({
    duration: "",
    year: "",
  });
  const [year, setYear] = useState("");

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  //Title
  const handleDeleteTitle = (i) => {
    console.log(i);
    setTitles(titles.filter((tag, index) => index !== i));
  };

  const handleAdditionTitle = (title) => {
    setTitles([...titles, title]);
  };

  const handleDragTitle = (tag, currPos, newPos) => {
    const newTags = titles.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTitles(newTags);
  };

  // console.log(titles);

  //Content
  const handleDeleteContent = (i) => {
    console.log(i);
    setContent(content.filter((tag, index) => index !== i));
  };

  const handleAdditionContent = (text) => {
    setContent([...content, text]);
  };

  const handleDragContent = (tag, currPos, newPos) => {
    const newContent = content.slice();

    newContent.splice(currPos, 1);
    newContent.splice(newPos, 0, tag);

    setContent(newContent);
  };

  // console.log(content);

  //Author
  const handleDeleteAuthor = (i) => {
    console.log(i);
    setAuthor(authors.filter((tag, index) => index !== i));
  };

  const handleAdditionAuthor = (author) => {
    setAuthor([...authors, author]);
  };

  const handleDragAuthor = (tag, currPos, newPos) => {
    const newAuthor = authors.slice();

    newAuthor.splice(currPos, 1);
    newAuthor.splice(newPos, 0, tag);

    setAuthor(newAuthor);
  };

  // console.log(authors);

  //Genre
  const handleDeleteGenre = (i) => {
    console.log(i);
    setGenre(genres.filter((tag, index) => index !== i));
  };

  const handleAdditionGenre = (genre) => {
    setGenre([...genres, genre]);
  };

  const handleDragGenre = (tag, currPos, newPos) => {
    const newGenre = genres.slice();

    newGenre.splice(currPos, 1);
    newGenre.splice(newPos, 0, tag);

    setGenre(newGenre);
  };

  //Publisher
  const handleDeletePublisher = (i) => {
    console.log(i);
    setPublisher(publishers.filter((tag, index) => index !== i));
  };

  const handleAdditionPublisher = (publisher) => {
    setPublisher([...publishers, publisher]);
  };

  const handleDragPublisher = (tag, currPos, newPos) => {
    const newPublisher = publishers.slice();

    newPublisher.splice(currPos, 1);
    newPublisher.splice(newPos, 0, tag);

    setPublisher(newPublisher);
  };

  //Published
  const handlePublished = (eventKey) => {
    switch (eventKey) {
      case "Before":
        setPublished({
          ...published,
          duration: "before",
        });
        break;
      case "After":
        setPublished({
          ...published,
          duration: "after",
        });
        break;
      case "January":
        setPublished({
          ...published,
          year: "1",
        });
        setYear("January");
        break;
      case "February":
        setPublished({
          ...published,
          year: "2",
        });
        setYear("February");
        break;
      case "March":
        setPublished({
          ...published,
          year: "3",
        });
        setYear("March");
        break;
      case "April":
        setPublished({
          ...published,
          year: "4",
        });
        setYear("April");
        break;
      case "May":
        setPublished({
          ...published,
          year: "5",
        });
        setYear("May");
        break;
      case "June":
        setPublished({
          ...published,
          year: "6",
        });
        setYear("June");
        break;
      case "July":
        setPublished({
          ...published,
          year: "7",
        });
        setYear("July");
        break;
      case "August":
        setPublished({
          ...published,
          year: "8",
        });
        setYear("August");
        break;
      case "September":
        setPublished({
          ...published,
          year: "after",
        });

        setYear("September");
        break;
      case "October":
        setPublished({
          ...published,
          year: "10",
        });
        setYear("October");
        break;
      case "November":
        setPublished({
          ...published,
          year: "11",
        });
        setYear("November");
        break;
      case "December":
        setPublished({
          ...published,
          year: "12",
        });
        setYear("December");
        break;
      default:
        break;
    }
  };

  console.log(published);

  /* const handleTitle = (title) => {
    if (title.endsWith(" ")) {
      const word = title.trim().split(" ").join("");
      let searchTitleObj = [...searchTitle, { label: word, value: word }];

      const inputElement = document.querySelector("#search_title input");
      inputElement.value = "";
      inputElement.blur();

      setSearchTitle(searchTitleObj);
    }
  };

  console.log(searchTitle); */

  return (
    <>
      <nav id="sidebar" className="">
        <div className="px-2 pt-3">
          <h3>Search Books</h3>
          <ul className="components mb-5">
            <li>
              <label>Title</label>
              <ReactTags
                tags={titles}
                delimiters={delimiters}
                handleDelete={handleDeleteTitle}
                handleAddition={handleAdditionTitle}
                handleDrag={handleDragTitle}
                handleTagClick={handleTagClick}
                inputFieldPosition="inline"
                autocomplete
                editable
              />
              {/* <Select
                  id="search_title"
                  isMulti={true}
                  onInputChange={handleTitle}
                  value={searchTitle}
                  placeholder="Search title"
                /> */}
            </li>
            <li>
              <label>Content</label>
              <ReactTags
                tags={content}
                delimiters={delimiters}
                handleDelete={handleDeleteContent}
                handleAddition={handleAdditionContent}
                handleDrag={handleDragContent}
                handleTagClick={handleTagClick}
                inputFieldPosition="inline"
                autocomplete
                editable
              />
            </li>
            <li>
              <label>Author</label>
              <ReactTags
                tags={authors}
                delimiters={delimiters}
                handleDelete={handleDeleteAuthor}
                handleAddition={handleAdditionAuthor}
                handleDrag={handleDragAuthor}
                handleTagClick={handleTagClick}
                inputFieldPosition="inline"
                autocomplete
                editable
              />
            </li>
            <li>
              <label>Genre</label>
              <ReactTags
                tags={genres}
                delimiters={delimiters}
                handleDelete={handleDeleteGenre}
                handleAddition={handleAdditionGenre}
                handleDrag={handleDragGenre}
                handleTagClick={handleTagClick}
                inputFieldPosition="inline"
                autocomplete
                editable
              />
            </li>
            <li>
              <label>Publisher</label>
              <ReactTags
                tags={publishers}
                delimiters={delimiters}
                handleDelete={handleDeletePublisher}
                handleAddition={handleAdditionPublisher}
                handleDrag={handleDragPublisher}
                handleTagClick={handleTagClick}
                inputFieldPosition="inline"
                autocomplete
                editable
              />
            </li>
            <li>
              <label>ISBN</label>
              <input type="test" onChange={(e) => setISBN(e.target.value)} />
            </li>

            <li>
              <label>Published</label>
              <Dropdown onSelect={handlePublished}>
                <Dropdown.Toggle variant="" id="">
                  {published.duration}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="Before">Before</Dropdown.Item>
                  <Dropdown.Item eventKey="After">After</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown onSelect={handlePublished}>
                <Dropdown.Toggle variant="" id="">
                  {year}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="January">January</Dropdown.Item>
                  <Dropdown.Item eventKey="February">February</Dropdown.Item>
                  <Dropdown.Item eventKey="March">March</Dropdown.Item>
                  <Dropdown.Item eventKey="April">April</Dropdown.Item>
                  <Dropdown.Item eventKey="May">May</Dropdown.Item>
                  <Dropdown.Item eventKey="June">June</Dropdown.Item>
                  <Dropdown.Item eventKey="July">July</Dropdown.Item>
                  <Dropdown.Item eventKey="August">August</Dropdown.Item>
                  <Dropdown.Item eventKey="September">September</Dropdown.Item>
                  <Dropdown.Item eventKey="October">October</Dropdown.Item>
                  <Dropdown.Item eventKey="November">November</Dropdown.Item>
                  <Dropdown.Item eventKey="December">December</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

          </ul>

          <div className="mb-5">
          <button
                type="button"
                className="btn btn-primary"
                // disabled={submitting}
                // onClick={() => handleAddEditDetails(bookDetails.id)}
              >
                Search
              </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
