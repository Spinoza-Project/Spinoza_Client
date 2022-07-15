export interface ConfigType {
  next_redirect_pc_url: string;
  next_redirect_mobile_url: string;
  tid: string;
  params: {
    cid: string;
    partner_order_id: string;
    partner_user_id: string;
    item_name: string;
    quantity: number;
    total_amount: number;
    tax_free_amount: number;
    approval_url: string;
    fail_url: string;
    cancel_url: string;
  };
}

export const initialConfig: ConfigType = {
  next_redirect_pc_url: '',
  next_redirect_mobile_url: '',
  tid: '',
  params: {
    cid: 'TC0ONETIME',
    partner_order_id: 'partner_order_id',
    partner_user_id: 'partner_user_id',
    item_name: '자기 나무 심기',
    quantity: 1,
    total_amount: 0,
    tax_free_amount: 0,
    approval_url: 'http://localhost:3000/approval',
    fail_url: 'http://localhost:3000/home',
    cancel_url: 'http://localhost:3000/home',
  },
};
