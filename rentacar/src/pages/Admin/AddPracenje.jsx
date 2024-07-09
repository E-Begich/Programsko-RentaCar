import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useParams } from 'react-router';
import axios from "axios";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import HeaderAdmin from "../../components/HeaderAdmin";

const AddPracenje = () => {
  const { id } = useParams()

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [id_vozilo, setId_vozilo] = useState('');
  const [id_korisnik, setId_korisnik] = useState('');

  const [vozila, setVozila] = useState([]);
  const [korisnici, setKorisnici] = useState([]);

  useEffect(() => {
    const fetchVozila = async () => {
        try {
            const response = await axios.get('/api/aplikacija/getAllVozilo');
            setVozila(response.data);
        } catch (error) {
            console.error('Error fetching vozila:', error);
        }
    };

    fetchVozila();
  }, []);

  useEffect(() => {
    const fetchKorisnici = async () => {
        try {
            const response = await axios.get('/api/aplikacija/getAllKorisnik');
            setKorisnici(response.data);
        } catch (error) {
            console.error('Error fetching korisnici:', error);
        }
    };

    fetchKorisnici();
  }, []);

  const addPracenjeHandler = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude || !id_vozilo || !id_korisnik) {
      toast.error('Molimo popunite sva polja.');
      return;
    }

    const data = {
      Latitude: latitude,
      Longitude: longitude,
      Id_vozilo: id_vozilo,
      Id_korisnik: id_korisnik,
    };

    try {
      await axios.post('/api/aplikacija/addPracenje', data);
      toast.success('Praćenje je dodano!');
    } catch (error) {
      toast.error('Došlo je do greške prilikom dodavanja praćenja.');
      console.error(error);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <Container className='mt-5 p-2'>
        <h1>Dodaj praćenje</h1>
        <hr />

        <Form onSubmit={addPracenjeHandler}>
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

          {/* Dropdown za odabir vozila */}
          <Form.Group className="mb-3">
            <Form.Label>Vozilo</Form.Label>
            <Form.Select value={id_vozilo} onChange={(e) => setId_vozilo(e.target.value)}>
              <option>Odaberi vozilo...</option>
              {vozila.map((vozilo) => (
                <option key={vozilo.id} value={vozilo.id}>
                  {vozilo.Marka} - {vozilo.Model}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Dropdown za odabir korisnika */}
          <Form.Group className="mb-3">
            <Form.Label>Korisnik</Form.Label>
            <Form.Select value={id_korisnik} onChange={(e) => setId_korisnik(e.target.value)}>
              <option>Odaberi korisnika...</option>
              {korisnici.map((korisnik) => (
                <option key={korisnik.id} value={korisnik.id}>
                  {korisnik.Ime} {korisnik.Prezime}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-outline-dark ms-2">
              Spremi podatke
            </button>
            <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark ms-2">
              Vrati se na početnu
            </Link>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddPracenje;
