import { Gene } from "./gene_model";
import { geneController } from "./gene_controller";
import { commonController } from "../common/controller_common_functions";
import { PAGINATION } from "../../config/constants";

const { DEFAULT_LIMIT } = PAGINATION;

export const geneResolvers = {
  Query: {
    getAllGenes: (root, { limit = DEFAULT_LIMIT, page }) =>
      commonController.getAll(Gene, limit, page, "gene.accessionId"),
    getGeneBy: (
      root,
      {
        search,
        advancedSearch,
        limit = DEFAULT_LIMIT,
        page,
        properties,
        fullMatchOnly,
      },
    ) =>
      geneController.getGeneBy(
        search,
        advancedSearch,
        limit,
        page,
        properties,
        fullMatchOnly,
      ),
  },
};
