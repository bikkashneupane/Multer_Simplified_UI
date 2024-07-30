import Multer from "./component/Multer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        Multer Simplified
      </h1>
      <hr />

      <Multer />
    </Container>
  );
}

export default App;
