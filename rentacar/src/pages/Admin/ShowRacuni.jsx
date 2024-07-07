import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap"; // Added Modal and Button import
import { Link, NavLink } from 'react-router-dom';
import HeaderAdmin from "../../components/HeaderAdmin";

const ShowRacuni = () => {
  const { id } = useParams()

  const [racun, setRacun] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal

  useEffect(() => {

    const getAllRacun = async () => {
      const { data } = await axios.get('/api/aplikacija/getAllRacun')
      console.log(data)
      setRacun(data)
    }
    getAllRacun()

  }, []);

  const handleShowModal = (id) => {
    // Logic to handle modal display
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Logic to handle modal close
    setShowModal(false);
  };

  const obrisiRacun = async () => {
    // Logic to delete the racun
    try {
      await axios.delete(`/api/aplikacija/deleteRacun/${id}`);
      setShowModal(false); // Close the modal after deletion
      // You might want to update the racun state here or refresh the list
      // Example: setRacun(updatedRacuni);
    } catch (error) {
      console.error('Error deleting racun:', error);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Popis računa</h1>
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
                <Link to={`/showUgovor`} className="btn btn-outline-dark btn-lg">Pregled ugovora</Link>
              </NavLink>
              <Link to={`/addRacun`} className="btn btn-outline-dark btn-lg btn-block">Dodaj novi račun</Link>
              <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark btn-lg btn-block mb-2">Vrati se na početnu</Link>
              
             
            </nav>
          </div>
          <div className="col-8">
            <Container>
              <Row>
                {racun.length > 0 ? (
                  racun.map(Racun => (
                    <Col md={6} lg={4} sm={12} key={Racun.id}>
                      <Card>
                        <Card.Text><b>Cijena:</b> {Racun.Cijena}</Card.Text>
                        <Card.Text><b>Porez:</b> {Racun.Porez} </Card.Text>
                        <Card.Text><b>Ukupno:</b> {Racun.Ukupno} </Card.Text>
                        <Card.Footer className="card-buttons">
                          <NavLink className="nav-link">
                          <Link to={`/editRacun/${racun.id}`} className="btn btn-outline-dark btn-lg">Uredi račun</Link>
                          </NavLink>
                          <NavLink className="nav-link">
                            <Button variant="outline-dark" size="lg" onClick={() => handleShowModal(Racun.id)}>Obriši račun</Button>
                          </NavLink>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>Nema unesenih računa!</p>
                )}
              </Row>
            </Container>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši račun</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jeste li sigurni da želite izbrisati račun?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Odustani
          </Button>
          <Button variant="danger" onClick={obrisiRacun}>
            Da, izbriši
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowRacuni;
