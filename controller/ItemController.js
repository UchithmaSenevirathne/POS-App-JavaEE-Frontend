let itPreID="I00-00";
let itNo=1;

let itemDetail = [];

setItemID();

let isUpdateModeItem = false;
let selectedItemId = null;

$('#onActionSaveItem').click(function () {
    if (isUpdateModeItem) {
        updateItem();
    } else {
        saveItem();
    }
});

function setItemID() {
    $('#itemID').val(itPreID+itNo);
    console.log(Number(itNo));
}

getAllItem();

// $('#btnGetAllItem').click(function () {
//     getAllItem();
// });

function saveItem() {
    let item = {
        id: $("#itemID").val(),
        name: $("#itemName").val(),
        description: $("#description").val(),
        uPrice: $("#uPrice").val(),
      };
    
      $.ajax({
        url: "http://localhost:8080/POS_Backend/item",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function () {
          alert("Item saved successfully");
          getAllItem();
          resetForm();
          itNo++;
          setItemID();
        },
        error: function (err) {
          console.error(err);
          alert("Failed to save item");
        },
      });
    // let iId=$('#itemID').val();
    // let name=$('#itemName').val();
    // let description=$('#description').val();
    // let unitPrice=$('#uPrice').val();

    // let newItem=Object.assign({},ItemOb);
    // newItem.itemID=iId;
    // newItem.itemName=name;
    // newItem.itemDescription=description;
    // newItem.itemUnitPrice=unitPrice;

    // if (true){
    //     itemDetails.push(newItem);
    //     getAllItem();
    //     clearItemFeilds();

    //     itNo++;
    //     setItemID();
    //     console.log(itNo);

    // }else{
    //     alert("THIS ITEM ALREADY IN THIS SYSTEM");
    //     clearItemFeilds();
    // }

    // itemNames();
}

function getAllItem() {
    $.ajax({
        url: "http://localhost:8080/POS_Backend/item",
        method: "GET",
        success: function (data) {
          itemDetail = data;
          let tbody = $("#itemTbody");
          tbody.empty();
          data.forEach((item) => {
            let row = `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${item.uPrice}</td>
                    <td>${customer.contact}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" onclick="deleteItem('${item.id}')">Delete</button>
                    </td>
                </tr>`;
            tbody.append(row);
            bindItemTrEvents();
          });
        },
        error: function (err) {
          console.error(err);
          alert("Failed to load item");
        },
      });
    // $('#itemTbody').empty();
    // for (let i = 0; i < itemDetails.length; i++) {
    //     let id = itemDetails[i].itemID;
    //     let name = itemDetails[i].itemName;
    //     let desc = itemDetails[i].itemDescription;
    //     let up = itemDetails[i].itemUnitPrice;

    //     let itemRow = `<tr>
    //                 <td>${id}</td>
    //                 <td>${name}</td>
    //                 <td>${desc}</td>
    //                 <td>${up}</td>
    //                 <td><button class="delete-btn bg-danger text-white border rounded" onclick="deleteItem('${id}', this)">Delete</button></td>
    //             </tr>`

    //     $('#tblItem').append(itemRow);
    //     bindItemTrEvents();
    // }
}

function bindItemTrEvents() {
    $('#itemTbody>tr').click(function (event) {

        let id=$(this).children().eq(0).text();
        let name=$(this).children().eq(1).text();
        let desc= $(this).children().eq(2).text();
        let uP=$(this).children().eq(3).text();

        $('#itemID').val(id);
        $('#itemName').val(name);
        $('#description').val(desc);
        $('#uPrice').val(uP);

        selectedItemId = id;
        isUpdateModeItem = true;
        $('#onActionSaveItem').text('UPDATE ITEM').removeClass('save').addClass('update');

    });
}

