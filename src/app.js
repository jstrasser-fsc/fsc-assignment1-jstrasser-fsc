const path = require('path');
const express = require('express');
const hbs = require('hbs');
var app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath))





app.get('', (req, res) => {
    res.render('makeReservation', {
        title: 'Reservation',
        name: 'James Strasser'
    })
})



app.post('/post',(req,res)=>{ 
    // console.log("I need to be here");    console.log(req)
    // console.log(req)
    // console.log(req.Name);
    // console.log(req)
    // console.log(req.body)
    const body = req.body;
    console.log(body.name)
    // if (!req.query.reservation) {
    //     return res.send({
    //         error: 'You must provide a reservation!'
    //     })
    // }
    // console.log(JSON.parse(req.query.reservation))

    // let reservation = JSON.parse(req.query.reservation);
    let reservation = {
        name: body.name,
        location: body.location,
        startDate: body.startDate,
        endDate: body.endDate
    }
    res.render('myReservations',
            {
                title: "My Reservations",
                name: "James Strasser",
                // reservationsJSON: reservationsJSON,
                // reservations: reservations,
                name: "Name: ".concat(body.name),
                location: "Location: ".concat(body.location),
                startDate: "Start Date: ".concat(body.startDate),
                endDate: "End Date: ".concat(body.endDate)
            }
        )
    console.log(reservation);
    let loadReservations =()=>
    {
        try{
            const dataBuffer = fs.readFileSync('reservations.json');
            const dataJSON = dataBuffer.toString();
            return JSON.parse(dataJSON);
            // return dataJSON;
        }
        catch (e)
        {
            return [];
        }
        
    };
    const currentReservations  = loadReservations();
    currentReservations.push(reservation)
    fs.writeFileSync('reservations.json',JSON.stringify(currentReservations));
    // fs.writeFileSync('reservations.json',JSON.stringify(reservation));

    // res.send(
    //     {
    //         name: reservation.name,
    //         location: reservation.location,
    //         startDate: reservation.startDate,
    //         endDate: reservation.endDate,
    //         status: 'Success'
    //     }
    // )
})

app.get('/myReservations',(req,res)=>{
    const reservationsJSON = fs.readFileSync('reservations.json');
    if(reservationsJSON)
    {
        const reservations = JSON.parse(reservationsJSON);
        const latestReservatioon = reservations[reservations.length-1];
        const name = latestReservatioon.name;
        const location = latestReservatioon.location;
        const startDate = latestReservatioon.startDate;
        const endDate = latestReservatioon.endDate;
        res.render('myReservations',
            {
                title: "My Reservations",
                name: "James Strasser",
                reservationsJSON: reservationsJSON,
                reservations: reservations,
                name: "Name: ".concat(name),
                location: "Location: ".concat(location),
                startDate: "Start Date: ".concat(startDate),
                endDate: "End Date: ".concat(endDate)
            }
        )
    }
    
})
app.get('/about', (req, res) => {
    // res.redirect()
    res.render('about', {
        title: 'About Me',
        name: 'James Strasser'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'James Strasser'
    })
})


app.get('/myReservations',(req,res)=>{
    res.render('myReservations',{
        title: "My Reservations",
        name: "James Strasser",
        reservation: allReservations   
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'James Strasser',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'James Strasser',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

