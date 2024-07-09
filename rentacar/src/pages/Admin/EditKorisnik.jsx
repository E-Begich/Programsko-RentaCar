import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import HeaderAdmin from "../../components/HeaderAdmin";

const EditKorisnik = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [adresa, setAdresa] = useState('');
  const [post_broj, setPost_broj] = useState('');
  const [mjesto, setMjesto] = useState('');
  const [OIB, setOib] = useState('');
  const [br_iskaznice, setBr_iskaznice] = useState('');
  const [mjesto_izdavanja, setMjesto_izdavanja] = useState('');
  const [kontakt, setKontakt] = useState('');
  const [email, setEmail] = useState('');
  const [scan_vozacke, setScan_vozacke] = useState('');
  const [scan_osobne, setScan_osobne] = useState('');

  useEffect(() => {
    const fetchKorisnik = async () => {
      try {
        const { data } = await axios.get(`/api/aplikacija/getOneKorisnik/${id}`);
        console.log(data);

        setIme(data.Ime);
        setPrezime(data.Prezime);
        setAdresa(data.Adresa);
        setPost_broj(data.Post_broj);
        setMjesto(data.Mjesto);
        setOib(data.OIB);
        setBr_iskaznice(data.Br_iskaznice);
        setMjesto_izdavanja(data.Mjesto_izdavanja);
        setKontakt(data.Kontakt);
        setEmail(data.Email);
        setScan_vozacke(data.Scan_vozacke);
        setScan_osobne(data.Scan_osobne);
      } catch (error) {
        console.error(`Error fetching korisnik with ID ${id}:`, error);
      }
    };

    fetchKorisnik();
  }, [id]);

  const updateKorisnikHandler = async (e) => {
    e.preventDefault();

    const data = {
      Ime: ime,
      Prezime: prezime,
      Adresa: adresa,
      Post_broj: post_broj,
      Mjesto: mjesto,
      OIB: OIB,
      Br_iskaznice: br_iskaznice,
      Mjesto_izdavanja: mjesto_izdavanja,
      Kontakt: kontakt,
      Email: email,
      Scan_vozacke: scan_vozacke,
      Scan_osobne: scan_osobne,
    };

    try {
      await axios.put(`/api/aplikacija/updateKorisnik/${id}`, data);
      toast.success('Podaci o korisniku su uspješno ažurirani!');
      navigate(`/showKorisnik/${id}`);
    } catch (error) {
      console.error(`Error updating korisnik with ID ${id}:`, error);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <Container className='mt-5 p-2'>
        <h1>Uredi korisnika</h1>
        <hr />

        <Form onSubmit={updateKorisnikHandler}>

          <Form.Group className="mb-3" controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control
              value={prezime}
              onChange={(e) => setPrezime(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="adresa">
            <Form.Label>Adresa</Form.Label>
            <Form.Control
              value={adresa}
              onChange={(e) => setAdresa(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="post_broj">
            <Form.Label>Poštanski broj</Form.Label>
            <Form.Control
              value={post_broj}
              onChange={(e) => setPost_broj(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mjesto">
            <Form.Label>Mjesto</Form.Label>
            <Form.Control
              value={mjesto}
              onChange={(e) => setMjesto(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="OIB">
            <Form.Label>OIB</Form.Label>
            <Form.Control
              value={OIB}
              onChange={(e) => setOib(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="br_iskaznice">
            <Form.Label>Broj iskaznice</Form.Label>
            <Form.Control
              value={br_iskaznice}
              onChange={(e) => setBr_iskaznice(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="mjesto_izdavanja">
            <Form.Label>Mjesto izdavanja</Form.Label>
            <Form.Control
              value={mjesto_izdavanja}
              onChange={(e) => setMjesto_izdavanja(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="kontakt">
            <Form.Label>Kontakt</Form.Label>
            <Form.Control
              value={kontakt}
              onChange={(e) => setKontakt(e.target.value)}
              type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="scan_vozacke">
            <Form.Label>Scan vozačke</Form.Label>
            <Form.Control
              value={scan_vozacke}
              onChange={(e) => setScan_vozacke(e.target.value)}
              type="file" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="scan_osobne">
            <Form.Label>Scan osobne</Form.Label>
            <Form.Control
              value={scan_osobne}
              onChange={(e) => setScan_osobne(e.target.value)}
              type="file" />
          </Form.Group>

          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-outline-dark ms-2">Spremi podatke</button>
            <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark ms-2">Vrati se na početnu</Link>
          </div>

        </Form>
      </Container>
    </>
  );
};

export default EditKorisnik;
