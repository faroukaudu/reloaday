# reloaday

{
  event_type: 'payment_success',
  requestId: 'ac581461-fd91-4fd0-b1df-6f64aebf1abd',
  data: {
    merchant: {
      walletId: 'N/A',
      walletBalance: 'N/A',
      userId: '282aa572-5efc-4a47-ab5b-2ddaab7db41e'
    },
    terminal: {},
    tokenizedCardData: {
      tokenKey: 'N/A',
      cardType: 'N/A',
      tokenExpiryYear: 'N/A',
      tokenExpiryMonth: 'N/A',
      cardPan: 'N/A'
    },
    transaction: {
      fee: 0.28,
      type: 'online_checkout',
      transactionId: 'WEB-ONLINE_C-282aa5-6e0f3812-76a0-4962-9bcc-5af940722fa7',
      responseCode: '',
      originatingFrom: 'web',
      merchantTxRef: 'txref-1769877002',
      transactionAmount: 600,
      time: '2026-01-31T16:30:02Z'
    },
    customer: { billerId: '543462******2808', productId: '543462' },
    order: {
      amount: 600,
      orderId: 'dc0a7ab1-6d4b-4102-89bd-52e750d81265',
      cardType: 'N/A',
      accountId: '282aa572-5efc-4a47-ab5b-2ddaab7db41e',        
      cardLast4Digits: 'N/A',
      cardCurrency: 'N/A',
      customerEmail: 'Umar@gmail.com',
      customerId: 'Umar Yusuf69374b91',
      isTokenizedCardPayment: 'false',
      orderReference: 'ORD_1769876976822_183992625',
      paymentMethod: 'card_payment',
      callbackUrl: 'http://localhost:3000/',
      currency: 'NGN'
    }
  }
}



data response:

{"id":163418972,"ident":"Data9b8951f68-352","network":1,"balance_before":"486.00499999999994","payment_medium":"MAIN WALLET","balance_after":"437.05499999999995","mobile_number":"08160278321","plan_type":"GIFTING","duration":"1 day","plan":579,"client_ip":"102.91.92.208","Status":"successful","api_response":"You have successfully gifted 75MB Daily Plan at N75 to 2348160278321.","plan_network":"MTN","plan_name":"40MB","plan_amount":"48.95","create_date":"2026-02-04T17:34:29.451977","Ported_number":true,"customer_reference":""}

http://localhost:3000/dashboard?orderId=a5e72ee4-0063-4046-b787-df4ebb258b91&orderReference=ORD_1770351765072_449733810

<!-- Use Order Refrence -->

