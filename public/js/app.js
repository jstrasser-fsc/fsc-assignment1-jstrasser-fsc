
const weatherForm = document.querySelector('form');
const input = document.querySelectorAll('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageReservation = document.querySelector('#Reservation');
const messageName = document.querySelector('#Name');
const messageLocation = document.querySelector('#Location');
const messageStartDate = document.querySelector('#Start-Date');
const messageEndDate = document.querySelector('#End-Date');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const Name = input[0].value;
    const Location = input[1].value;
    const StartDate = input[2].value;
    const EndDate = input[3].value;
    const newRes = {
        name: Name,
        location: Location,
        startDate: StartDate,
        endDate: EndDate
    }
        
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/post?reservation=' + JSON.stringify(newRes)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                console.log(data.name);
                console.log(data.location);
                console.log(data.startDate);
                console.log(data.endDate);
                console.log(data.status);
                messageOne.textContent =  "New Reservation Completed"
                messageReservation.textContent = "--Reservation--";
                messageName.textContent = data.name;
                messageLocation.textContent = data.location;
                messageStartDate.textContent = data.startDate;
                messageEndDate.textContent = data.endDate;
            }
        })
    })

})