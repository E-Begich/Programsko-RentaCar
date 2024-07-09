import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router';
import { Container, Form } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderAdmin from "../../components/HeaderAdmin";

const EditUgovor = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [datum_pocetka, setDatum_pocetka] = useState('');
  const [datum_zavrsetka, setDatum_zavrsetka] = useState('');
  const [status, setStatus] = useState('');
  const [osiguranje, setOsiguranje] = useState('');
  const [napomena, setNapomena] = useState('');
  const [id_vozilo, setId_vozilo] = useState('');
  const [id_korisnik, setId_korisnik] = useState('');
  const [id_zaposlenik, setId_zaposlenik] = useState('');

  const [vozila, setVozila] = useState([]);
  const [korisnici, setKorisnici] = useState([]);

  useEffect(() => {
    const getOneUgovor = async () => {
      const { data } = await axios.get(`/api/aplikacija/getOneUgovor/${id}`);
      console.log(data);

      setDatum_pocetka(data.Datum_pocetka);
      setDatum_zavrsetka(data.Datum_zavrsetka);
      setStatus(data.Status);
      setOsiguranje(data.Osiguranje);
      setNapomena(data.Napomena);
      setId_vozilo(data.Id_vozilo);
      setId_korisnik(data.Id_korisnik);
      setId_zaposlenik(data.Id_zaposlenik);
    };

    getOneUgovor();
  }, [id]);

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

  const updateHandler = async (e) => {
    e.preventDefault();

    const data = {
      Datum_pocetka: datum_pocetka,
      Datum_zavrsetka: datum_zavrsetka,
      Status: status,
      Osiguranje: osiguranje,
      Napomena: napomena,
      Id_vozilo: id_vozilo,
      Id_korisnik: id_korisnik,
      Id_zaposlenik: id_zaposlenik,
    };

    await axios.put(`/api/aplikacija/updateUgovor/${id}`, data);

    toast.success('Ugovor je uspješno promijenjen!');
    navigate(`/adminPocetna/${id}`);
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Izmijeni ugovor</h1>
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
                <Link to={`/addPracenje/`} className="btn btn-outline-dark btn-lg">Praćenje automobila</Link>
              </NavLink>
              <br />
              <br />
            </nav>
          </div>
          <div className="col-8">
            <Container className='mt-2 p-3'>
              <Form>
                <Form.Group className="mb-3" controlId="datum_pocetka">
                  <Form.Label>Datum početka</Form.Label>
                  <Form.Control
                    type="date"
                    value={datum_pocetka}
                    onChange={(e) => setDatum_pocetka(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="datum_zavrsetka">
                  <Form.Label>Datum završetka</Form.Label>
                  <Form.Control
                    type="date"
                    value={datum_zavrsetka}
                    onChange={(e) => setDatum_zavrsetka(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="status">
                  <Form.Label>Status</Form.Label><br />
                  <Form.Check
                    inline
                    type="radio"
                    label="U tijeku"
                    name="status"
                    checked={status === 'U tijeku'}
                    onChange={() => setStatus('U tijeku')}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Završen"
                    name="status"
                    checked={status === 'Završen'}
                    onChange={() => setStatus('Završen')}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="osiguranje">
                  <Form.Label>Osiguranje</Form.Label>
                  <Form.Control
                    type="text"
                    value={osiguranje}
                    onChange={(e) => setOsiguranje(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="napomena">
                  <Form.Label>Napomena</Form.Label>
                  <Form.Control
                    type="text"
                    value={napomena}
                    onChange={(e) => setNapomena(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="id_vozilo">
                  <Form.Label>Vozilo</Form.Label>
                  <Form.Select
                    value={id_vozilo}
                    onChange={(e) => setId_vozilo(e.target.value)}
                  >
                    <option>Odaberi vozilo...</option>
                    {vozila.map((vozilo) => (
                      <option key={vozilo.id} value={vozilo.id}>
                        {vozilo.Marka} - {vozilo.Model}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="id_korisnik">
                  <Form.Label>Korisnik</Form.Label>
                  <Form.Select
                    value={id_korisnik}
                    onChange={(e) => setId_korisnik(e.target.value)}
                  >
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
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUgovor;