loading response
✅ WEBHOOK HIT
headers: {
  host: '1677ffd92e92.ngrok-free.app',
  'user-agent': 'Jersey/2.35 (HttpUrlConnection 17.0.2)',       
  'content-length': '1083',
  accept: 'text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2',
  'content-type': 'application/json',
  'nomba-sig-value': 'iqmchtbU860akyZyR7SCGH8/VU+rGBQ8HAZzKrTat8w=',
  'nomba-signature': 'iqmchtbU860akyZyR7SCGH8/VU+rGBQ8HAZzKrTat8w=',
  'nomba-signature-algorithm': 'HmacSHA256',
  'nomba-signature-version': '1.0.0',
  'nomba-timestamp': '2026-02-06T04:23:07Z',
  'x-forwarded-for': '35.242.153.172',
  'x-forwarded-host': '1677ffd92e92.ngrok-free.app',
  'x-forwarded-proto': 'https',
  'accept-encoding': 'gzip'
}
{
  event_type: 'payment_success',
  requestId: 'eaa0a4f8-f746-4a6f-b09f-ce6e8b4f7648',
  data: {
    merchant: {
      walletId: 'N/A',
      walletBalance: 'N/A',
      userId: '282aa572-5efc-4a47-ab5b-2ddaab7db41e'
    },
    terminal: {},
    tokenizedCardData: {
      tokenKey: 'N/A',
      cardType: 'N/A',
      tokenExpiryYear: 'N/A',
      tokenExpiryMonth: 'N/A',
      cardPan: 'N/A'
    },
    transaction: {
      fee: 0.28,
      type: 'online_checkout',
      transactionId: 'WEB-ONLINE_C-282aa5-6729bdbe-2d55-4af7-82f8-cee5a70e28f7',
      responseCode: '',
      originatingFrom: 'web',
      merchantTxRef: 'txref-1770351786',
      transactionAmount: 300,
      time: '2026-02-06T04:23:06Z'
    },
    customer: { billerId: '543462******2808', productId: '543462' },
    order: {
      amount: 300,
      orderId: 'a5e72ee4-0063-4046-b787-df4ebb258b91',
      cardType: 'N/A',
      accountId: '282aa572-5efc-4a47-ab5b-2ddaab7db41e',        
      cardLast4Digits: 'N/A',
      cardCurrency: 'N/A',
      customerEmail: 'Umar@gmail.com',
      customerId: 'Umar Yusuf69374b91',
      isTokenizedCardPayment: 'false',
      orderReference: 'ORD_1770351765072_449733810',
      paymentMethod: 'card_payment',
      callbackUrl: 'http://localhost:3000/dashboard',
      currency: 'NGN'
    }
  }
}
User Found & the name is {
  _id: new ObjectId('69374b91fb5a4cc4d821a741'),
  username: 'Umar@gmail.com',
  firstname: 'Umar',
  lastname: 'Yusuf',
  email: 'Umar@gmail.com',
  phone: '08160278321',
  regDate: 'today',
  wallet_balace: 550,
  transactions: [
    {
      paymentStatus: 'payment_success',
      transactionRef: 'WEB-ONLINE_C-282aa5-eda97beb-56fe-4357-a6c2-6dca47962f86',
      paymentRef: 'a849a7e9-4e9e-4a26-906e-2774f4364864',       
      paymentDesc: 'Wallet-TopUp',
      paymentMeth: 'card_payment',
      amountPaid: 600,
      date: '2026-01-31T17:09:51Z',
      checkoutMode: 'Nomba payment',
      _id: new ObjectId('697e3760209d7398d580442d')
    },
    {
      paymentStatus: 'payment_success',
      transactionRef: 'WEB-ONLINE_C-282aa5-0a635479-868d-4eb0-b87b-731134dee945',
      paymentRef: '27136c0f-c59f-4c27-b46c-697209c3ae25',       
      paymentDesc: 'Wallet-TopUp',
      paymentMeth: 'card_payment',
      amountPaid: 2000,
      date: '2026-01-31T17:10:51Z',
      checkoutMode: 'Nomba payment',
      _id: new ObjectId('697e379c209d7398d5804437')
    },
    {
      paymentStatus: 'PAID',
      transactionRef: 'MNFY|87|20260201225044|000410',
      paymentRef: 'bKQNDXZ598OeFZrMEVs',
      paymentDesc: 'Funding Wallet',
      paymentMeth: 'CARD',
      amountPaid: 400,
      date: '2026-02-01 22:51:27.0',
      _id: new ObjectId('697fcc8f041bb98204c010c2')
    },
    {
      paymentStatus: 'PAID',
      transactionRef: 'MNFY|87|20260201225454|000411',
      paymentRef: '2k5RocTscoGWipwhj1B',
      paymentDesc: 'Funding Wallet',
      paymentMeth: 'CARD',
      amountPaid: 500,
      date: '2026-02-01 22:55:03.0',
      _id: new ObjectId('697fcc8f041bb98204c010c6')
    },
    {
      paymentStatus: 'payment_success',
      transactionRef: 'WEB-ONLINE_C-282aa5-167770c4-30a0-4f35-97d2-771c82337d27',
      paymentRef: '6aef4bc0-42aa-4adc-be36-c27a1fea2338',       
      paymentDesc: 'Wallet-TopUp',
      paymentMeth: 'card_payment',
      amountPaid: 300,
      date: '2026-02-05T02:23:27Z',
      checkoutMode: 'Nomba payment',
      _id: new ObjectId('6983ff20f1bef635165a1c8e')
    },
    {
      paymentStatus: 'payment_success',
      transactionRef: 'WEB-ONLINE_C-282aa5-cd95cf26-afcf-4be5-9b1d-427f67a05461',
      paymentRef: '913ec56c-e2b8-4b3c-9b62-0437f4a9dba8',       
      paymentDesc: 'Wallet-TopUp',
      paymentMeth: 'card_payment',
      amountPaid: 400,
      date: '2026-02-05T02:54:08Z',
      checkoutMode: 'Nomba payment',
      _id: new ObjectId('69840651f1bef635165a1e14')
    }
  ],
  dataTransactions: [],
  recharge: [],
  createdAt: 2025-12-08T22:05:06.010Z,
  updatedAt: 2026-02-05T02:54:09.368Z,
  __v: 6,
  trans_pin: '1236'
}
Saved to DB
trying to GET69374b91fb5a4cc4d821a741
deserializing user owo:"69374b91fb5a4cc4d821a741"
GETTING


