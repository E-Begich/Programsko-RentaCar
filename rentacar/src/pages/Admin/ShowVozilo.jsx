import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import HeaderAdmin from "../../components/HeaderAdmin";

const ShowVozilo = () => {
  const { id } = useParams();
  const [vozila, setVozila] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [voziloIdToDelete, setVoziloIdToDelete] = useState(null);

  useEffect(() => {
    const getAllVozilo = async () => {
      try {
        const response = await axios.get('/api/aplikacija/getAllVozilo');
        setVozila(response.data);
      } catch (error) {
        console.error('Error fetching vozila:', error);
      }
    };

    getAllVozilo();
  }, []);

  const handleEditVozilo = (id) => {
    // Navigacija na stranicu za uređivanje vozila s određenim ID-om
    // Primjer: `/editvozilo/${id}`
    // Zamijenite s vašim rutama za uređivanje vozila
  };

  const handleShowModal = (id) => {
    setVoziloIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVoziloIdToDelete(null);
  };

  const obrisiVozilo = async () => {
    if (!voziloIdToDelete) return;

    try {
      await axios.delete(`/api/aplikacija/deleteVozilo/${voziloIdToDelete}`);
      setVozila(prevVozila => prevVozila.filter(v => v.id !== voziloIdToDelete));
      console.log(`Vozilo sa ID ${voziloIdToDelete} uspješno obrisano.`);
    } catch (error) {
      console.error(`Error deleting vozilo with ID ${voziloIdToDelete}:`, error);
    }

    handleCloseModal();
  };

  return (
    <div>
      <HeaderAdmin />
      <Container className="text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col-3">
            <nav className="nav flex-column">
              <NavLink className="nav-link">
                <Link to={`/showZahtjevi/`} className="btn btn-outline-dark btn-lg btn-block mb-2">Pregled zahtjeva</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/showPracenje/`} className="btn btn-outline-dark btn-lg btn-block mb-2">Praćenje automobila</Link>
              </NavLink>
              <Link to={`/addVozilo`} className="btn btn-outline-dark btn-lg btn-block mb-2">Dodaj novo vozilo</Link>
              <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark btn-lg btn-block mb-2">Vrati se na početnu</Link>
            </nav>
          </div>
          <div className="col-9">
            <h1>Popis vozila</h1>
            <Container>
              <Row>
                {vozila.length > 0 ? (
                  vozila.map((Vozilo) => (
                    <Col key={Vozilo.id} className="mt-3">
                      <Card className="custom-card">
                        <Card.Body>
                          <Card.Text><b>Model:</b> {Vozilo.Model}</Card.Text>
                          <Card.Text><b>Marka:</b> {Vozilo.Marka}</Card.Text>
                          <Card.Text><b>Godina:</b> {Vozilo.Godina}</Card.Text>
                          <Card.Text><b>Radni_obujam:</b> {Vozilo.Radni_obujam}</Card.Text>
                          <Card.Text><b>Vrsta_motora:</b> {Vozilo.Vrsta_motora}</Card.Text>
                          <Card.Text><b>Kilometri:</b> {Vozilo.Kilometri}</Card.Text>
                          <Card.Text><b>Broj_sjedala:</b> {Vozilo.Broj_sjedala}</Card.Text>
                          <Card.Text><b>Cijena_dan:</b> {Vozilo.Cijena_dan}</Card.Text>
                          <Card.Text><b>Fotografija:</b> {Vozilo.Fotografija}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="card-buttons">
                          <NavLink className="nav-link">
                            <Link to={`/editvozilo/${Vozilo.id}`} className="btn btn-outline-dark btn-lg">Uredi vozilo</Link>
                          </NavLink>
                          <NavLink className="nav-link">
                            <Button variant="outline-dark" size="lg" onClick={() => handleShowModal(Vozilo.id)}>Obriši vozilo</Button>
                          </NavLink>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>Nema unesenih vozila!</p>
                )}
              </Row>
            </Container>
          </div>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši vozilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jeste li sigurni da želite izbrisati vozilo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Odustani
          </Button>
          <Button variant="danger" onClick={obrisiVozilo}>
            Da, izbriši
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowVozilo;
