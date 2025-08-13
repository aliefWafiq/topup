import midtransClient from 'midtrans-client'

export const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
})

export async function handleMidtransNotification(notificationData: any): Promise<{success: boolean, error?: string}> {
    try{
        const order_id = notificationData.order_id
        const transaction_status = notificationData.transaction_status

        const isSignatureValid = await midtransClient.transaction.notificationValidate(notificationData)

        if (!isSignatureValid) return { success: false, error: 'Invalid signature' }

        switch(transaction_status){
            case 'settlement':
                console.log(`Order ${order_id} berhasil`)
                break
            case 'pending': 
                console.log(`Order ${order_id} tertunda`)
                break
            default:
                console.log(`Status transaksi tidak dikenali: ${transaction_status}`)
                break
        }

        return {success: true}
    }catch(error){
        console.error('error', error)
        return { success: false }
    }
}