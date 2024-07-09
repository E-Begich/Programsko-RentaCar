import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import HeaderAdmin from "../../components/HeaderAdmin";

const ShowZahtjeva = () => {
  const { id } = useParams();

  const [zahtjev, setZahtjev] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [zahtjevIdToDelete, setZahtjevIdToDelete] = useState(null);

  useEffect(() => {
    const getAllZahtjev = async () => {
      try {
        const { data } = await axios.get('/api/aplikacija/getAllZahtjev');
        setZahtjev(data);
      } catch (error) {
        console.error("Error fetching zahtjev:", error);
      }
    };
    getAllZahtjev();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setZahtjevIdToDelete(null);
  };

  const handleShowModal = (id) => {
    setShowModal(true);
    setZahtjevIdToDelete(id);
  };

  const obrisiZahtjev = async () => {
    try {
      await axios.delete(`/api/aplikacija/deleteZahtjev/${zahtjevIdToDelete}`);
      const { data } = await axios.get("/api/aplikacija/getAllZahtjev");
      setZahtjev(data);
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting zahtjev:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("hr-HR", options);
  };

  return (
    <div>
      <HeaderAdmin/>
      <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Popis zahtjeva</h1>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col-4">
            <nav className="nav flex-column">
              <NavLink className="nav-link">
                <Link to={`/showVozilo/`} className="btn btn-outline-dark btn-lg">Pregled vozila</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/addUgovor/`} className="btn btn-outline-dark btn-lg">Kreiraj ugovor</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/addPracenje/`} className="btn btn-outline-dark btn-lg">Praćenje automobila</Link>
              </NavLink>
              <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark btn-lg btn-block mb-2">Vrati se na početnu</Link>
            </nav>
            <br />
            <br />
          </div>
          <div className="col-8">
            <Container>
              <Row>
                {zahtjev.length > 0 ? (
                  zahtjev.map(Zahtjev => (
                    <Col md={6} lg={4} sm={12} key={Zahtjev.id}>
                      <Card>
                        <Card.Body>
                          <Card.Text><b>Datum_pocetka:</b> {formatDate(Zahtjev.Datum_pocetka)}</Card.Text>
                          <Card.Text><b>Datum_zavrsetka:</b> {formatDate(Zahtjev.Datum_zavrsetka)}</Card.Text>
                          <Card.Text><b>Napomena:</b> {Zahtjev.Napomena}</Card.Text>
                        
                        </Card.Body>
                        <Card.Footer className="card-buttons">
                          <NavLink className="nav-link">
                            <Link to={`/editzahtjev/${Zahtjev.id}`} className="btn btn-outline-dark btn-lg">Uredi zahtjev</Link>
                          </NavLink>
                          <NavLink className="nav-link">
                            <Button variant="outline-dark" size="lg" onClick={() => handleShowModal(Zahtjev.id)}>Obriši zahtjev</Button>
                          </NavLink>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>Nema unesenih zahtjeva!</p>
                )}
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši zahtjev</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jeste li sigurni da želite izbrisati zahtjev?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Odustani
          </Button>
          <Button variant="danger" onClick={obrisiZahtjev}>
            Da, izbriši
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowZahtjeva;
