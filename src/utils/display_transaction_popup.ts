import { ITransaction } from "@/interfaces/ITransaction";

export default async function displayTransactionPopup(token: string): Promise<ITransaction> {
    return new Promise((resolve, reject) => {
        window.snap.pay(token, {
            onSuccess: function (result) {
                resolve(result);
            },
            onPending: function (result) {
                alert("Payment Pending.");
                resolve(result);
            },
            onError: function (result) {
                alert("Payment Failed.");
                reject(result);
            }
        });
    });
}