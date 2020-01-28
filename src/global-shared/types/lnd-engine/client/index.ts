import { LndRouter } from './router'
import { LndInvoices } from './invoices'
import { LndEngineClient } from 'lnd-engine'
import { GrpcCall, GrpcOptions, GrpcError } from './grpc'
import { LoggerInterface } from '../../../logger'

export interface UTXO {
  amountSat: string,
  address: string
}

export enum AddressType {
  WITNESS_PUBKEY_HASH = 0,
  NESTED_PUBKEY_HASH = 1
}

interface ListUnspentRequest {
  minConfs: number,
  maxConfs: number
}

interface ListUnspentResponse {
  utxos: UTXO[]
}

export interface AddrToAmount {
  [index: string]: string
}

interface SendManyRequest {
  AddrToAmount: AddrToAmount,
  satPerByte?: string
}

interface SendManyResponse {
  txid: string
}

interface NewAddressResponse {
  address: string,
  type?: AddressType
}

interface EstimateFeeRequest {
  AddrToAmount: AddrToAmount,
  targetConf?: number
}

interface EstimateFeeResposne {
  feeSat: string,
  feerateSatPerByte: string
}

export interface LndActionOptions {
  client: LndEngineClient,
  logger: LoggerInterface
}

interface LightningAddress {
  pubkey: string,
  host?: string
}

interface ConnectPeerRequest {
  addr: LightningAddress
}

interface OpenChannelRequest {
  nodePubkey: Buffer,
  localFundingAmount: number,
  targetConf: number,
  private: boolean
}

interface PendingUpdate {
  txid: Buffer,
  outputIndex: number
}

interface ChannelPoint {
  fundingTxidBytes: Buffer
}

interface ChannelOpenUpdate {
  channelPoint: ChannelPoint
}

export interface PendingUpdateResponse {
  chanPending: PendingUpdate
}

export interface ChannelOpenResponse {
  chanOpen: ChannelOpenUpdate
}

export type OpenChannelResponse = PendingUpdateResponse | ChannelOpenResponse

interface SignMessageRequest {
  msg: Buffer
}

interface SignMessageResponse {
  signature: string
}

export interface Client {
  router: LndRouter,
  invoices: LndInvoices,
  listUnspent: (req: ListUnspentRequest, opts: GrpcOptions, cb: (err: GrpcError, res: ListUnspentResponse) => void) => void,
  sendMany: (req: SendManyRequest, opts: GrpcOptions, cb: (err: GrpcError, res: SendManyResponse) => void) => void,
  newAddress: (req: {}, opts: GrpcOptions, cb: (err: GrpcError, res: NewAddressResponse) => void) => void,
  estimateFee: (req: EstimateFeeRequest, opts: GrpcOptions, cb: (err: GrpcError, res: EstimateFeeResposne) => void) => void,
  connectPeer: (req: ConnectPeerRequest, opts: GrpcOptions, cb: (err: GrpcError, res: {}) => void) => void,
  openChannel: (req: OpenChannelRequest) => GrpcCall<OpenChannelResponse>,
  signMessage: (req: SignMessageRequest, opts: GrpcOptions, cb: (err: GrpcError, res: SignMessageResponse) => void) => void
}