function updateItem() {

    let item = {
        id: $("#itemID").val(),
        name: $("#itemName").val(),
        description: $("#description").val(),
        uPrice: $("#uPrice").val(),
      };
    
      $.ajax({
        url: "http://localhost:8080/POS_Backend/item",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function () {
          alert("Customer updated successfully");
          getAllCustomer();
          resetForm();
          isUpdateMode = false;
          selectedCustomerId = null;
          $("#onActionSave")
            .text("REGISTER CUSTOMER")
            .removeClass("update")
            .addClass("save");
        },
        error: function (err) {
          console.error(err);
          alert("Failed to update customer");
        },
      });

    // let iId=$('#itemID').val();
    // let name=$('#itemName').val();
    // let description=$('#description').val();
    // let unitPrice=$('#uPrice').val();

    // let itemConsent=confirm("DO YOU WANT UPDATE THIS ITEM");

    // if (itemConsent){
    //     for (let i = 0; i < itemDetails.length; i++) {
    //         if (itemDetails[i].itemID == selectedItemId){
    //             itemDetails[i].itemID=iId;
    //             itemDetails[i].itemName=name;
    //             itemDetails[i].itemDescription=description;
    //             itemDetails[i].itemUnitPrice=unitPrice;
                
    //             getAllItem();
    //             clearItemFeilds();
    //             alert("ITEM UPDATED SUCCSESS");
    //             break;
    //         }
    //     }
    //     isUpdateModeItem = false;
    //     selectedItemId = null;
    //     $('#onActionSaveItem').text('ADD ITEM').removeClass('update').addClass('save');

    // }else {
    //     clearItemFeilds();
    // }

    // setItemID();

}

function deleteItem(itemID, button) {
    let consent=confirm("DO U WANT DELETE THIS ITEM");

    if(consent){
        for (let i = 0; i < itemDetails.length; i++) {
            if (itemDetails[i].itemID==itemID){
                itemDetails.splice(i,1);
                getAllItem();
                clearItemFeilds()
    
                alert("ITEM DELETED SUCCSESS...!");
                break;
            }
        }
    }else{
        clearItemFeilds();
    }

    setItemID();
    
}

function clearItemFeilds() {
    $("#itemID,#itemName,#description,#uPrice").val("");
    $('#itemID').focus();
}

$('#searchItem').on('input', function () {
    filterItems();
});

function filterItems() {
    $('#itemTbody').empty();
    let searchValue = $('#searchItem').val().toLowerCase();
    for (let i = 0; i < itemDetails.length; i++) {
        if (itemDetails[i].itemID.toLowerCase().includes(searchValue) ||
            itemDetails[i].itemName.toLowerCase().includes(searchValue) ||
            itemDetails[i].itemDescription.toLowerCase().includes(searchValue) ) {

                let id=itemDetails[i].itemID;
                let name=itemDetails[i].itemName;
                let desc=itemDetails[i].itemDescription;
                let up=itemDetails[i].itemUnitPrice;

            let row=`<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${desc}</td>
                        <td>${up}</td>
                        <td><button class="delete-btn bg-danger text-white border rounded" onclick="deleteItem('${id}', this)">Delete</button></td>
                    </tr>`

            $("#tblItem").append(row);
            bindItemTrEvents();
        }
    }
}

// $('#btnSearchItem').click(function () {
//     $('#itemTbody').empty();
//     for (let i = 0; i <itemDetails.length ; i++) {
//         if (itemDetails[i].itemID.toLowerCase().includes($('#searchItem').val()) ||
//             itemDetails[i].itemName.toLowerCase().includes($('#searchItem').val()) ||
//             itemDetails[i].itemDescription.toLowerCase().includes($('#searchItem').val()) ){
                
//             let id=itemDetails[i].itemID;
//             let name=itemDetails[i].itemName;
//             let desc=itemDetails[i].itemDescription;
//             let up=itemDetails[i].itemUnitPrice;

//             let row=`<tr>
//                         <td>${id}</td>
//                         <td>${name}</td>
//                         <td>${desc}</td>
//                         <td>${up}</td>
//                         <td><button class="delete-btn bg-danger text-white border rounded" onclick="deleteItem('${id}', this)">Delete</button></td>
//                     </tr>`

//             $("#tblItem").append(row);
//             bindItemTrEvents();

//             break;
//         }
//     }
// });