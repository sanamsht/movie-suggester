import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const SingleMovie = (props) => {
  return (
    <>
      <Col>
        <Card
          key={props.data.id}
          style={{ width: "20rem", minHeight: "790px" }}
        >
          <Card.Img
            variant="top"
            src={props.data.image}
            style={{ maxWidth: "350px" }}
          />
          <Card.Body>
            <Card.Title>
              <Link to={`/viewpage/${props.data.id}`}> {props.data.name} </Link>
            </Card.Title>
            <Card.Body>
              <b> Info:</b> {props.data.info} <br />
              <b> Rating:</b> {props.data.rating}
            </Card.Body>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
export default SingleMovie;
