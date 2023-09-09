export const DataList = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
];
export const packageDayOption = [
  { value: "4", label: "4 Days" },
  { value: "8", label: "8 Days" },
];

export const EmailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g;
export const adharRegex =
  /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/g;
export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/g;
export const driverRegex = /^[A-Z](?:\d[- ]*){14}$/g;
export const phonePan = /^[A-Z]{1,10}$/;

export const addressTypeOption = [
  { value: "aadhar", name: "Aadhar Card" },
  { value: "drvLincence", name: "Driver Lincence" },
];

export const ProductsDetails = [
  {
    id: 1,
    bookDate: "2023-08-20",
    endDate: "2023-08-17",
    coolOfEndDate: "2023-08-18",
  },
  {
    id: 2,
    bookDate: "2023-08-22",
    endDate: "2023-08-21",
    coolOfEndDate: "2023-08-22",
  },
  {
    id: 3,
    bookDate: "2023-08-22",
    endDate: "2023-08-26",
    coolOfEndDate: "2023-08-27",
  },
  {
    id: 4,
    bookDate: "2023-08-23",
    endDate: "2023-08-26",
    coolOfEndDate: "2023-08-27",
  },
];

export const ImageHeaders = {
  "Content-Type": "multipart/form-data",
  UserToken: "xFeToMkUuejH0aq1IzZYmw==",
  ApiKey: "636A4E75-2B3D-4B83-8DD6-F36046290E0F",
};

export const constomerType = [
  {
    value: "",
    label: "Select Type",
  },
  {
    value: "PURPLE",
    label: "Purple",
  },
  {
    value: "NON-PURPLE",
    label: "Non-Purple",
  },
  {
    value: "NewRental_OnlyCustomer",
    label: "New Customer",
  },
];

export const WishListHeader = [
  "SR. No.",
  "ITEMCODE",
  "DESCRIPTION",
  "G. WT.",
  "N. WT.",
  "BASE PRICE",
  "HSN CODE",
  "#OF DAYS",
  "RENTAL CHARGES",
  "OTHER CHARGES",
  "DISCOUNT",
  "NET CHARGES",
];
export const AddedTocCart = [
  "ITEMCODE",
  "PDT ID",
  "LOT NO.",
  "CFA",
  "GROSS WT.",
  "NET WT.",
  "PRODUCTS VALUE",
  "RENTAL RATE",
  "DEPOSIT RATE",
];
export const DeliveryListHearders = [
  "ITEMCODE",
  "DISCRIPTIONS",
  "GROSS WT.",
  "NET WT.",
  "BASE PRICE",
  "HSN/SAC",
];

export const FinalInvoicePdfHeaders = [
  "DISCRIPTIONS OF THE GOODS",
  "GROSS WT.",
  "NET WT.",
  "BASE PRICE",
  "HSN CODE",
  "NO.OF DAYS",
  "RENTAL CHARGES(HSN:997329)",
  "LATE FEE(HSN:9997)",
  "DAMAGES(HSN:999794)",
  "DISCOUNT",
  "VALUE AFTER DISCOUNT",
];

export const PaymentHeading1 = [
  "Prodcut_ID",
  "Customer_Name",
  "Phone_Number",
  "Payment_Req_For",
  "Product_Value",
  "Rent_Value",
  "Deposit_Value",
];
export const PaymentHeading2 = [
  "Payment_For",
  "Payment_Type",
  "Payment_Ref_No.",
  "Amount",
  "File",
];
