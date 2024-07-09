import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import HeaderAdmin from "../../components/HeaderAdmin";

const AddVozilo = () => {
    const { id } = useParams()

    const [marka, setMarka] = useState('');
    const [model, setModel] = useState('');
    const [godina, setGodina] = useState('');
    const [radni_obujam, setRadni_obujam] = useState('');
    const [vrsta_motora, setVrsta_motora] = useState('');
    const [kilometri, setKilometri] = useState('');
    const [broj_sjedala, setBroj_sjedala] = useState('');
    const [cijena_dan, setCijena_dan] = useState('');
    const [fotografija, setFotografija] = useState('');

    const addVoziloHandler = async () => {


        const data = {

            Marka: marka,
            Model: model,
            Godina: godina,
            Radni_obujam: radni_obujam,
            Vrsta_motora: vrsta_motora,
            Kilometri: kilometri,
            Broj_sjedala: broj_sjedala,
            Cijena_dan: cijena_dan,
            Fotografija: fotografija,
            published: true
        }

        await axios.post('/api/aplikacija/addVozilo', data)
        toast.success('Vozilo je uspješno dodano u bazu!')

    }

    return (
        <>
            <HeaderAdmin />
            <Container className='mt-5 p-2'>
                <h1>Dodaj vozilo</h1>
                <hr />

                <Form>

                    <form className="container" onSubmit={addVoziloHandler} />

                    <Form.Group className="mb-3" controlId="marka">
                        <Form.Label>Marka</Form.Label>
                        <Form.Control
                            value={marka}
                            onChange={(e) => setMarka(e.target.value)}
                            type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="godina">
                        <Form.Label>Godina</Form.Label>
                        <Form.Control
                            value={godina}
                            onChange={(e) => setGodina(e.target.value)}
                            type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="radni obujam">
                        <Form.Label>Radni obujam</Form.Label>
                        <Form.Control
                            value={radni_obujam}
                            onChange={(e) => setRadni_obujam(e.target.value)}
                            type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="vrsta motora">
                        <Form.Label>Vrsta motora</Form.Label>
                        <Form.Control
                            value={vrsta_motora}
                            onChange={(e) => setVrsta_motora(e.target.value)}
                            type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="kilometri">
                        <Form.Label>Kilometri</Form.Label>
                        <Form.Control
                            value={kilometri}
                            onChange={(e) => setKilometri(e.target.value)}
                            type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="broj sjedala">
                        <Form.Label>Broj sjedala</Form.Label>
                        <Form.Control
                            value={broj_sjedala}
                            onChange={(e) => setBroj_sjedala(e.target.value)}
                            type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="cijena dan">
                        <Form.Label>Cijena dan</Form.Label>
                        <Form.Control
                            value={cijena_dan}
                            onChange={(e) => setCijena_dan(e.target.value)}
                            type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fotografija">
                        <Form.Label>Fotografija</Form.Label>
                        <Form.Control
                            value={fotografija}
                            onChange={(e) => setFotografija(e.target.value)}
                            type="file" />
                    </Form.Group>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" className="btn btn-outline-dark ms-2" id="button-test">Dodaj vozilo</button>
                        <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark ms-2">Vrati se na početnu</Link>

                    </div>

                </Form>
            </Container>
        </>
    )
}
export default AddVozilo