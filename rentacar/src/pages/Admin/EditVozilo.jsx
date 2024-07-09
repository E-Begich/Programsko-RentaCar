import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router';
import { Container, Button, Form } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderAdmin from "../../components/HeaderAdmin";

const EditVozilo = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [marka, setMarka] = useState('');
  const [model, setModel] = useState('');
  const [godina, setGodina] = useState('');
  const [radni_obujam, setRadni_obujam] = useState('');
  const [vrsta_motora, setVrsta_motora] = useState('');
  const [kilometri, setKilometri] = useState('');
  const [broj_sjedala, setBroj_sjedala] = useState('');
  const [cijena_dan, setCijena_dan] = useState('');
  const [fotografija, setFotografija] = useState('');


  useEffect(() => {
    const getOneVozilo = async () => {
      const { data } = await axios.get(`/api/aplikacija/getOneVozilo/${id}`)
      console.log(data)

      setMarka(data.Marka)
      setModel(data.Model)
      setGodina(data.Godina)
      setRadni_obujam(data.Radni_obujam)
      setVrsta_motora(data.Vrsta_motora)
      setKilometri(data.Kilometri)
      setBroj_sjedala(data.Broj_sjedala)
      setCijena_dan(data.Cijena_dan)
      setFotografija(data.Fotografija)

    }
    getOneVozilo()

  }, [id])

  const updateHandler = async (e) => {

    e.preventDefault()


    const data = {
      
      Marka: marka,
      Model: model,
      Godina: godina,
      Radni_obujam: radni_obujam,
      Vrsta_motora: vrsta_motora,
      Kilometri: kilometri,
      Broj_sjedala: broj_sjedala,
      Cijena_dan: cijena_dan,
      Fotografija: fotografija
    }

    await axios.put(`/api/aplikacija/updateVozilo/${id}`, data)

    toast.success('Vozilo je uspjesno promijenjeno!')
    navigate(`/adminPocetna/${id}`)

  }
  return (
    <>
    <HeaderAdmin/>
      <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1>Izmijeni vozilo</h1>
          </div>
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <nav className="nav flex-column">
            <NavLink className="nav-link">
              <Link to={`AddZahtjeva/`} className="btn btn-outline-dark btn-lg">Pregled zahtjeva</Link>
              </NavLink>
              <NavLink className="nav-link">
              <Link to={`/AddUgovor/`} className="btn btn-outline-dark btn-lg">Pregled ugovora</Link>
              </NavLink>
              <NavLink className="nav-link">
              <Link to={`/AddPracenje/`} className="btn btn-outline-dark btn-lg">Pregled praćenja automobila</Link>
              </NavLink>
              <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark btn-lg ms-2">Vrati se na početnu</Link>
              <br />
              <br />
        


            </nav>
          </div>
          <div className="col-8">
            <Container className='mt-2 p-3'>
            <Form>Marka</Form>
              <Form onSubmit={updateHandler}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    value={marka}
                    onChange={(e) => setMarka(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Form>Model</Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Form>Godina</Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    value={godina}
                    onChange={(e) => setGodina(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Form>Radni obujam</Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    value={radni_obujam}
                    onChange={(e) => setRadni_obujam(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Form>Vrsta motora</Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    value={vrsta_motora}
                    onChange={(e) => setVrsta_motora(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Form>KIlometri</Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    value={kilometri}
                    onChange={(e) => setKilometri(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Form>Broj sjedala</Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    value={broj_sjedala}
                    onChange={(e) => setBroj_sjedala(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Form>Cijena dan</Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    value={cijena_dan}
                    onChange={(e) => setCijena_dan(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Form>Fotografija</Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Control
                    value={fotografija}
                    onChange={(e) => setFotografija(e.target.value)}
                    type="text"
                  />
                </Form.Group>

                <Button variant="btn btn-outline-dark btn-lg" type="submit">
                  Spremi podatke
                  
                </Button>
                

              </Form>
            </Container>
          </div>
        </div>
        <div />
      </div>
    </>
  )
}

export default EditVozilo