const ordersData = async () => {
    const ordersUrl = 'https://extendsclass.com/api/json-storage/bin/addcdbf'

    const response = await fetch(ordersUrl)


    const data = await response.json()
    console.log(data);

    const arrayOfOrders = data.Results

    const c = sessionStorage.getItem('keyPassword')
    const customer = c.substring(0, c.length - 1) // BONAP

    for (let i = 0; i < arrayOfOrders.length; i++) {
        if (customer == arrayOfOrders[i].order.customerId) {
            console.log('Nasao sam korisnika');
            showOrders(arrayOfOrders[i])
        }
    }
}

window.onload = function () {
    ordersData()
}

const showOrders = x => {
    const resultOrder = x.order;
    const resultOrderDetails = x.orderDetails;

    console.log('Order Details:', resultOrderDetails);

    let suma = 0;
    let ukupnaSuma = 0;

    const ordersDiv = document.getElementById('orders');

    const parseJsonDate = jsonString => {
        return new Date(parseInt(jsonString.replace('/Date(', '').replace(')/', ''), 10));
    };

    let datum = parseJsonDate(resultOrder.orderDate);

    console.log('Parsed Date:', datum);

    let konacanDatum = datum.toJSON();
    console.log('Final Date:', konacanDatum);
    console.log('Formatted Date:', konacanDatum.slice(0, 10));

    ordersDiv.innerHTML += `
        <div class="col-sm-12 center-block" id=${resultOrder.id}>
            <div class="thumbnail col-md-12 box">
                <p class='orderP'>
                    OrderID: ${resultOrder.id} <br>
                </p>
                ${resultOrderDetails.map(y => {
                    suma += y.quantity * y.unitPrice * (1 - y.discount);
                    ukupnaSuma += suma;
                    return `
                        <p class='price'>
                            ProductID: ${y.productId} <br>
                        </p>
                        <p class='price'>
                            Quantity: ${y.quantity} <br>
                        </p>
                        <p class='price'>
                            UnitPrice: ${y.unitPrice} <br>
                        </p>
                        <p class='price'>
                            Date: ${konacanDatum.slice(0, 10)} <hr>
                        </p>
                        <p class='price'>
                            Amount: ${suma.toFixed(2)} <hr>
                        </p>
                    `;
                }).join('')}
                <p class='total-price'>
                    TotalAmount: ${ukupnaSuma.toFixed(2)} <br>
                </p>
            </div>
        </div>
    `;
};

const username = sessionStorage.getItem('keyUsername');
$('#logout').text(username);

$('#logout').on({
    mouseover: function(){
        $(this).text('Logout');
        $(this).css({
            "background": "gray",
            "color": "#fff",
            "border-radius": "10px"
        });
    },
    mouseout: function(){
        $(this).text(username);
        $(this).css({
            "background": "none"
        });
    },
    click: function(){
        sessionStorage.removeItem('keyUsername');
        sessionStorage.removeItem('keyPassword');
        location.href = 'login.html';
    }
});
