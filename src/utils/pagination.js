import { GraphQLError } from "graphql";
import { PAGINATION } from "../config/constants";

const { DEFAULT_LIMIT, MAX_LIMIT } = PAGINATION;

export function resolvePagination(limit, page = 0) {
  if (limit < 0 || limit > MAX_LIMIT) {
    throw new GraphQLError(`limit must be between 1 and ${MAX_LIMIT}`, {
      extensions: { statusCode: 400 },
    });
  }

  const safeLimit = limit === 0 ? DEFAULT_LIMIT : limit;
  const safePage = Math.max(page, 0);

  return {
    limit: safeLimit,
    page: safePage,
    offset: safePage * safeLimit,
  };
}
