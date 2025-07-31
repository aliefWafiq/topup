import snap from "@/lib/midtrans";

const createTransaction = async(params: any, callback: Function) => {
    snap.createTransaction(params).then((transaction: {token:string}) => {
        callback(transaction)
    })
}

export default createTransaction