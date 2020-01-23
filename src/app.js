const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');




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


app.get('/post',(req,res)=>{ 
    // console.log("I need to be here");
    
    if (!req.query.reservation) {
        return res.send({
            error: 'You must provide a reservation!'
        })
    }
    // console.log(JSON.parse(req.query.reservation))
    let reservation = JSON.parse(req.query.reservation);
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
    // console.log((loadReservations()));
    const currentReservations  = loadReservations();
    currentReservations.push(reservation)
    // console.log(currentReservations);
    // var allReservations = [loadReservations(),reservation];
    // console.log('all reservations',allReservations)
    
    // console.log('here2')
    // var newReservations = currentReservations.push(reservation);
    // console.log(currentReservations),
    // console.log(reservation);
    // console.log(typeof currentReservations);
    // console.log(typeof reservation);
    // console.log(currentReservations.push(reservation));
    // console.log(currentReservations);
    fs.writeFileSync('reservations.json',JSON.stringify(currentReservations));
    
    // fs.writeFileSync('reservations.json',JSON.stringify({
    //     name: 'James'
    // }));
    res.send(
        {
            name: reservation.name,
            location: reservation.location,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            status: 'Success'
        }
    )
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

