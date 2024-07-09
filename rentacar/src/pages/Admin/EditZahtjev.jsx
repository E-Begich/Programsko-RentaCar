import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router';
import { Container, Button, Form } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderAdmin from "../../components/HeaderAdmin";

const EditZahtjev = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [datum_pocetka, setDatum_pocetka] = useState('');
  const [datum_zavrsetka, setDatum_zavrsetka] = useState('');
  const [napomena, setNapomena] = useState('');
  const [id_klijenta, setId_klijenta] = useState('');
  const [id_vozilo, setId_vozilo] = useState('');

  useEffect(() => {
    const getOneZahtjev = async () => {
      try {
        const { data } = await axios.get(`/api/aplikacija/getOneZahtjev/${id}`);
        console.log(data);

        setDatum_pocetka(data.Datum_pocetka);
        setDatum_zavrsetka(data.Datum_zavrsetka);
        setNapomena(data.Napomena);
        setId_klijenta(data.Id_klijenta);
        setId_vozilo(data.Id_vozilo);
      } catch (error) {
        console.error("Error fetching zahtjev:", error);
      }
    };
    getOneZahtjev();
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();

    const data = {
      Datum_pocetka: datum_pocetka,
      Datum_zavrsetka: datum_zavrsetka,
      Napomena: napomena,
      Id_klijenta: id_klijenta,
      Id_vozilo: id_vozilo,
    };

    try {
      await axios.put(`/api/aplikacija/updateZahtjev/${id}`, data);
      toast.success('Zahtjev je uspješno promijenjen!');
      navigate(`/adminPocetna/${id}`);
    } catch (error) {
      console.error("Error updating zahtjev:", error);
      toast.error('Došlo je do greške prilikom ažuriranja zahtjeva.');
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("hr-HR", options);
  };

  return (
    <>
      <HeaderAdmin />
      <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Izmijeni zahtjev</h1>
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
                <Link to={`/showZahtjevi/`} className="btn btn-outline-dark btn-lg">Pregled ugovora</Link>
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
              <Form onSubmit={updateHandler}>
                <Form.Group className="mb-3" controlId="datum_pocetka">
                  <Form.Label>Datum početka</Form.Label>
                  <Form.Control
                    value={datum_pocetka}
                    onChange={(e) => setDatum_pocetka(e.target.value)}
                    type="date"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="datum_zavrsetka">
                  <Form.Label>Datum završetka</Form.Label>
                  <Form.Control
                    value={datum_zavrsetka}
                    onChange={(e) => setDatum_zavrsetka(e.target.value)}
                    type="date"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="napomena">
                  <Form.Label>Napomena</Form.Label>
                  <Form.Control
                    value={napomena}
                    onChange={(e) => setNapomena(e.target.value)}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>

             

                <div className="d-grid gap-2 col-6 mx-auto">
                  <Button type="submit" variant="outline-dark">Spremi podatke</Button>
                  <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark ms-2">Vrati se na početnu</Link>
                </div>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditZahtjev;
