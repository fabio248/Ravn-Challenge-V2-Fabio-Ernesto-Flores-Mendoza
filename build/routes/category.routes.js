import { Router } from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import { createCategorySchema } from '../schemas/category.schema';
import { createCategory } from '../controllers/category.controller';
var categoryRouter = Router();
categoryRouter.post('/', validatorHandler(createCategorySchema, 'body'), createCategory);
export { categoryRouter };
//# sourceMappingURL=category.routes.js.map