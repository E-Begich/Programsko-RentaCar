import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router';
import { Container, Row, Col, Card, CardText } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import HeaderAdmin from "../../components/HeaderAdmin";
import "./../../App.css";

const AdminPocetna = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        let userId = sessionStorage.getItem('userId');
        if (userId && userId !== '') {
            navigate(`/adminpocetna/${userId}`);
        }
    }, []);

    const [vozila, setVozila] = useState([])

    useEffect(() => {
        const getVoziloData = async () => {
            const { data } = await axios.get('/api/aplikacija/getAllVozilo')
            setVozila(data)
        }
        getVoziloData();
    }, []);

    return (
        <div>
            <HeaderAdmin />
            <div className="container text-center d-grid gap-2 col-8 mx-auto py-3 m-5">
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <h1>Popis automobila</h1>
                    </div>
                    <div className="col">
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <nav className="nav flex-column">
                            <NavLink className="nav-link">
                                <Link to={`/showzahtjeva`} className="btn btn-outline-dark btn-lg">Pregled zahtjeva</Link>
                            </NavLink>
                            <NavLink className="nav-link">
                            <Link to={`/addvozilo`} className="btn btn-outline-dark btn-lg">Dodaj novo vozilo</Link>
                        </NavLink>
                            <NavLink className="nav-link">
                                <Link to={`/showVozilo/`} className="btn btn-outline-dark btn-lg">Pregled vozila</Link>
                            </NavLink>
                            <NavLink className="nav-link">
                            <Link to={`/showkorisnik`} className="btn btn-outline-dark btn-lg">Pregled klijenta</Link>
                        </NavLink>
                            <NavLink className="nav-link">
                                <Link to={`/addkorisnik`} className="btn btn-outline-dark btn-lg">Dodaj novog klijenta</Link>
                            </NavLink>
                            <NavLink className="nav-link">
                                <Link to={`/addugovor`} className="btn btn-outline-dark btn-lg">Izradi novi ugovor</Link>
                            </NavLink>
                            <NavLink className="nav-link">
                                <Link to={`/showugovor`} className="btn btn-outline-dark btn-lg">Pregledaj sve ugovore</Link>
                            </NavLink>
                            <NavLink className="nav-link">
                                <Link to={`/addpracenje`} className="btn btn-outline-dark btn-lg">Dodaj praćenje automobila</Link>
                            </NavLink>
                            <NavLink className="nav-link">
                                <Link to={`/showpracenje`} className="btn btn-outline-dark btn-lg">Praćenje automobila</Link>
                            </NavLink>
                            <NavLink className="nav-link">
                                <Link to={`/addracun`} className="btn btn-outline-dark btn-lg">Izradi račun</Link>
                            </NavLink>
                            <NavLink className="nav-link">
                                <Link to={`/showracuni`} className="btn btn-outline-dark btn-lg">Pregled svih računa</Link>
                            </NavLink>
                        </nav>
                    </div>
                    <div className="col-8">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {vozila.length > 0 ? (
                                vozila.map(Vozilo => (
                                    <div className="col" key={Vozilo.id}>
                                        <div className="card h-100">
                                            <img src={Vozilo.Fotografija} className="card-img-top" alt={Vozilo.Marka} />
                                            <div className="card-body">
                                                <h5 className="card-title">{Vozilo.Marka}</h5>
                                                <p className="card-text">Model: {Vozilo.Model}</p>
                                                <NavLink className="nav-link">
                                                    <Link to={`/editvozilo/${Vozilo.id}`} className="btn btn-outline-dark btn-lg">Uredi vozilo</Link>
                                                </NavLink>
                                                <NavLink className="nav-link">
                                                    <Link to={`/deletevozilo/${Vozilo.id}`} className="btn btn-outline-dark btn-lg">Obriši vozilo</Link>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p> Nema unesenih vozila!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPocetna;
