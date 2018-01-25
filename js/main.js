
function dateChange(e) {
    let checkedDate = e.target.value;
    let parsedDate = new Date(checkedDate);
    console.log(parsedDate);
}


function main() {
    console.log('task started')
}

document.addEventListener('DOMContentLoaded', function () {

  document.querySelector('.dateInput').onchange = dateChange;
  main();
});