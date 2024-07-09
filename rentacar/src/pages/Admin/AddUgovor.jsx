import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import HeaderAdmin from "../../components/HeaderAdmin";

const AddUgovor = () => {
    const { id } = useParams();

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

    const addUgovorHandler = async (e) => {
        e.preventDefault();

        if (!datum_pocetka || !datum_zavrsetka || !status || !osiguranje || !id_vozilo || !id_korisnik || !id_zaposlenik) {
            toast.error('Molimo popunite sva polja.');
            return;
        }

        //ISO 8601 međunarodni standard za prikazivanje datuma i vremena - metoda objekta Date koja konvertira datum i vrijeme u ISO 8601 format kao string
        const data = {
            Datum_pocetka: new Date(datum_pocetka).toISOString(),
            Datum_zavrsetka: new Date(datum_zavrsetka).toISOString(),
            Status: status,
            Osiguranje: osiguranje,
            Napomena: napomena,
            Id_vozilo: id_vozilo,
            Id_korisnik: id_korisnik,
            Id_zaposlenik: id_zaposlenik,
        };

        try {
            await axios.post('/api/aplikacija/addUgovor', data);
            toast.success('Ugovor je dodan!');
        } catch (error) {
            toast.error('Došlo je do greške prilikom dodavanja ugovora.');
            console.error(error);
        }
    };

    return (
        <>
            <HeaderAdmin />
            <Container className='mt-5 p-2'>
                <h1>Dodaj ugovor</h1>
                <hr />

                <Form onSubmit={addUgovorHandler}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Datum početka</Form.Label>
                            <Form.Control
                                type="date"
                                value={datum_pocetka}
                                onChange={(e) => setDatum_pocetka(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Datum završetka</Form.Label>
                            <Form.Control
                                type="date"
                                value={datum_zavrsetka}
                                onChange={(e) => setDatum_zavrsetka(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
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

                    {/* Dropdown za odabir vozila */}
                    <Form.Group className="mb-3">
                        <Form.Label>Vozilo</Form.Label>
                        <Form.Select onChange={(e) => setId_vozilo(e.target.value)}>
                            <option>Odaberi vozilo...</option>
                            {vozila.map((vozilo) => (
                                <option key={vozilo.id} value={vozilo.id}>{vozilo.Marka} - {vozilo.Model}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Dropdown za odabir korisnika */}
                    <Form.Group className="mb-3">
                        <Form.Label>Korisnik</Form.Label>
                        <Form.Select onChange={(e) => setId_korisnik(e.target.value)}>
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

export default AddUgovor;
