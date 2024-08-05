let OrderPreID="O00-00";
let orderNo=1;

// cusNames();
// itemNames();
setOrderId();


function cusNames() {
    var optionCus = '';
    for (var i = 0; i < customerDetail.length; i++) {
        optionCus += '<option value="' + customerDetail[i].customerName + '">' + customerDetail[i].customerName + '</option>';
    }
    $('#cmbCusNames').append(optionCus);
    $('filterInputCusName').val($('#cmbCusNames').val);
}

function itemNames() {

    var optionItem = '';
    for (var i = 0; i < itemDetails.length; i++) {
        optionItem += '<option value="' + itemDetails[i].itemName + '">' + itemDetails[i].itemName + '</option>';
    }
    $('#cmbItemNames').append(optionItem);
    $('filterInputItemName').val($('#cmbItemNames').val);
}

function setOrderId() {
    $('#InputOID').val(OrderPreID+orderNo);
    console.log(Number(orderNo));
}

$('#filterInputCusName').change(function () {
    for (let i = 0; i < customerDetail.length; i++) {
        if ($(this).val()==customerDetail[i].customerName){
            $('#selectedCusID').val(customerDetail[i].customerID);
            $('#selectedCusName').val(customerDetail[i].customerName);
            break;
        }
    }
});

$('#filterInputItemName').change(function () {
    for (let i = 0; i < itemDetails.length; i++) {
        if ($(this).val()==itemDetails[i].itemName){
            $('#selectedItemCode').val(itemDetails[i].itemID);
            $('#selectedItemName').val(itemDetails[i].itemName);
            $('#selectedItemDes').val(itemDetails[i].itemDescription);
            $('#selectedItemUP').val(itemDetails[i].itemUnitPrice);
            break;
        }
    }
});

$("#btnAddToCart").click(function () {
    addToCart();
});

function addToCart() {
    let subTotal=0;
    let oItemID = $("#selectedItemCode").val();
    let oItemName = $("#selectedItemName").val();
    let oItemDesc = $("#selectedItemDes").val();
    let oItemUnitPrice = $("#selectedItemUP").val();
    let oItemQty = $("#selectedQty").val();
    let oTotal = oItemUnitPrice*oItemQty;

    let newCart = Object.assign({}, cartOb);
    newCart.IID = oItemID;
    newCart.IName = oItemName;
    newCart.IDescription = oItemDesc;
    newCart.IUnitPrice = oItemUnitPrice;
    newCart.IQty = oItemQty;
    newCart.ITotal = oTotal;

    //add customer record to the customer array
    orderDetailDb.push(newCart);

    // for (let i = 0; i < itemDetails.length; i++) {
    //     if(itemDetails[i].code==oItemID){
    //         itemDetails[i].qtyOnHand=itemDetails[i].qtyOnHand-oQty;
    //     }
    // }


    //create row and add text field values
    let row=`<tr>
                    <td>${newCart.IID}</td>
                    <td>${newCart.IName}</td>
                    <td>${newCart.IDescription}</td>
                    <td>${newCart.IUnitPrice}</td>
                    <td>${newCart.IQty}</td>
                    <td>${newCart.ITotal}</td>
                   </tr>`;
    //and then append the row to tableBody
    $("#tBodyPlaceOrder").append(row);

    clearItemDetails();

    for (let i = 0; i <= orderDetailDb.length; i++) {
        subTotal+=orderDetailDb[i].ITotal;
        $('#inputTotal').val(parseInt(subTotal));
        console.log(parseInt(subTotal));
    }

}

$('#inputCash').keydown(function (event){

    if (event.key==='Enter'){
        let balance = Number($('#inputCash').val())-Number($('#inputTotal').val());

        $('#balance').val(balance);
    }

});

$('#btnPurchase').click(function () {
    purchaseOrder();
});

function purchaseOrder() {
    let IdOfOrder = $('#InputOID').val();
    let cusIDOfOrder=$('#selectedCusID').val();
    let cusNameOfOrder=$('#selectedCusName').val();
    let dateOfOrder=$('#InputDate').val();
    let cartDetails=orderDetailDb;
    let subTotal = $('#inputTotal').val();

    let newOrder=Object.assign({},orderOb);
    newOrder.id=IdOfOrder;
    newOrder.customerId=cusIDOfOrder;
    newOrder.customerName=cusNameOfOrder;
    newOrder.date=dateOfOrder;
    newOrder.cartDetail=cartDetails;
    newOrder.total=subTotal;

    orderDb.push(newOrder);


    orderNo++;
    setOrderId();
    console.log(orderNo);

    orderDetailDb=[];
    alert("order Placed Succesfully !");
    console.log(orderDb);
    clearFields();
    getAllOrder();
}

function clearFields() {
    $("#inputCash").val("");
    $("#selectedCusID").val("");
    $("#selectedCusName").val("");
    $("#inputTotal").val("");
    $("#selectedItemCode").val("");
    $("#selectedItemName").val("");
    $("#selectedItemDes").val("");
    $("#tBodyPlaceOrder").empty();
    $("#selectedItemUP").val("");
    $("#selectedQty").val("");
    $("#balance").val("");
    $("#filterInputCusName").val("");
    $("#filterInputItemName").val("");
}

function clearItemDetails() {
    $("#selectedItemCode").val("");
    $("#selectedItemName").val("");
    $("#selectedItemDes").val("");
    $("#selectedItemUP").val("");
    $("#selectedQty").val("");
    $("#filterInputItemName").val("");
}

