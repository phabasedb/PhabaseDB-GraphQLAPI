import { Gene } from "./gene_model";
import {
  advancedSearchFilter,
  textSearchFilter,
} from "mongodb-filter-object-parser";
import { GraphQLError } from "graphql";
import { resolvePagination } from "../../utils/pagination";

class geneController {
  static async getGeneBy(
    search,
    advancedSearch,
    limit,
    page = 0,
    properties = ["_id", "gene.name", "gene.accessionId", "chromosome.name"],
    fullMatchOnly = false,
  ) {
    const {
      limit: safeLimit,
      page: safePage,
      offset,
    } = resolvePagination(limit, page);

    let filter = {};

    if (advancedSearch && search) {
      throw new GraphQLError("Use either search or advancedSearch, not both", {
        extensions: { statusCode: 400 },
      });
    }

    if (advancedSearch !== undefined) {
      filter = advancedSearchFilter(advancedSearch);
    } else if (search !== undefined) {
      filter = textSearchFilter(search, properties, fullMatchOnly);
    }

    const [genes, total] = await Promise.all([
      Gene.find(filter).limit(safeLimit).skip(offset).lean(),
      Gene.countDocuments(filter),
    ]);

    const lastPage = Math.max(Math.ceil(total / safeLimit) - 1, 0);

    if (safePage > lastPage) {
      throw new GraphQLError("Page number exceeds available results.", {
        extensions: { statusCode: 400 },
      });
    }

    return {
      data: genes,
      pagination: {
        limit: safeLimit,
        currentPage: safePage,
        firstPage: 0,
        lastPage,
        totalResults: total,
        hasNextPage: safePage < lastPage,
      },
    };
  }
}

export { geneController };
