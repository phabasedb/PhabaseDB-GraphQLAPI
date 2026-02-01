import { GraphQLError } from "graphql";
import { resolvePagination } from "../../utils/pagination";

export class commonController {
  static async getAll(collection, limit, page = 0, sortValue) {
    const {
      limit: safeLimit,
      page: safePage,
      offset,
    } = resolvePagination(limit, page);

    // Total documents (for pagination)
    const total = await collection.countDocuments();

    // Validate page
    const lastPage = Math.max(Math.ceil(total / safeLimit) - 1, 0);
    if (safePage > lastPage) {
      throw new GraphQLError("You must select an available page number", {
        extensions: { statusCode: 400 },
      });
    }

    // Real paginated query
    const data = await collection
      .find({})
      .sort(sortValue)
      .limit(safeLimit)
      .skip(offset)
      .lean();

    // Response
    return {
      data,
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

  static async countDocumentsIn(collection, filter = {}) {
    try {
      const numeroDocumentos = await collection.countDocuments(filter);
      return numeroDocumentos;
    } catch (error) {
      console.error("Error al contar documentos:", error);
      throw error;
    }
  }
}
