import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import HeaderAdmin from "../../components/HeaderAdmin";

const ShowVozilo = () => {
  const { id } = useParams();
  const [vozila, setVozila] = useState([]);

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

  return (
    <div>
      <HeaderAdmin />
      <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Popis vozila</h1>
          </div>
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col-4">
            <nav className="nav flex-column">
              <NavLink className="nav-link">
                <Link to={`/showzahtjeva`} className="btn btn-outline-dark btn-lg">Pregled zahtjeva</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/getAllUgovor/`} className="btn btn-outline-dark btn-lg">Popis ugovora</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/getAllPracenje/`} className="btn btn-outline-dark btn-lg">Popis praćenja automobila</Link>
              </NavLink>
              
              <Link to={`/addVozilo`} className="btn btn-outline-dark btn-lg btn-block mb-2">Dodaj novo vozilo</Link>
              <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark btn-lg btn-block mb-2">Vrati se na početnu</Link>
              <br />
              <br />
            </nav>
          </div>
          <div className="col-8">
            <Container>
              <Row>
                {vozila.length > 0 ? (
                  vozila.map(Vozilo => (
                    <Col md={6} lg={4} sm={12} key={Vozilo.id}>
                      <Card>
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
                      </Card>
                      <br />
                    </Col>
                  ))
                ) : (
                  <p>Nema unesenih vozila!</p>
                )}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowVozilo;
