// export const getText = (key: string, language: string): string => {
//   const translations: { [key: string]: { [key: string]: string } } = {
//     dashboardTitle: {
//       en: "Dashboard",
//       bn: "ড্যাশবোর্ড",
//     },
//     welcome: {
//       en: "Welcome,",
//       bn: "স্বাগতম,",
//     },
//     newList: {
//       en: "New List",
//       bn: "নতুন তালিকা",
//     },
//     totalLists: {
//       en: "Total Lists",
//       bn: "মোট তালিকা",
//     },
//     allTimeGroceryLists: {
//       en: "All-Time Grocery Lists",
//       bn: "সর্বকালের মুদি তালিকা",
//     },
//     totalItems: {
//       en: "Total Items",
//       bn: "মোট আইটেম",
//     },
//     itemsAcrossAllLists: {
//       en: "Items Across All Lists",
//       bn: "সমস্ত তালিকা জুড়ে আইটেম",
//     },
//     totalSpent: {
//       en: "Total Spent",
//       bn: "মোট খরচ",
//     },
//     estimatedTotalExpenses: {
//       en: "Estimated Total Expenses",
//       bn: "আনুমানিক মোট খরচ",
//     },
//     avgListCost: {
//       en: "Avg. List Cost",
//       bn: "গড় তালিকা খরচ",
//     },
//     averagePerGroceryList: {
//       en: "Average Per Grocery List",
//       bn: "মুদি তালিকা প্রতি গড়",
//     },
//     spendingHistory: {
//       en: "Spending History",
//       bn: "খরচের ইতিহাস",
//     },
//     expensesOverTime: {
//       en: "Expenses Over Time",
//       bn: "সময়ের সাথে খরচ",
//     },
//     recentLists: {
//       en: "Recent Lists",
//       bn: "সাম্প্রতিক তালিকা",
//     },
//     recentlyCreatedLists: {
//       en: "Recently Created Lists",
//       bn: "সম্প্রতি তৈরি করা তালিকা",
//     },
//     listName: {
//       en: "List Name",
//       bn: "তালিকার নাম",
//     },
//     items: {
//       en: "Items",
//       bn: "আইটেম",
//     },
//     estCost: {
//       en: "Est. Cost",
//       bn: "আনু. খরচ",
//     },
//     createNewList: {
//       en: "Create New List",
//       bn: "নতুন তালিকা তৈরি করুন",
//     },
//     addItems: {
//       en: "Add items to your new list",
//       bn: "আপনার নতুন তালিকায় আইটেম যোগ করুন",
//     },
//     listInformation: {
//       en: "List Information",
//       bn: "তালিকা তথ্য",
//     },
//     listDetails: {
//       en: "Set the details for your new list",
//       bn: "আপনার নতুন তালিকার বিবরণ সেট করুন",
//     },
//     listTitle: {
//       en: "List Title",
//       bn: "তালিকার শিরোনাম",
//     },
//     month: {
//       en: "Month",
//       bn: "মাস",
//     },
//     year: {
//       en: "Year",
//       bn: "বছর",
//     },
//     saving: {
//       en: "Saving",
//       bn: "সংরক্ষণ করা হচ্ছে",
//     },
//     saveList: {
//       en: "Save List",
//       bn: "তালিকা সংরক্ষণ করুন",
//     },
//     addItem: {
//       en: "Add Item",
//       bn: "আইটেম যোগ করুন",
//     },
//     addNewItem: {
//       en: "Add a new item to your list",
//       bn: "আপনার তালিকায় একটি নতুন আইটেম যোগ করুন",
//     },
//     itemsInList: {
//       en: "Items in Your List",
//       bn: "আপনার তালিকার আইটেম",
//     },
//     viewManageLists: {
//       en: "View and manage your past lists",
//       bn: "আপনার অতীতের তালিকা দেখুন এবং পরিচালনা করুন",
//     },
//     searchLists: {
//       en: "Search lists...",
//       bn: "তালিকা খুঁজুন...",
//     },
//     yourGroceryLists: {
//       en: "Your Grocery Lists",
//       bn: "আপনার মুদি তালিকা",
//     },
//     listsTotal: {
//       en: "lists total",
//       bn: "মোট তালিকা",
//     },
//     noListsMatch: {
//       en: "No lists match your search.",
//       bn: "আপনার অনুসন্ধানের সাথে মিলে যাওয়া কোনো তালিকা নেই।",
//     },
//     clearSearch: {
//       en: "Clear Search",
//       bn: "অনুসন্ধান পরিষ্কার করুন",
//     },
//     noListsYet: {
//       en: "No lists yet! Start by creating one.",
//       bn: "এখনো কোনো তালিকা নেই! একটি তৈরি করার মাধ্যমে শুরু করুন।",
//     },
//     createFirstList: {
//       en: "Create First List",
//       bn: "প্রথম তালিকা তৈরি করুন",
//     },
//     createdOn: {
//       en: "Created On",
//       bn: "তৈরি করা হয়েছে",
//     },
//   };

