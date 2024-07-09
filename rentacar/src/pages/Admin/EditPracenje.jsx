import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Button, Form } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderAdmin from "../../components/HeaderAdmin";

const EditPracenje = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [id_vozilo, setId_vozilo] = useState('');
  const [id_ugovor, setId_ugovor] = useState('');

  useEffect(() => {
    const getOnePracenje = async () => {
      try {
        const { data } = await axios.get(`/api/aplikacija/getOnePracenje/${id}`);
        setLatitude(data.Latitude);
        setLongitude(data.Longitude);
        setId_vozilo(data.Id_vozilo);
        setId_ugovor(data.Id_ugovor);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getOnePracenje();
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();
    const data = {
      Latitude: latitude,
      Longitude: longitude,
      Id_vozilo: id_vozilo,
      Id_ugovor: id_ugovor
    };

    try {
      await axios.put(`/api/aplikacija/updatePracenje/${id}`, data);
      toast.success('Pracenje je uspješno izmijenjeno!');
      navigate(`/adminPocetna/${id}`);
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Dogodila se greška pri izmjeni pracenja.');
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Izmijeni praćenje</h1>
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
            </nav>
          </div>
          <div className="col-8">
            <Container className='mt-2 p-3'>
              <Form onSubmit={updateHandler}>
                <Form.Group className="mb-3" controlId="latitude">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="longitude">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
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
}

export default EditPracenje;
