type TCurrentUser = {
  user_id: number,
  email: string,
  role: string
};

type TLocation = {
  country?: string,
  state?: string,
  city?: string,
  address?: string,
  zip_code?: string,
  details?: string,
  latitude?: number,
  longitude?: number
};

type TCurrentCustomer = {
  username?: string,
  first_name?: string,
  last_name?: string,
  slug?: string,
  phone_number?: string,
  profile_picture?: string,
  user_id?: number,
  id?: number
};

type TCurrentMerchant = {
  merchant_name?: string,
  slug?: string,
  phone_number?: string,
  tax_id?: string,
  description?: string,
  profile_picture?: string,
  background_picture?: string,
  user_id?: number,
  id?: number
};

type TShowMerchant = {
  email: string,
  links: TLinks,
  location: TLocation,
  merchant_info: TCurrentMerchant,
  products: TProducts
};

// type TMerchantProps = {
//   merchant: TCurrentMerchant
// }

type TLink = {
  site_name: string,
  url: string,
  id: number
};

type TLinks = Array<TLink>;

type TProduct = {
  product_name: string,
  description?: string,
  price: number,
  category?: string,
  available: boolean,
  product_picture?: string,
  tax: number,
  id: number
};

type TProducts = Array<TProduct>;

type TContextProps = {
  currentUser: TCurrentUser | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<TCurrentUser | null>>,
  handleCurrentUser: () => void,
  location: TLocation | null,
  setLocation: React.Dispatch<React.SetStateAction<TLocation | null>>,
  handleLocation: () => void,
  setLoggedOut: React.Dispatch<React.SetStateAction<boolean>>,
  loggedOut: boolean,
  merchants: Array<TShowMerchant>,
  setMerchants: React.Dispatch<React.SetStateAction<Array<TShowMerchant>>>
};

type TLinksProps = {
  handleLinks: () => void
};

type TLinkProps = {
  link: TLink
};

type TProductsProps = {
  handleProducts: () => void
};

type TProductProps = {
  product: TProduct
};

type THandleMode = {
  handleMode: () => void
};

type TCartProduct = {
  productName: string,
  unitPrice: number,
  amount: number,
  tax: number,
  id: number
};

type TProductOrder = {
  id: number,
  order_id: number,
  product_id: number,
  product_name: string,
  price: number,
  tax: number,
  amount: number,
  available: boolean,
  amount_changed: boolean
};

type TOrder = {
  id: number,
  customer_id: number,
  merchant_id: number,
  delivery_fee: number,
  tip: number,
  accepted: boolean,
  canceled: boolean,
  current_user: string,
  products_order: Array<TProductOrder>,
  message: string
};

type TOrders = Array<TOrder>;