import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import HeaderAdmin from "../../components/HeaderAdmin";

const ShowPracenje = () => {
  const { id } = useParams();
  const [pracenje, setPracenje] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getAllPracenje = async () => {
      try {
        const { data } = await axios.get('/api/aplikacija/getAllPracenje');
        setPracenje(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getAllPracenje();
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const obrisiPracenje = () => {
    // Implement deletion logic here
    console.log('Deleting pracenje...');
  };

  return (
    <div>
      <HeaderAdmin/>
      <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Popis praćenja</h1>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col-4">
            <nav className="nav flex-column">
              <NavLink className="nav-link">
                <Link to={`/showVozilo`} className="btn btn-outline-dark btn-lg">Pregled vozila</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/showZahtjevi`} className="btn btn-outline-dark btn-lg">Pregled zahtjeva</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/showPracenje`} className="btn btn-outline-dark btn-lg">Praćenje automobila</Link>
              </NavLink>
              <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark btn-lg btn-block mb-2">Vrati se na početnu</Link>
              <Link to={`/addPracenje`} className="btn btn-outline-dark btn-lg btn-block">Dodaj novo praćenje</Link>
              <br />
              <br />
            </nav>
          </div>
          <div className="col-8">
            <Container>
              <Row>
                {pracenje.length > 0 ? (
                  pracenje.map(pracenje => (
                    <Col md={6} lg={4} sm={12} key={pracenje.id}>
                      <Card>
                        <Card.Body>
                          <Card.Text><b>Latitude:</b> {pracenje.Latitude}</Card.Text>
                          <Card.Text><b>Longitude:</b> {pracenje.Longitude}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="card-buttons">
                          <NavLink className="nav-link">
                            <Link to={`/editPracenje/${pracenje.id}`} className="btn btn-outline-dark btn-lg">Uredi praćenje</Link>
                          </NavLink>
                          <NavLink className="nav-link">
                            <Button variant="outline-dark" size="lg" onClick={() => handleShowModal(pracenje.id)}>Obriši praćenje</Button>
                          </NavLink>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>Nema unesenih praćenja!</p>
                )}
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši praćenje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jeste li sigurni da želite izbrisati praćenje?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Odustani
          </Button>
          <Button variant="danger" onClick={obrisiPracenje}>
            Da, izbriši
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowPracenje;
