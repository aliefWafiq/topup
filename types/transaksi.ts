export enum StatusTransaksi {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export type Transaksi = {
    id_transaksi: string;
    harga: number;
    id_user: string;
    kode_produk: string;
    operator_produk: string;
    server: string;
    status: StatusTransaksi;
}