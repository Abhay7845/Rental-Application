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
export const packageDayOption = [];
for (let i = 1; i <= 31; i++) {
  packageDayOption.push(i);
}

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
    value: "Purple",
    label: "Purple",
  },
  {
    value: "Non-Purple",
    label: "Non-Purple",
  },
  {
    value: "New Customer",
    label: "New Customer",
  },
];