{
  user: {
    id: 108283,
    email: 'fagzy98@gmail.com',
    username: 'fagzy',
    FullName: 'farouk audu',
    pin: '44744',
    Address: 'b7, kurkuja road, barnawa, kaduna\r\nb7, kurkuja road, barnawa, kaduna',
    Phone: '08160278321',
    user_type: 'Smart Earner',
    password: 'pbkdf2_sha256$260000$4EBQsN3OKkZlrzVyVb4cnL$RN84K3Sz8b41yhdYyxfFfam5BHKljBTbPEzKQ++kFvg=',
    Account_Balance: 3037.605,
    wallet_balance: '3038',
    bonus_balance: '0',
    referer_username: '',
    accounts_verified: false,
    bank_accounts: [ [Object], [Object], [Object], [Object] ],  
    reservedaccountNumber: null,
    reservedbankName: null
  },
  verification: { bvn_verified: false, nin_verified: false },   
  notification: { message: 'Chat us via WhatsApp on 08082792885 
or 08162269770' },
  percentage: {
    MTN: { percent: 85, phone: '*********' },
    GLO: { percent: 78, phone: '09095263MMK' },
    '9MOBILE': { percent: 77, phone: '09081****' },
    AIRTEL: { percent: 80, phone: '070131*****' }
  },
  topuppercentage: {
    MTN: { VTU: 97, 'Share and Sell': 95 },
    GLO: { VTU: 94.5, 'Share and Sell': 92 },
    '9MOBILE': { VTU: 96.5, 'Share and Sell': 95 },
    AIRTEL: { VTU: 98, 'Share and Sell': 81 }
  },
  Admin_number: [
    { network: 'MTN', phone_number: '*********' },
    { network: 'AIRTEL', phone_number: '070131*****' },
    { network: '9MOBILE', phone_number: '09081****' },
    { network: 'GLO', phone_number: '09095263MMK' }
  ],
  Exam: { WAEC: { amount: 3320 }, NECO: { amount: 1125 } },     
  banks: [],
  banners: [
    {
      banner: '/media/adsbanner/app-airtime2.jpeg',
      route: '/airtimenet'
    },
    { banner: '/media/adsbanner/app-cable.jpeg', route: '/cablename' },
    { banner: '/media/adsbanner/app-bill.jpeg', route: '/bill' },
    { banner: '/media/adsbanner/1002502381.jpg', route: '/datanet' }
  ],
  datacoupon_plan: [
    {
      id: 6,
      dataplan_id: '6',
      network: 'MTN',
      plan_network: 'MTN',
      plan_type: null,
      month_validate: '30 days',
      plan: '500.0MB',
      plan_amount: '159'
    },
    {
      id: 2,
      dataplan_id: '2',
      network: 'MTN',
      plan_network: 'MTN',
      plan_type: null,
      month_validate: '1week',
      plan: '1.0GB',
      plan_amount: '189'
    },
    {
      id: 1,
      dataplan_id: '1',
      network: 'MTN',
      plan_network: 'MTN',
      plan_type: null,
      month_validate: '30 days',
      plan: '1.5GB',
      plan_amount: '285'
    },
    {
      id: 3,
      dataplan_id: '3',
      network: 'MTN',
      plan_network: 'MTN',
      plan_type: null,
      month_validate: '30 days',
      plan: '2.0GB',
      plan_amount: '400'
    },
    {
      id: 4,
      dataplan_id: '4',
      network: 'MTN',
      plan_network: 'MTN',
      plan_type: null,
      month_validate: '30 days',
      plan: '3.0GB',
      plan_amount: '570'
    },
    {
      id: 5,
      dataplan_id: '5',
      network: 'MTN',
      plan_network: 'MTN',
      plan_type: null,
      month_validate: '30 days',
      plan: '5.0GB',
      plan_amount: '975'
    }
  ],
  Dataplans: {
    MTN_PLAN: {
      CORPORATE: [],
      SME: [Array],
      SME2: [],
      GIFTING: [Array],
      ALL: [Array]
    },
    GLO_PLAN: { ALL: [Array] },
    AIRTEL_PLAN: {
      CORPORATE: [Array],
      SME: [Array],
      GIFTING: [Array],
      ALL: [Array]
    },
    '9MOBILE_PLAN': {
      CORPORATE: [Array],
      SME: [Array],
      GIFTING: [Array],
      ALL: [Array]
    }
  },
  datacard_plan: [],
  Cableplan: {
    GOTVPLAN: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    DSTVPLAN: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    STARTIMEPLAN: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    cablename: [ [Object], [Object], [Object] ]
  },
  support_phone_number: '2348082792885',
  whatsapp_group_link: 'https://whatsapp.com/channel/0029Vb1pqiA8fewpxLm9nE2l',
  affiliate_upgrade_fee: 500000000,
  topuser_upgrade_fee: 300000000,
  recharge: {
    mtn: 248,
    glo: 0,
    airtel: 469,
    '9mobile': 200,
    mtn_pin: [ [Object], [Object], [Object], [Object] ],        
    glo_pin: [ [Object], [Object], [Object] ],
    airtel_pin: [ [Object], [Object], [Object], [Object] ],     
    '9mobile_pin': [ [Object], [Object] ]
  }
}
