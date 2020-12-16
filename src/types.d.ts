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
  details?: string
};

type TCurrentCustomer = {
  username?: string,
  first_name?: string,
  last_name?: string,
  slug?: string,
  phone_number?: string,
  profile_picture?: string,
  user_id?: number
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
  handleLocation: () => void
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
  productName?: string,
  unitPrice?: number,
  amount?: number,
  tax?: number,
  id?: number
}