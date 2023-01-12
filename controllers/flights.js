import { Flight } from "../models/flights.js";

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights,
      title: 'All Flights'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight',
  })
}

function create(req, res) {
  // console.log(req.body)
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight Details',
      flight
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function edit(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight'
    })
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/edit')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteTicket(req, res) {
  console.log(req.params)
  const currentFlight = Flight.findById(req.params.id)
  // const currentTicket = Ticket.findById(req.params.ticketId)
  const ticketDoc = currentFlight.tickets.id(req.params.ticketId)
  console.log(ticketDoc)
  // console.log(currentTicket)
  // let currentFlight = Flight.findById(req.params.id)
  // console.log(Flight.tickets.id('63be0109f2fcc3fba13c5fca'))
  // console.log(req)
  // let id = req.params.id
  // console.log(id.parent())
  // let ticket = Flight.tickets
  // ticket.findByIdAndDelete(req.params.id)
  // const ticketDoc = Flight.tickets.id(req.params.id)
  // Flight.tickets.remove(req.params.id)
  // console.log(ticketDoc)
  // .then(ticket => {
  //   res.redirect('/flights/show')
  // })
  // Flight.findById(req.params.id)
  // .then(flight => {
  //   flight.tickets.id(`${ticket._id}`).remove()
  //   flight.save()
  //   .then(() => {
  //     res.redirect(`/flights/${flight._id}`)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.redirect(`/flights/${flight._id}`)
  //   })
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect('/')
  // })
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  deleteTicket
}