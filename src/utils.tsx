import { Fetcher } from "swr";

export const fetcher: Fetcher<TagResponse, string> = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const errorData = (await res.json()) as TagResponse;
    if (errorData.error_message && errorData.error_name && errorData.error_id) {
      const error = new Error(
        `Failed StackExchange API call with error id ${errorData.error_id}. Details: ${errorData.error_name} - ${errorData.error_message}`
      );
      error.name = errorData.error_name;
      throw error;
    }
    throw new Error(
      `Failed StackExchange API call with http response ${res.status}`
    );
  }

  return res.json();
};

export function getApiURL(
  page: number,
  rowsPerPage: number,
  order: Order,
  orderBy: OrderProperty
): string {
  return `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${rowsPerPage}&order=${order}&sort=${orderBy}&site=stackoverflow&filter=!9WL3B-Bjh`;
}

export interface TagResponse {
  items?: TagData[];
  has_more?: boolean;
  quota_max?: number;
  quota_remaining?: number;
  backoff?: boolean;
  error_id?: number;
  error_message?: string;
  error_name?: string;
  page?: number;
}

export interface TagData {
  count: number;
  name: string;
}

export type Order = "asc" | "desc";

export type OrderProperty = "popular" | "name";

interface HeadCell {
  field: OrderProperty;
  headerName: string;
}

export const headCells: HeadCell[] = [
  { field: "name", headerName: "Tag name" },
  { field: "popular", headerName: "Post count" },
];

export const defaults: {
  page: number;
  rows: number;
  order: Order;
  orderProperty: OrderProperty;
} = {
  page: 1,
  rows: 5,
  order: "desc",
  orderProperty: "popular",
};
