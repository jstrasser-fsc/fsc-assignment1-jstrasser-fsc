
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
                if(data.name != ""&& data.location !=""&& data.startDate != "" && data.endDate !="")
                {
                    messageOne.textContent =  "New Reservation Completed"
                    messageReservation.textContent = "--Reservation--";
                    messageName.textContent = "Name: ".concat(data.name);
                    messageLocation.textContent = "Location: ".concat(data.location);
                    messageStartDate.textContent = "Start Date: ".concat(data.startDate);
                    messageEndDate.textContent = "End Date: ".concat(data.endDate);
                }
                else{
                    messageOne.textContent =  "Need complete information... there are 4 fields!!!"

                }
                
            }
        })
    })

})