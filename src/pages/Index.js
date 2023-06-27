import axios from "axios";
import { useEffect, useState } from "react";

import MovieNavBar from "../components/MovieNavBar";
import { Container, Form, Row, Spinner } from "react-bootstrap";
import SingleMovie from "../components/SingleMovie";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchMovies, setSearchMovie] = useState("");
  const [isSearchError, setIsSearchError] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [firstRun, setFirstRun] = useState(true);

  useEffect(() => {
    fetchMovie();
    setFirstRun(false);
  }, []);

  useEffect(() => {
    if (!firstRun) {
      const fetchTimer = setTimeout(() => {
        if (searchMovies && searchMovies.length > 2) {
          fetchMovie();
        } else if (searchMovies.length < 1) {
          fetchMovie();
        } else {
          setIsSearchError(true);
        }
      }, 200);

      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchMovies]);

  const fetchMovie = async () => {
    setIsSearchError(false);
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovies}`
      );
      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
    } catch (error) {
      setIsError(true);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <MovieNavBar />

      {/* <input
        type="text"
        placeholder="Search Movie"
        value={searchMovies}
        onChange={(e) => setSearchMovie(e.target.value)}
        style={{ float: "right", width: "200px" }}
      ></input> */}

      <Container className="mt-3">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => {
            setSearchMovie(e.target.value);
          }}
        />
        {isSearchError ? (
          <>
            <div
              style={{
                position: "absolute",

                backgroundColor: "rgba(255, 100, 100, 0.85)",
                padding: "2px 10px",
                color: "white",
                borderRadius: 3,
              }}
            >
              Please type at least 3 characters to search
            </div>
          </>
        ) : (
          <></>
        )}
      </Container>

      {Loading ? (
        <>
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </>
      ) : (
        <></>
      )}
      {!Loading && movies.length < 1 ? (
        <>
          <Container className="">No Movies Found..!</Container>
        </>
      ) : (
        <>
          {isError ? (
            <>
              <div
                style={{
                  background: "red",
                  color: "#fff",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                Movies not found!
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  background: "#e7e7e7",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <Row>
                  {movies.map((el) => (
                    <SingleMovie data={el} />
                  ))}
                </Row>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Index;
