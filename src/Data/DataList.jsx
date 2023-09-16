export const DataList = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 2,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
  },
  {
    id: 3,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
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
  { value: "", name: "Select ID Type" },
  { value: "aadhar", name: "Aadhar Card" },
  { value: "drvLincence", name: "Driver Lincence" },
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
  "ITEMCODE",
  "LOT NO.",
  "DESCRIPTION",
  "GROSS. WT.",
  "PRODUCT VALUE",
  "RENTAL VALUE",
  "DEPOSIT VALUE",
];
export const AddedTocCart = [
  "ITEMCODE",
  "LOT NO.",
  "GROSS WT.",
  "PRODUCTS VALUE",
  "RENTAL RATE",
  "DEPOSIT RATE",
  "Delete",
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
  "Delete",
];

export const rentalIssuePage = [
  "ItemCode",
  "Lot No.",
  "Gross Wt",
  "Product Value",
  "Rental Value",
  "Deposit Value",
  "Actual Wt At Delivery",
];
export const renatlReturnPage = [
  "ItemCode",
  "Lot No.",
  "Gross Wt",
  "Actual Wt Delivery",
  "Actual Wt Return",
  "Product Value",
  "Rental Value",
  "Penalty Charges",
  "Damage Charges",
  "Physical Damage",
];
