export interface DashboardSummary {
  totalProducts: number;
  totalCategories: number;
  orderStatus: {
    pending: number;
    confirmed: number;
    inProgress: number;
    completed: number;
    cancelled: number;
  };
}
