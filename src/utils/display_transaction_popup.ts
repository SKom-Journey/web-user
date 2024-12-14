export default function displayTransactionPopup(token: string) {
    window.snap.pay(token, {
        onSuccess: function (result) {
            alert("Payment Successful!");
            console.log("Success:", result);
        },
        onPending: function (result) {
            alert("Payment Pending.");
            console.log("Pending:", result);
        },
        onError: function (result) {
            alert("Payment Failed.");
            console.log("Error:", result);
        }
    });
}