import { WithContext as ReactTags } from "react-tag-input";
import Dropdown from "react-bootstrap/Dropdown";
import './css/style.css';

const SideBar = ({
  titles,
  setTitles,
  content,
  setContent,
  authors,
  setAuthor,
  genres,
  setGenre,
  publishers,
  setPublisher,
  setISBN,
  published,
  setPublished,
  submitting,
  handleSearch,
}) => {
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

  //Year Dropdown
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = 2000; year <= currentYear; year++) {
      years.push(year);
    }

    return years;
  };

  const yearOptions = generateYearOptions();

  //Published
  const handlePublished = (eventKey) => {
    if (eventKey === "Before") {
      setPublished({
        ...published,
        duration: "before",
      });
    } else if (eventKey === "After") {
      setPublished({
        ...published,
        duration: "after",
      });
    } else {
      setPublished({
        ...published,
        year: eventKey,
      });
    }
  };

  return (
    <>
      <nav id="sidebar" className="">
        <form action="" onSubmit={handleSearch}>
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
                <input type="text" onChange={(e) => setISBN(e.target.value)} />
              </li>

              <li>
                <label>Published</label>
                <Dropdown onSelect={handlePublished}>
                  <Dropdown.Toggle variant="primary" id="">
                    {published.duration}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="Before">Before</Dropdown.Item>
                    <Dropdown.Item eventKey="After">After</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown onSelect={handlePublished}>
                  <Dropdown.Toggle variant="primary" id="year-dropdown">
                    {published.year}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {yearOptions.map((year) => (
                      <Dropdown.Item key={year} eventKey={year}>
                        {year}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>

            <div className="mb-5">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </nav>
    </>
  );
};

export default SideBar;
