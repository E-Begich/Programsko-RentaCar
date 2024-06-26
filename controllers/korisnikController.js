const db = require('../models')

//kreiranje glavnog modela
const Klijent_profil = db.Klijent_profil
const Korisnik = db.Korisnik
const Pracenje = db.Pracenje
const Racun = db.Racun
const Ugovor = db.Ugovor
const Vozilo = db.Vozilo
const Zahtjev = db.Zahtjev
const Zaposlenik = db.Zaposlenik

//1. kreiranje korisnika (ovo radi zaposlenik)
const addKorisnik = async (req, res) => {
    let info = {
        ID_korisnika: req.body.ID_korisnika,
        Ime: req.body.Ime,
        Prezime: req.body.Prezime,
        Adresa: req.body.Adresa,
        Post_broj: req.body.Post_broj,
        Mjesto: req.body.Mjesto,
        OIB: req.body.OIB,
        Br_iskaznice: req.body.Br_iskaznice,
        Mjesto_izdavanja: req.body.Mjesto_izdavanja,
        Kontakt: req.body.Kontakt,
        Email: req.body.Email,
        Scan_vozacke: req.body.Scan_vozacke,
        Scan_osobne: req.body.Scan_osobne
}
//unutar ove naredbe kreiramo korisnik te ubacujemo u tablicu Korisnkk podatke opisane u info
const korisnik = await Korisnik.create(info)
res.status(200).send(korisnik)

}

//2. preuzimanje svih profila klijenata 
const getAllKorisnik = async (req, res) => {
    let korisnik = await Korisnik.findAll({})
    res.send(korisnik)
}

//3. preuzmi jednog korisnika 
const getOneKorisnik = async (req, res) => {

    let ID_korisnika = req.params.ID_korisnika
    let korisnik = await Korisnik.findOne({ where: { ID_korisnika: ID_korisnika}})
    res.status(200).send(korisnik)
}

//4. ažuriraj profil klijenta (također ne treba ali da imamo u slučaju ažuriranja)
const updateKorisnik = async (req, res) => {
    let ID_korisnika = req.params.ID_korisnika
    const korisnik = await Korisnik.update(req.body, {where: { ID_korisnika: ID_korisnika }})
    res.status(200).send(korisnik)
}

//5. brisanje klijenta profila po id 
const deleteKorisnik = async (req, res) => {

    let ID_korisnika = req.params.ID_korisnika
    await Klijent.destroy({where: { ID_korisnika: ID_korisnika }})
    res.send('Profil korisnika je obrisan!')
}
//veza ugovor-korisnik
const getUgovorKorisnik = async (req, res) => {
    const data = await Korisnik.findAll({
        include: [{
            model: Ugovor,
            as: 'Ugovor'
        }],
        where: { ID_korisnika: 1}
    })
    res.status(200).send(data);
}

module.exports = {
    addKorisnik,
    getAllKorisnik,
    getOneKorisnik,
    updateKorisnik,
    deleteKorisnik,
    getUgovorKorisnik
}