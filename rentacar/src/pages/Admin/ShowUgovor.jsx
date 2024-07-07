import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import HeaderAdmin from "../../components/HeaderAdmin";

const ShowUgovor = () => {
  const { id } = useParams()

  const [ugovor, setUgovor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ugovorIdToDelete, setUgovorIdToDelete] = useState(null);

  useEffect(() => {
    const getAllUgovor = async () => {
      try {
        const { data } = await axios.get('/api/aplikacija/getAllUgovor')
        console.log(data)
        setUgovor(data)
      } catch (error) {
        console.error('Error fetching ugovor:', error);
      }
    }
    getAllUgovor();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('hr-HR', options);
  };

  const handleShowModal = (id) => {
    setUgovorIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUgovorIdToDelete(null);
  };

  const obrisiUgovor = async () => {
    if (!ugovorIdToDelete) return;

    try {
      await axios.delete(`/api/aplikacija/deleteUgovor/${ugovorIdToDelete}`);
      setUgovor(prevUgovor => prevUgovor.filter(u => u.id !== ugovorIdToDelete));
      console.log(`Ugovor sa ID ${ugovorIdToDelete} uspješno obrisan.`);
    } catch (error) {
      console.error(`Error deleting ugovor with ID ${ugovorIdToDelete}:`, error);
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
                <Link to={`/showVozilo/`} className="btn btn-outline-dark btn-lg btn-block mb-2">Pregled vozila</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/showZahtjevi/`} className="btn btn-outline-dark btn-lg btn-block mb-2">Pregled zahtjeva</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/showPracenje/`} className="btn btn-outline-dark btn-lg btn-block mb-2">Praćenje automobila</Link>
              </NavLink>
              <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark btn-lg btn-block mb-2">Vrati se na početnu</Link>
              <Link to={`/addUgovor`} className="btn btn-outline-dark btn-lg btn-block">Dodaj novi ugovor</Link>
            </nav>
          </div>
          <div className="col-9">
            <h1>Popis ugovora</h1>
            <Container>
              <Row>
                {ugovor.length > 0 ? (
                  ugovor.map((Ugovor) => (
                    <Col key={Ugovor.id} className="mt-3">
                      <Card className="custom-card">
                        <Card.Body>
                          <Card.Text><b>Datum početka:</b> {formatDate(Ugovor.Datum_pocetka)}</Card.Text>
                          <Card.Text><b>Datum završetka:</b> {formatDate(Ugovor.Datum_zavrsetka)}</Card.Text>
                          <Card.Text><b>Status:</b> {Ugovor.Status}</Card.Text>
                          <Card.Text><b>Osiguranje:</b> {Ugovor.Osiguranje}</Card.Text>
                          <Card.Text><b>Vozilo:</b> {Ugovor.Vozilo ? `${Ugovor.Vozilo.Marka} - ${Ugovor.Vozilo.Model}` : '-'}</Card.Text>
                          <Card.Text><b>Korisnik:</b> {Ugovor.Korisnik ? `${Ugovor.Korisnik.Ime} ${Ugovor.Korisnik.Prezime}` : '-'}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="card-buttons">
                          <NavLink className="nav-link">
                            <Link to={`/editugovor/${Ugovor.id}`} className="btn btn-outline-dark btn-lg">Uredi ugovor</Link>
                          </NavLink>
                          <NavLink className="nav-link">
                            <Button variant="outline-dark" size="lg" onClick={() => handleShowModal(Ugovor.id)}>Obriši ugovor</Button>
                          </NavLink>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>Nema unesenih ugovora!</p>
                )}
              </Row>
            </Container>
          </div>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši ugovor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jeste li sigurni da želite izbrisati ugovor?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Odustani
          </Button>
          <Button variant="danger" onClick={obrisiUgovor}>
            Da, izbriši
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowUgovor;
