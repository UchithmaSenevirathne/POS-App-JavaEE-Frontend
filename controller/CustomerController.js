// let CustPreID = "C00-00";
// let cusNo = 4;

// setCusID();

let isUpdateMode = false;
let selectedCustomerId = null;

$("#onActionSave").click(function () {
  if (isUpdateMode) {
    updateCustomer();
  } else {
    saveCustomer();
  }
});

function setCusID() {
  $("#cusID").val(CustPreID + cusNo);
  console.log(Number(cusNo));
}

getAllCustomer();

// $('#btnGetAll').click(function () {
//     getAllCustomer();
// });

function saveCustomer() {
  let formData = $("#customerForm").serialize();
  $.ajax({
    url: "http://localhost:8080/POS_Backend/customer",
    method: "post",
    data: formData,
    success: function (res) {
      getAllCustomer();
      alert(res.massage);
    },
    error: function (err) {
      alert(e.responseJSON.massage);
    },
  });
  //   let cusID = $("#cusID").val();
  //   let cusName = $("#cusName").val();
  //   let cusAddress = $("#cusAddress").val();
  //   let cusEmail = $("#cusEmail").val();
  //   let cusContact = $("#cusContact").val();

  //   let newCustomer = Object.assign({}, customerOb);
  //   newCustomer.customerID = cusID;
  //   newCustomer.customerName = cusName;
  //   newCustomer.customerAddress = cusAddress;
  //   newCustomer.customerEmail = cusEmail;
  //   newCustomer.customerContact = cusContact;

  //   if (true) {
  //     customerDetail.push(newCustomer);
  //     console.log(customerDetail);
  //     clearCustomerFeilds();
  //     getAllCustomer();

  //     alert("SAVED SUCCSESS...!");

  //     cusNo++;
  //     setCusID();
  //     console.log(cusNo);
  //   } else {
  //     alert("THIS CUSTOMER ALREADY IN THIS SYSTEM");
  //     clearCustomerFeilds();
  //   }
  //   cusNames();
}

function getAllCustomer() {
  $("#customerTbody").empty();

  $.ajax({
    url: "http://localhost:8080/POS_Backend/customer",
    method: "get",
    success: function (customer) {
      for (let i in customer) {
        let cus = customer[i];
        let id = cus.id;
        let name = cus.name;
        let address = cus.address;
        let email = cus.email;
        let contact = cus.contact;
        let row = `<tr>
                    <td>${id}</td>
                    <td>${name}</td>
                    <td>${address}</td>
                    <td>${email}</td>
                    <td>${contact}</td>
                    <td><button class="delete-btn bg-danger text-white border rounded" onclick="deleteCustomer('${id}', this)">Delete</button></td>
                </tr>`;
        $("#tblcustomer").append(row);
        bindCustomerTrEvents();
      }
    },
  });
  //   for (let i = 0; i < customerDetail.length; i++) {
  //     let id = customerDetail[i].customerID;
  //     let name = customerDetail[i].customerName;
  //     let address = customerDetail[i].customerAddress;
  //     let email = customerDetail[i].customerEmail;
  //     let contact = customerDetail[i].customerContact;

  //     let row = `<tr>
  //                     <td>${id}</td>
  //                     <td>${name}</td>
  //                     <td>${address}</td>
  //                     <td>${email}</td>
  //                     <td>${contact}</td>
  //                     <td><button class="delete-btn bg-danger text-white border rounded" onclick="deleteCustomer('${id}', this)">Delete</button></td>
  //                 </tr>`;
  //     $("#tblcustomer").append(row);
  //     bindCustomerTrEvents();
  //   }
}

function bindCustomerTrEvents() {
  $("#customerTbody>tr").click(function (event) {
    let id = $(this).children().eq(0).text();
    let name = $(this).children().eq(1).text();
    let address = $(this).children().eq(2).text();
    let email = $(this).children().eq(3).text();
    let contact = $(this).children().eq(4).text();

    $("#cusID").val(id);
    $("#cusName").val(name);
    $("#cusAddress").val(address);
    $("#cusEmail").val(email);
    $("#cusContact").val(contact);

    selectedCustomerId = id;
    isUpdateMode = true;
    $("#onActionSave")
      .text("UPDATE CUSTOMER")
      .removeClass("save")
      .addClass("update");
  });
}

function updateCustomer() {
  let cusID = $("#cusID").val();
  let cusName = $("#cusName").val();
  let cusAddress = $("#cusAddress").val();
  let cusEmail = $("#cusEmail").val();
  let cusContact = $("#cusContact").val();

  let consent = confirm("DO U WANT UPDATE THIS CUSTOMER");

  if (consent) {
    for (let i = 0; i < customerDetail.length; i++) {
      if (customerDetail[i].customerID == selectedCustomerId) {
        customerDetail[i].customerID = cusID;
        customerDetail[i].customerName = cusName;
        customerDetail[i].customerAddress = cusAddress;
        customerDetail[i].customerEmail = cusEmail;
        customerDetail[i].customerContact = cusContact;

        getAllCustomer();
        clearCustomerFeilds();
        alert("UPDATED SUCCSESS...!");

        break;
      }
    }
    isUpdateMode = false;
    selectedCustomerId = null;
    $("#onActionSave")
      .text("REGISTER CUSTOMER")
      .removeClass("update")
      .addClass("save");
  } else {
    clearCustomerFeilds();
  }
  setCusID();
  cusNames();
}

function deleteCustomer(customerID, button) {
  let consent = confirm("DO U WANT DELETE THIS CUSTOMER");

  if (consent) {
    for (let i = 0; i < customerDetail.length; i++) {
      if (customerDetail[i].customerID == customerID) {
        customerDetail.splice(i, 1);
        getAllCustomer();
        clearCustomerFeilds();

        alert("DELETED SUCCSESS...!");
        break;
      }
    }
  } else {
    clearCustomerFeilds();
  }

  setCusID();
  // cusNames()
}

function clearCustomerFeilds() {
  $("#cusID,#cusName,#cusAddress,#cusEmail,#cusContact").val("");
  $("#cusID").focus();
}

$("#searchCus").on("input", function () {
  filterCustomers();
});

function filterCustomers() {
  $("#customerTbody").empty();
  let searchValue = $("#searchCus").val().toLowerCase();
  for (let i = 0; i < customerDetail.length; i++) {
    if (
      customerDetail[i].customerID.toLowerCase().includes(searchValue) ||
      customerDetail[i].customerName.toLowerCase().includes(searchValue) ||
      customerDetail[i].customerAddress.toLowerCase().includes(searchValue) ||
      customerDetail[i].customerEmail.toLowerCase().includes(searchValue) ||
      customerDetail[i].customerContact.toLowerCase().includes(searchValue)
    ) {
      let id = customerDetail[i].customerID;
      let name = customerDetail[i].customerName;
      let address = customerDetail[i].customerAddress;
      let email = customerDetail[i].customerEmail;
      let contact = customerDetail[i].customerContact;

      let row = `<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${address}</td>
                        <td>${email}</td>
                        <td>${contact}</td>
                        <td><button class="delete-btn bg-danger text-white border rounded" onclick="deleteCustomer('${id}', this)">Delete</button></td>
                    </tr>`;

      $("#customerTbody").append(row);
      bindCustomerTrEvents();
    }
  }
}