import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Navbar } from "react-bootstrap";


const MyNav = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faPhotoFilm} style={{fontSize:'30px'}}/>
            {" "}
            Custom PyTorch Transformations!!
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNav;
