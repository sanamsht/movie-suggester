import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import MovieNavBar from "../components/MovieNavBar";
import { Button, Form, Modal } from "react-bootstrap";
import MovieModal from "../components/MovieModal";

const AddMovie = () => {
  const history = useHistory();
  const [addMovie, setAddMovie] = useState({});
  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");

  const getAccessToken = localStorage.getItem("accessToken");
  //e.preventDefault();

  const addMovieHandler = async (e) => {
    e.preventDefault();
    const movieData = {
      movie_name: movieName,
      rating: movieRating,
      description: movieDesc,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      //console.log(movieRating);
      setAddMovie(response);

      if (addMovie) {
        setModalShow(true);
        setModalText(`${response.data.status} ${response.data.message}`);
        setTimeout(() => {
          history.replace("/");
        }, 1500);
      } else {
        setModalShow(true);
        setModalText("Failed to add movie. Please Try Again..!");
      }
    } catch (error) {
      if (error.response) {
        setModalShow(true);
        setModalText(error.response.data.errors[0].message);
      } else {
        setModalShow(true);
        setModalText("Unknown Error Occured..! Try again later");
      }
    }
  };

  return (
    <>
      {" "}
      {getAccessToken ? (
        <>
          <MovieNavBar />
          <Form onSubmit={addMovieHandler} className="mt-3 ms-3">
            <Form.Group>
              <div className="row g-3 align-items-center">
                <div className="col-1">
                  <Form.Label>Movie Name:</Form.Label>
                </div>
                <div className="col-auto">
                  <Form.Control
                    type="text"
                    value={movieName}
                    onChange={(e) => {
                      setMovieName(e.target.value);
                    }}
                    className="col-auto"
                  />
                </div>
              </div>
              <br />
              <div className="row g-3 align-items-center">
                <div className="col-1">
                  <Form.Label>Rating:</Form.Label>
                </div>
                <div className="col-auto">
                  <Form.Control
                    type="number"
                    value={movieRating}
                    onChange={(e) => {
                      setMovieRating(e.target.value);
                    }}
                    className="col-auto"
                  />
                </div>
              </div>

              <br />
              <div className="row g-3 align-items-center">
                <div className="col-1">
                  <Form.Label>Description:</Form.Label>
                </div>
                <div className="col-auto">
                  <Form.Control
                    as="textarea"
                    value={movieDesc}
                    onChange={(e) => {
                      setMovieDesc(e.target.value);
                    }}
                    className="col-auto"
                  />
                </div>
              </div>

              <br />

              <Button type="submit" className="ms-5 me-5">
                Add Movie
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  history.replace("/");
                }}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </>
      ) : (
        <>{history.replace("/login")}</>
      )}
      <MovieModal
        data={modalText}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
export default AddMovie;
