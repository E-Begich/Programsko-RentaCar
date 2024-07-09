import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { Container, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import HeaderAdmin from "../../components/HeaderAdmin";

const AddRacun = () => {
  const { id } = useParams();

  const [cijena, setCijena] = useState('');
  const [porez, setPorez] = useState('');
  const [ukupna_cijena, setUkupna_cijena] = useState('');
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

//racunanje ukupne cijene
  useEffect(() => {
    const calculateUkupnaCijena = () => {
      const cijenaNum = parseFloat(cijena) || 0;
      const porezNum = parseFloat(porez) || 0;
      setUkupna_cijena((cijenaNum + (cijenaNum * porezNum / 100)).toFixed(2));
    };

    calculateUkupnaCijena();
  }, [cijena, porez]);

  const addRacunHandler = async (e) => {
    e.preventDefault();

    if (!cijena || !porez || !ukupna_cijena || !id_vozilo || !id_korisnik) {
      toast.error('Molimo popunite sva polja.');
      return;
    }

    const data = {
      Cijena: cijena,
      Porez: porez,
      Ukupna_cijena: ukupna_cijena,
      Id_vozilo: id_vozilo,
      Id_korisnik: id_korisnik,
    };

    try {
      await axios.post('/api/aplikacija/addRacun', data);
      toast.success('Račun je dodan!');
    } catch (error) {
      toast.error('Došlo je do greške prilikom dodavanja računa.');
      console.error(error);
    }
  };

  return (
    <>
      <HeaderAdmin />
      <Container className='mt-5 p-2'>
        <h1>Dodaj novi račun</h1>
        <hr />

        <Form onSubmit={addRacunHandler}>
          <Form.Group className="mb-3" controlId="cijena">
            <Form.Label>Cijena</Form.Label>
            <Form.Control
              value={cijena}
              onChange={(e) => setCijena(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="porez">
            <Form.Label>Porez</Form.Label>
            <Form.Control
              value={porez}
              onChange={(e) => setPorez(e.target.value)}
              type="text"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ukupna_cijena">
            <Form.Label>Ukupna cijena</Form.Label>
            <Form.Control
              value={ukupna_cijena}
              readOnly
              type="text"
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
            <button type="submit" className="btn btn-outline-dark ms-2">Spremi podatke</button>
            <Link to={`/adminpocetna/${id}`} className="btn btn-outline-dark ms-2">Vrati se na početnu</Link>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default AddRacun;
