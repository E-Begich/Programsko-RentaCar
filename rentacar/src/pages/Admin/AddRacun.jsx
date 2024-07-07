import React, { useState } from "react";
import {  useParams } from 'react-router';
import { Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import HeaderAdmin from "../../components/HeaderAdmin";

const AddRacun = () => {
  const { id } = useParams()


  const [cijena, setCijena] = useState('');
  const [porez, setPorez] = useState('');
  const [ukupna_cijena, setUkupna_cijena] = useState('');
  const [id_ugovor, setId_ugovor] = useState('');

  const addRacunHandler = async () => {


    const data = {

      Cijena: cijena,
      Porez: porez,
      Ukupna_cijena: ukupna_cijena,
      Id_ugovor: id_ugovor,
    }

    await axios.post('/api/aplikacija/addRacun', data)
    toast.success('Račun je dodan!')

  }

  return (
    <>
      <HeaderAdmin />
      <Container className='mt-5 p-2'>
        <h1>Dodaj novi račun</h1>
        <hr />

        <Form>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Ugovor
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Ime i prezime</a></li>
              <li><a class="dropdown-item" href="#">Cijena</a></li>
            </ul>
          </div>


          <form className="container" onSubmit={addRacunHandler} />

          <Form.Group className="mb-3" controlId="cijena">
            <Form.Label>Cijena</Form.Label>
            <Form.Control
              value={cijena}
              onChange={(e) => setCijena(e.target.value)}
              type="number" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="porez">
            <Form.Label>Porez</Form.Label>
            <Form.Control
              value={porez}
              onChange={(e) => setPorez(e.target.value)}
              type="number" />
          </Form.Group>

          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-outline-dark ms-2" id="button-test">Spremi podatke</button>
            <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark ms-2">Vrati se na početnu</Link>

          </div>

        </Form>
      </Container>
    </>
  )
}


export default AddRacun