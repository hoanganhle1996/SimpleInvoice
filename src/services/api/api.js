import {postRequest, getRequest} from '../networking/index'
import Config from 'react-native-config'
import queryString from 'query-string'

const baseURL = Config.API_URL

export const AUTH_API = {
  // ADD ENDPOINT REFRESH TOKEN HERE
  refreshToken: 'api/refreshToken',
}

export async function login(data) {
  const params = new URLSearchParams()
  params.append('client_id', data.client_id)
  params.append('client_secret', data.client_secret)
  params.append('grant_type', data.grant_type)
  params.append('scope', data.scope)
  params.append('username', data.username)
  params.append('password', data.password)
  const rs = await postRequest(`${baseURL}/token`, params.toString(), {
    'Content-Type': 'application/x-www-form-urlencoded',
  })
  return rs
}

export async function getUserProfile() {
  const rs = await getRequest(`${baseURL}/membership-service/1.2.0/users/me`)
  return rs
}

export const getInvoiceList = async ({pageSize = 30, pageNum = 1, ordering, sortBy, status, keyword}) => {
  const params = queryString.stringify(
    {
      pageSize,
      pageNum,
      ordering,
      sortBy,
      status,
      keyword,
    },
    {skipEmptyString: true, skipNull: true, sort: false},
  )
  const rs = await getRequest(`${baseURL}/invoice-service/1.0.0/invoices?${params}`)
  return rs
}

export async function createInvoice(body) {
  const invoiceDetail = {
    invoices: [
      {
        bankAccount: {
          bankId: '',
          sortCode: '09-01-01',
          accountNumber: '12345678',
          accountName: 'John Terry',
        },
        customer: {
          firstName: 'Nguyen',
          lastName: 'Dung 2',
          contact: {
            email: 'nguyendung2@101digital.io',
            mobileNumber: '+6597594971',
          },
          addresses: [
            {
              premise: 'CT11',
              countryCode: 'VN',
              postcode: '1000',
              county: 'hoangmai',
              city: 'hanoi',
            },
          ],
        },
        documents: [
          {
            documentId: '96ea7d60-89ed-4c3b-811c-d2c61f5feab2',
            documentName: 'Bill',
            documentUrl: 'http://url.com/#123',
          },
        ],
        invoiceReference: `#${body.reference}`,
        invoiceNumber: `INV${Math.floor(Math.random() * 1000000000)}`,
        currency: 'GBP',
        invoiceDate: '2021-06-04',

        dueDate: body.date,
        description: body.description,
        customFields: [
          {
            key: 'invoiceCustomField',
            value: 'value',
          },
        ],
        extensions: [
          {
            addDeduct: 'ADD',
            value: 10,
            type: 'PERCENTAGE',
            name: 'tax',
          },
          {
            addDeduct: 'DEDUCT',
            type: 'FIXED_VALUE',
            value: 10.0,
            name: 'discount',
          },
        ],
        items: [
          {
            itemReference: 'itemRef',
            description: 'Honda RC150',
            quantity: 1,
            rate: 1000,
            itemName: 'Honda Motor',
            itemUOM: 'KG',
            customFields: [
              {
                key: 'taxiationAndDiscounts_Name',
                value: 'VAT',
              },
            ],
            extensions: [
              {
                addDeduct: 'ADD',
                value: 10,
                type: 'FIXED_VALUE',

                name: 'tax',
              },
              {
                addDeduct: 'DEDUCT',
                value: 10,
                type: 'PERCENTAGE',
                name: 'tax',
              },
            ],
          },
        ],
      },
    ],
  }

  const rs = await postRequest(`${baseURL}/invoice-service/2.0.0/invoices`, invoiceDetail, {
    'Operation-Mode': 'SYNC',
  })
  return rs
}
