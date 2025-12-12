export interface DashboardSummary {
  totalProducts: number;
  totalCategories: number;
  totalSubscribers: number;
  totalRequests: number;
  requests: {
    requestsPending: number;
    requestsConfirmed: number;
    requestsInProgress: number;
    requestsCompleted: number;
    requestsCancelled: number;
  };
}