//   return translations[key]?.[language] || translations[key]?.en || key;
// };

// Add BDT currency symbol to translations
export const currencySymbols = {
  USD: "$",
  BDT: "৳"
};


type TranslationKey =
  | "dashboardTitle"
  | "welcome"
  | "newList"
  | "totalLists"
  | "allTimeGroceryLists"
  | "totalItems"
  | "itemsAcrossAllLists"
  | "totalSpent"
  | "estimatedTotalExpenses"
  | "avgListCost"
  | "averagePerGroceryList"
  | "spendingHistory"
  | "expensesOverTime"
  | "recentLists"
  | "recentlyCreatedLists"
  | "listName"
  | "items"
  | "estCost"
  | "noListsYet"
  | "createFirstList"
  | "language"
  | "createNewList"
  | "addItems"
  | "listInformation"
  | "listDetails"
  | "listTitle"
  | "month"
  | "year"
  | "saveList"
  | "saving"
  | "saveChanges"
  | "addItem"
  | "addNewItem"
  | "itemsInList"
  | "login"
  | "register"
  | "email"
  | "password"
  | "forgotPassword"
  | "dontHaveAccount"
  | "signUp"
  | "loginToAccount"
  | "enterEmail"
  | "listHistory"
  | "viewManageLists"
  | "searchLists"
  | "yourGroceryLists"
  | "listsTotal"
  | "clickToView"
  | "noListsMatch"
  | "clearSearch"
  | "createdOn"
  | "dashboard"
  | "createList"
  | "history"
  | "logout"
  | "resetPassword"
  | "sendResetLink"
  | "resetPasswordTitle"
  | "enterResetEmail"
  | "checkEmail"
  | "resetEmailSent"
  | "newPassword"
  | "confirmNewPassword"
  | "updatePassword"
  | "backToLogin"
  | "deleteList"
  | "cancel"
  | "selectMonth"
  | "selectYear"
  | "noItemsInList"
  | "areYouSure"
  | "deleteWarning"
  | "groceryList"
  | "delete"
  | "spendingSummary"
  | "totalVsAverageCost"
  | "totalSpent"
  | "avgListCost"
  | "print"
  | "billing"
  | "settings"
  | "profile"
  | "logout"
  | "confirmDelete";




type Translations = {
  [key in TranslationKey]: {
    en: string;
    bn: string;
  }
};

