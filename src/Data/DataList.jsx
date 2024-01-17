export const packageDayOption = [
  { value: "4", label: "4 Days" },
  { value: "8", label: "8 Days" },
];
export const IMAGE_URL =
  "https://jewbridge.titanjew.in/CatalogImages/api/ImageFetch/?Type=ProductImages&ImageName=";

export const EmailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g;
export const adharRegex =
  /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/g;
export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/g;
export const driverRegex = /^[A-Z](?:\d[- ]*){14}$/g;
export const phonePan = /^[A-Z]{1,10}$/;

export const addressTypeOption = [
  { value: "", name: "Select" },
  { value: "aadhar", name: "Aadhar Card" },
  { value: "Passport", name: "Passport" },
];

export const CancellationReason = [
  { value: "", name: "Select Reason" },
  {
    value: "Cancelling due to change in Wedding dates",
    name: "Cancelling due to change in Wedding dates",
  },
  {
    value: "Cancelling - Need no more exists",
    name: "Cancelling - Need no more exists",
  },
  {
    value: "Cancelling - Product not Ready",
    name: "Cancelling - Product not Ready",
  },
  {
    value: "Cancelling - Product Not Available",
    name: "Cancelling - Product Not Available",
  },
];

// export const ImageHeaders = {
//   "Content-Type": "multipart/form-data",
//   UserToken: "xFeToMkUuejH0aq1IzZYmw==",
//   ApiKey: "636A4E75-2B3D-4B83-8DD6-F36046290E0F",
// };

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
export const homePageTHeadrs = [
  "Select",
  "Customer Name",
  "Booking Ref No.",
  "Phone No.",
  "Package Days",
  "Rental Date",
  "Status"
];

export const WishListHeader = [
  "Image",
  "Itemcode",
  "Lot No.",
  "Description",
  "Gross. Wt.",
  "Product Value",
  "Rental Value",
  "Rental Value With(18%)Tax",
  "Damage Protection Amount",
  "Availability",
];

export const AddedToCartHeaders = [
  "Image",
  "Item Code",
  "Lot No.",
  "Gross Wt",
  "Product Value",
  "Rental Value",
  "Rental Value With(18%)Tax",
  "Damage Protection",
];

export const PaymentHeading1 = [
  "Customer Name",
  "Phone Number",
  "Payment Request For",
  "Product Value",
  "Rent Value",
  "Damage Protection",
];
export const PaymentHeading2 = [
  "Payment For",
  "Payment Mode(*)",
  "Credit Note Ref No.(*)",
  "Amount(*)",
  "File(*)",
  "Delete",
];

export const rentalIssuePage = [
  "Image",
  "Item Code",
  "Lot No.",
  "Gross Wt",
  "Product Value",
  "Rental Value",
  "Damage Protection Amount",
  "Actual Wt At Delivery",
];
export const renatlReturnPage = [
  "Image",
  "Item Code",
  "Lot No.",
  "Gross Wt",
  "Actual Wt Delivery",
  "Actual Wt Return",
  "Product Value",
  "Rental Value",
  "Penalty Charges",
  "Physical Damage",
  "Damage Charges",
];
export const factoryQAPage = [
  "Image",
  "Item Code",
  "Lot No.",
  "Gross Wt",
  "Actual Wt Delivery",
  "Actual Wt Return",
  "Product Value",
  "Rental Vvalue",
  "Penalty Charges",
  "Damge Charges",
  "Remarks",
];

export const CancelPageHeading = [
  "Image",
  "Item Code",
  "Lot No.",
  "Rent Start Date",
  "Package Days",
  "Product Value",
  "Rental Value",
];

export const AdminSummarHeaders = [
  "Store Code",
  "Booking Date",
  "Booking RefNo.",
  "Rental Start Date",
  "Rental End Date",
  "Cool Of End Date",
  "Status",
  "View Booking Details",
];
export const ProductDlsHeaders = [
  "Item Code",
  "Lot No.",
  "Gross Wt.",
  "Product Value",
  "Rental Value",
  "Rental Value With(18%)Tax",
  "Deposit Value",
];
export const OrderSummaryDlsHeaders = [
  "Item Code",
  "Actual Wt at Delivery",
  "Actual Wt at Return",
  "Booking Amount(With 18% Tax)",
  "Deposit Amount",
  "Penalty Amount",
  "Damage Charge",
];

export const PaymentDlsHeaders = [
  "Payment For",
  "Payment Type",
  "Credit Note Ref No.",
  "Amount",
  "Payment Doc File",
  "Credit Date",
];
export const CustomerDlsHeaders = [
  "Customer Name",
  "Phone No.",
  "E-Mail ID",
  "PAN No.",
  "PAN File",
  "Customer Address",
  "Address Proof ID No.",
  "Address Proof File",
];
export const CustomerBankDlsHeaders = [
  "Bank Name",
  "Account Number",
  "IFSC Code",
  "Bank File",
];
