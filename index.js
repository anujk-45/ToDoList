// index.js

function getAndUpdate(){
  console.log("Updating List...");
  tit = document.getElementById('title').value;
  desc = document.getElementById('description').value;
  if(localStorage.getItem('itemsJson')==null){
    itemJsonArray = [];
    itemJsonArray.push([tit, desc]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  }
  else{
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc]);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  }
  update();
  document.getElementById('title').value = "";
  document.getElementById('description').value = "";
}
function update(){
  if(localStorage.getItem('itemsJson')==null){
    itemJsonArray = [];
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  }
  else{
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  // populating the table
  tableBody = document.getElementById('tableBody');
  let str = ""
  itemJsonArray.forEach((element, index) => {
    str +=
    `<tr>
    <th scope="row">${index+1}</th>
    <td>${element[0]}</td>
    <td>${element[1]}</td>
    <td><button class="btn btn-primary" onclick=deleted(${index})><i class="fas fa-trash-alt"></i></button></td>
    <td><button class="btn btn-primary" onclick=edit(${index})><i class="fas fa-pencil-alt"></i></button></td>
    </tr>`
  });
  tableBody.innerHTML = str;
  
}
add = document.getElementById("add");
add.addEventListener("click",getAndUpdate);
update();
function deleted(itemIndex){
  console.log("delete", itemIndex);
  itemJsonArrayStr = localStorage.getItem('itemsJson');
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  // Delete itemindex element form the array
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
  update();
}
function clearStorage(){
  if(confirm("Do you really want to clear list?")){
    console.log("Clearing the Storage");
    localStorage.clear();
    update();
  }
}

function edit(itemIndex){
  console.log('Editing...');
  itemJsonArrayStr = localStorage.getItem('itemsJson');
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  console.log(itemJsonArray);
  task = [];
  task = itemJsonArray[itemIndex];
  document.getElementById('title').value = task[0];
  document.getElementById('description').value = task[1];
  deleted(itemIndex);
}