export const translations: Translations = {
  dashboardTitle: {
    en: "Dashboard",
    bn: "ড্যাশবোর্ড"
  },
  print: {
    en: "Download PDF",
    bn: "পিডিএফ ডাউনলোড করুন"
  },
  welcome: {
    en: "Welcome back,",
    bn: "আবারও স্বাগতম,"
  },
  newList: {
    en: "New List",
    bn: "নতুন তালিকা"
  },
  totalLists: {
    en: "Total Lists",
    bn: "মোট তালিকা"
  },
  allTimeGroceryLists: {
    en: "All-time grocery lists",
    bn: "সব সময়ের মুদি তালিকা"
  },
  totalItems: {
    en: "Total Items",
    bn: "মোট আইটেম"
  },
  itemsAcrossAllLists: {
    en: "Items across all lists",
    bn: "সকল তালিকার আইটেম"
  },
  totalSpent: {
    en: "Total Spent",
    bn: "মোট ব্যয়"
  },
  totalVsAverageCost: {
    en: "Total vs Average Cost",
    bn: "মোট বনাম গড় ব্যয়"
  },
  spendingSummary: {
    en: "Spending Summary",
    bn: "ব্যয়ের সারসংক্ষেপ"
  },
  spendingHistory: {
    en: "Spending History",
    bn: "ব্যয়ের ইতিহাস"
  },

  estimatedTotalExpenses: {
    en: "Estimated total expenses",
    bn: "অনুমানিত মোট ব্যয়"
  },
  avgListCost: {
    en: "Avg. List Cost",
    bn: "গড় তালিকা ব্যয়"
  },
  averagePerGroceryList: {
    en: "Average per grocery list",
    bn: "প্রতি মুদি তালিকার গড়"
  },
  spendingHistory: {
    en: "Spending History",
    bn: "ব্যয়ের ইতিহাস"
  },
  expensesOverTime: {
    en: "Your estimated grocery expenses over the last 6 months",
    bn: "গত 6 মাসে আপনার অনুমানিত মুদি ব্যয়"
  },
  recentLists: {
    en: "Recent Lists",
    bn: "সাম্প্রতিক তালিকা"
  },
  recentlyCreatedLists: {
    en: "Your most recently created grocery lists",
    bn: "আপনার সাম্প্রতিক তৈরি করা মুদি তালিকা"
  },
  listName: {
    en: "List Name",
    bn: "তালিকার নাম"
  },
  items: {
    en: "Items",
    bn: "আইটেম"
  },
  estCost: {
    en: "Est. Cost",
    bn: "অনুমিত মূল্য"
  },
  noListsYet: {
    en: "You haven't created any grocery lists yet.",
    bn: "আপনি এখনো কোন মুদি তালিকা তৈরি করেননি।"
  },
  createFirstList: {
    en: "Create Your First List",
    bn: "আপনার প্রথম তালিকা তৈরি করুন"
  },
  language: {
    en: "বাংলা",
    bn: "English"
  },
  createNewList: {
    en: "Create New List",
    bn: "নতুন তালিকা তৈরি করুন"
  },
  addItems: {
    en: "Add items to your grocery list",
    bn: "আপনার মুদি তালিকায় আইটেম যোগ করুন"
  },
  listInformation: {
    en: "List Information",
    bn: "তালিকা তথ্য"
  },
  listDetails: {
    en: "Provide basic information about your grocery list",
    bn: "আপনার মুদি তালিকা সম্পর্কে মৌলিক তথ্য প্রদান করুন"
  },
  listTitle: {
    en: "List Title",
    bn: "তালিকার শিরোনাম"
  },
  month: {
    en: "Month",
    bn: "মাস"
  },
  year: {
    en: "Year",
    bn: "বছর"
  },
  saveList: {
    en: "Save List",
    bn: "তালিকা সংরক্ষণ করুন"
  },
  saveChanges: {
    en: "Save Changes",
    bn: "পরিবর্তনগুলি সংরক্ষণ করুন"
  },
  saving: {
    en: "Saving",
    bn: "সংরক্ষণ করা হচ্ছে"
  },
  addItem: {
    en: "Add Item",
    bn: "আইটেম যোগ করুন"
  },
  addNewItem: {
    en: "Add a new item to your grocery list with AI price estimation",
    bn: "AI মূল্য অনুমান সহ আপনার মুদি তালিকায় একটি নতুন আইটেম যোগ করুন"
  },
  itemsInList: {
    en: "Items in Your List",
    bn: "আপনার তালিকায় আইটেম"
  },
  login: {
    en: "Login",
    bn: "লগইন"
  },
  register: {
    en: "Register",
    bn: "নিবন্ধন করুন"
  },
  email: {
    en: "Email",
    bn: "ইমেইল"
  },
  password: {
    en: "Password",
    bn: "পাসওয়ার্ড"
  },
  forgotPassword: {
    en: "Forgot password?",
    bn: "পাসওয়ার্ড ভুলে গেছেন?"
  },
  dontHaveAccount: {
    en: "Don't have an account?",
    bn: "অ্যাকাউন্ট নেই?"
  },
  signUp: {
    en: "Sign up",
    bn: "নিবন্ধন করুন"
  },
  loginToAccount: {
    en: "Login to your account",
    bn: "আপনার অ্যাকাউন্টে লগইন করুন"
  },
  enterEmail: {
    en: "Enter your email below to login to your account",
    bn: "আপনার অ্যাকাউন্টে লগইন করতে নীচে আপনার ইমেল লিখুন"
  },
  listHistory: {
    en: "List History",
    bn: "তালিকা ইতিহাস"
  },
  viewManageLists: {
    en: "View and manage your past grocery lists",
    bn: "আপনার পূর্বের মুদি তালিকাগুলি দেখুন এবং পরিচালনা করুন"
  },
  searchLists: {
    en: "Search lists...",
    bn: "তালিকা খুঁজুন..."
  },
  yourGroceryLists: {
    en: "Your Grocery Lists",
    bn: "আপনার মুদি তালিকাগুলি"
  },
  listsTotal: {
    en: "lists in total • Click on a list to view or edit",
    bn: "মোট তালিকা • দেখতে বা সম্পাদনা করতে একটি তালিকায় ক্লিক করুন"
  },
  clickToView: {
    en: "Click to view or edit",
    bn: "দেখতে বা সম্পাদনা করতে ক্লিক করুন"
  },
  noListsMatch: {
    en: "No lists match your search.",
    bn: "আপনার অনুসন্ধানের সাথে কোন তালিকা মেলে না।"
  },
  clearSearch: {
    en: "Clear Search",
    bn: "অনুসন্ধান পরিষ্কার করুন"
  },
  createdOn: {
    en: "Created On",
    bn: "তৈরি হয়েছে"
  },
  dashboard: {
    en: "Dashboard",
    bn: "ড্যাশবোর্ড"
  },
  createList: {
    en: "Create List",
    bn: "তালিকা তৈরি করুন"
  },
  history: {
    en: "List History",
    bn: "তালিকা ইতিহাস"
  },
  logout: {
    en: "Logout",
    bn: "লগআউট"
  },
  resetPassword: {
    en: "Reset Password",
    bn: "পাসওয়ার্ড রিসেট করুন"
  },
  sendResetLink: {
    en: "Send Reset Link",
    bn: "রিসেট লিঙ্ক পাঠান"
  },
  resetPasswordTitle: {
    en: "Reset Your Password",
    bn: "আপনার পাসওয়ার্ড রিসেট করুন"
  },
  enterResetEmail: {
    en: "Enter your email and we'll send you a link to reset your password",
    bn: "আপনার ইমেল লিখুন এবং আমরা আপনাকে পাসওয়ার্ড রিসেট করার লিঙ্ক পাঠাব"
  },
  checkEmail: {
    en: "Check Your Email",
    bn: "আপনার ইমেল চেক করুন"
  },
  resetEmailSent: {
    en: "We've sent a password reset link to your email. Please check your inbox.",
    bn: "আমরা আপনার ইমেলে একটি পাসওয়ার্ড রিসেট লিঙ্ক পাঠিয়েছি। অনুগ্রহ করে আপনার ইনবক্স চেক করুন।"
  },
  newPassword: {
    en: "New Password",
    bn: "নতুন পাসওয়ার্ড"
  },
  confirmNewPassword: {
    en: "Confirm New Password",
    bn: "নতুন পাসওয়ার্ড নিশ্চিত করুন"
  },
  updatePassword: {
    en: "Update Password",
    bn: "পাসওয়ার্ড আপডেট করুন"
  },
  backToLogin: {
    en: "Back to Login",
    bn: "লগইনে ফিরে যান"
  },
  deleteList: {
    en: "Delete List",
    bn: "তালিকা মুছুন"
  },
  delete: {
    en: "Delete",
    bn: "মুছুন"
  },
  cancel: {
    en: "Cancel",
    bn: "বাতিল করুন"
  },
  selectMonth: {
    en: "Select Month",
    bn: "মাস নির্বাচন করুন"
  },
  selectYear: {
    en: "Select Year",
    bn: "বছর নির্বাচন করুন"
  },
  noItemsInList: {
    en: "No items in this list",
    bn: "এই তালিকায় কোনো আইটেম নেই"
  },
  confirmDelete: {
    en: "Are you sure you want to delete this list?",
    bn: "আপনি কি নিশ্চিত যে আপনি এই তালিকাটি মুছে ফেলতে চান?"
  },
  areYouSure: {
    en: "Are you sure?",
    bn: "আপনি কি নিশ্চিত?"
  },
  deleteWarning: {
    en: "This action cannot be undone.",
    bn: "এই পদক্ষেপটি পূর্বাবস্থায় ফিরিয়ে আনা যাবে না।"
  },
  groceryList: {
    en: "Grocery List",
    bn: "মুদি তালিকা"
  },
  billing : {
    en: "Billing ",
    bn: "বিলিং"
  },
  settings : {
    en: "Settings",
    bn: "সেটিংস"
  },
  profile : {
    en: "Profile",
    bn: "প্রোফাইল"
  },
};

// export const getText = (key: TranslationKey, language: "en" | "bn"): string => {
//   return translations[key][language];
// };

export const getText = (key: string, language: "en" | "bn"): string => {
  const entry = translations[key as TranslationKey];

  if (!entry) {
    console.warn(`Missing translation key: ${key}`);
    return key; // fallback to the key itself
  }

  return entry[language] || entry["en"] || key;
};


