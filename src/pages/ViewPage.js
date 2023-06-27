import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieNavBar from "../components/MovieNavBar";
import { Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import MovieModal from "../components/MovieModal";

const ViewPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalText, setModalText] = useState("");

  const getParams = useParams();
  const getId = getParams.id;
  useEffect(() => {
    fetchMoiveDetail();
  }, []);

  const fetchMoiveDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getId}`
      );
      setMovieDetails(response.data.singleMovieData);
      setLoading(false);
    } catch (error) {
      setModalShow(true);
      setModalText("Movie Details Not Found");
      setLoading(false);
    }
  };
  return (
    <>
      <MovieNavBar />
      {loading ? (
        <>
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </>
      ) : (
        <>
          <br />
          {movieDetails ? (
            <>
              <div key={getId} style={{ padding: "0px", margin: "10px" }}>
                <Container>
                  <Card.Title>
                    <h3 className="text-info">{movieDetails.name}</h3>
                  </Card.Title>
                  <br />
                  <Row>
                    <Col>
                      <Card.Text>
                        <b>Information :</b>
                        {movieDetails.info}
                      </Card.Text>
                      <Card.Text>
                        <b>Description :</b>
                        {movieDetails.desc}
                      </Card.Text>
                      <Card.Text className="fw-b">
                        <b>Rating : </b>
                        {movieDetails.rating}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Image
                        src={movieDetails.image}
                        className="mh-100"
                        style={{ height: "300px" }}
                        alt={`${movieDetails.name}.jpg`}
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
            </>
          ) : (
            <>Not available</>
          )}
        </>
      )}
      <MovieModal
        data={modalText}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
export default ViewPage;
