import { Routes, Route } from 'react-router-dom';
import {useState} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vozila from './pages/Vozila';
import Onama from './pages/Onama';
import Prijava from './pages/Prijava';
import Odjava from './pages/Odjava';
import Registracija from './pages/Registracija';
import AdminPocetna from './pages/Admin/AdminPocetna';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPracenje from './pages/Admin/AddPracenje';
import AddRacun from './pages/Admin/AddRacun';
import AddUgovor from './pages/Admin/AddUgovor';
import AddVozilo from './pages/Admin/AddVozilo';
import AddZahtjev from './pages/Admin/AddZahtjev';
import DeleteUgovor from './pages/Admin/DeleteUgovor';
import DeleteVozilo from './pages/Admin/DeleteVozilo';
import EditPracenje from './pages/Admin/EditPracenje';
import EditUgovor from './pages/Admin/EditUgovor';
import EditVozilo from './pages/Admin/EditVozilo';
import ShowUgovor from './pages/Admin/ShowUgovor';
import ShowVozilo from './pages/Admin/ShowVozilo';
import ShowZahtjeva from './pages/Admin/ShowZahtjeva';


function App() {
  return (
    <>
    <ToastContainer></ToastContainer>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vozila' element={<Vozila />} />
        <Route path='/onama' element={<Onama />} />
        <Route path='/prijava' element={<Prijava />} />
        <Route path='/odjava' element={<Odjava />} />
        <Route path='/registracija' element={<Registracija />} />
        <Route path='/addpracenje' element={<AddPracenje />} />
        <Route path='/addracun' element={<AddRacun />} />
        <Route path='/addugovor' element={<AddUgovor />} />
        <Route path='/addvozilo' element={<AddVozilo />} />
        <Route path='/addzahtjev' element={<AddZahtjev />} />
        <Route path='/adminpocetna' element={<AdminPocetna />} />
        <Route path='/deleteugovor' element={<DeleteUgovor />} />
        <Route path='/deletevozilo' element={<DeleteVozilo />} />
        <Route path='/editpracenje' element={<EditPracenje />} />
        <Route path='/editugovor' element={<EditUgovor />} />
        <Route path='/editvozilo' element={<EditVozilo />} />
        <Route path='/showugovor' element={<ShowUgovor />} />
        <Route path='/showvozilo' element={<ShowVozilo />} />
        <Route path='/showzahtjeva' element={<ShowZahtjeva />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;