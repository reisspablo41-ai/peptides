export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  purity: string
  sequence: string | null
  specification: string
  price_per_unit: number
  stock_quantity: number
  category_id: number | null
  image_url: string | null
  lab_report_url: string | null
  is_active: boolean
  is_bundle: boolean
  bundle_components: BundleComponent[] | null
  total_mg_per_vial: number | null
  structural_batch_code: string | null
  created_at: string
  updated_at: string
  categories?: Category | null
}

export interface BundleComponent {
  product_slug: string
  quantity: number
  mg: number
  name?: string
}

export interface OrderItem {
  id: number
  order_id: string
  product_id: string | null
  quantity: number
  price_at_purchase: number
  products?: Pick<Product, 'name' | 'slug' | 'specification'> | null
}

export interface Order {
  id: string
  status: OrderStatus
  total_amount: number
  customer_email: string
  customer_name: string
  customer_phone: string | null
  shipping_address_line1: string
  shipping_address_line2: string | null
  city: string
  postal_code: string
  country: string
  tracking_number: string | null
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface CartItem {
  product: Product
  quantity: number
}
