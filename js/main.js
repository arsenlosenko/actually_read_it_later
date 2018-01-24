
function testTask(){
    console.log('test task')
}


function clickHandler(e) {
  setTimeout(testTask, 1000);
}

function main() {
    console.log('task started')
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
  main();
});