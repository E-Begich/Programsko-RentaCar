import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Form } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderAdmin from "../../components/HeaderAdmin";

const EditRacun = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cijena, setCijena] = useState('');
  const [porez, setPorez] = useState('');
  const [ukupnaCijena, setUkupnaCijena] = useState('');
  const [idUgovor, setIdUgovor] = useState('');

  useEffect(() => {
    const getOneRacun = async () => {
      try {
        const { data } = await axios.get(`/api/aplikacija/getOneRacun/${id}`);
        setCijena(data.Cijena);
        setPorez(data.Porez);
        setUkupnaCijena(data.Ukupna_cijena);
        setIdUgovor(data.Id_ugovor);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getOneRacun();
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();
    const data = {
      Cijena: cijena,
      Porez: porez,
      Ukupna_cijena: ukupnaCijena,
      Id_ugovor: idUgovor
    };

    try {
      await axios.put(`/api/aplikacija/updateRacun/${id}`, data);
      toast.success('Račun je uspješno izmijenjen!');
      navigate(`/adminPocetna/${id}`);
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Dogodila se greška pri izmjeni računa.');
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Izmijeni račun</h1>
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
                <Link to={`/showZahtjevi/`} className="btn btn-outline-dark btn-lg">Pregled zahtjeva</Link>
              </NavLink>
              <NavLink className="nav-link">
                <Link to={`/addUgovor/`} className="btn btn-outline-dark btn-lg">Kreiraj ugovor</Link>
              </NavLink>
              <Link to={`/addRacun`} className="btn btn-outline-dark btn-lg btn-block">Dodaj novi račun</Link>
            </nav>
          </div>
          <div className="col-8">
            <Container className='mt-2 p-3'>
              <Form onSubmit={updateHandler}>
                <Form.Group className="mb-3" controlId="cijena">
                  <Form.Label>Cijena</Form.Label>
                  <Form.Control
                    value={cijena}
                    onChange={(e) => setCijena(e.target.value)}
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="porez">
                  <Form.Label>Porez</Form.Label>
                  <Form.Control
                    value={porez}
                    onChange={(e) => setPorez(e.target.value)}
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ukupnaCijena">
                  <Form.Label>Ukupna cijena</Form.Label>
                  <Form.Control
                    value={ukupnaCijena}
                    onChange={(e) => setUkupnaCijena(e.target.value)}
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="idUgovor">
                  <Form.Label>ID Ugovor</Form.Label>
                  <Form.Control
                    value={idUgovor}
                    onChange={(e) => setIdUgovor(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Button variant="outline-dark" type="submit">
                  Spremi podatke
                </Button>
                
                <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark ms-2">Vrati se na početnu</Link>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRacun;
