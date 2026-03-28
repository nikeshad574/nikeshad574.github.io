export interface IPagination {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
  has_more_pages: boolean;
}

export interface IPaginatedResp<T> {
  pagination: IPagination;
  data: T[];
}
