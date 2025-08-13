import { snap } from "@/lib/midtrans";

const createTransaction = async(params: any, callback: Function) => {
    snap.createTransaction(params).then((transaction: {token:string}) => {
        callback(transaction)
    })
    console.log("PARAM MIDTRANSSS")
}

export default createTransaction