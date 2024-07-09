import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import HeaderAdmin from "../../components/HeaderAdmin";

const ShowKorisnik = () => {
  const { id } = useParams()

  const [korisnici, setKorisnici] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [korisnikIdToDelete, setKorisnikIdToDelete] = useState(null);

  useEffect(() => {
    const getAllKorisnici = async () => {
      try {
        const { data } = await axios.get('/api/aplikacija/getAllKorisnik')
        console.log(data)
        setKorisnici(data)
      } catch (error) {
        console.error('Error fetching korisnici:', error);
      }
    }
    getAllKorisnici();
  }, []);

  const handleShowModal = (id) => {
    setKorisnikIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setKorisnikIdToDelete(null);
  };

  const obrisiKorisnika = async () => {
    if (!korisnikIdToDelete) return;

    try {
      await axios.delete(`/api/aplikacija/deleteKorisnik/${korisnikIdToDelete}`);
      setKorisnici(prevKorisnici => prevKorisnici.filter(k => k.id !== korisnikIdToDelete));
      console.log(`Korisnik sa ID ${korisnikIdToDelete} uspješno obrisan.`);
    } catch (error) {
      console.error(`Error deleting korisnik with ID ${korisnikIdToDelete}:`, error);
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
              <Link to={`/addKorisnik`} className="btn btn-outline-dark btn-lg btn-block">Dodaj novog korisnika</Link>
            </nav>
          </div>
          <div className="col-9">
            <h1>Popis korisnika</h1>
            <Container>
              <Row>
                {korisnici.length > 0 ? (
                  korisnici.map((korisnik) => (
                    <Col key={korisnik.id} className="mt-3">
                      <Card className="custom-card">
                        <Card.Body>
                          <Card.Text><b>Ime:</b> {korisnik.Ime}</Card.Text>
                          <Card.Text><b>Prezime:</b> {korisnik.Prezime}</Card.Text>
                          <Card.Text><b>Adresa:</b> {korisnik.Adresa}</Card.Text>
                          <Card.Text><b>Poštanski broj:</b> {korisnik.Post_broj}</Card.Text>
                          <Card.Text><b>Mjesto:</b> {korisnik.Mjesto}</Card.Text>
                          <Card.Text><b>OIB:</b> {korisnik.OIB}</Card.Text>
                          <Card.Text><b>Broj iskaznice:</b> {korisnik.Br_iskaznice}</Card.Text>
                          <Card.Text><b>Mjesto izdavanja:</b> {korisnik.Mjesto_izdavanja}</Card.Text>
                          <Card.Text><b>Kontakt:</b> {korisnik.Kontakt}</Card.Text>
                          <Card.Text><b>Email:</b> {korisnik.Email}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="card-buttons">
                          <NavLink className="nav-link">
                            <Link to={`/editkorisnik/${korisnik.id}`} className="btn btn-outline-dark btn-lg">Uredi korisnika</Link>
                          </NavLink>
                          <NavLink className="nav-link">
                            <Button variant="outline-dark" size="lg" onClick={() => handleShowModal(korisnik.id)}>Obriši korisnika</Button>
                          </NavLink>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <p>Nema unesenih korisnika!</p>
                )}
              </Row>
            </Container>
          </div>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Obriši korisnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jeste li sigurni da želite izbrisati korisnika?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Odustani
          </Button>
          <Button variant="danger" onClick={obrisiKorisnika}>
            Da, izbriši
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowKorisnik;
