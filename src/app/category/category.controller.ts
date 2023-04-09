import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';

import { Category } from './category.schema';
import { CategoryService } from './category.service';
import { FieldService } from '../field/field.service';

@Controller('category')
export class CategoryController {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly fieldService: FieldService,
	) {}

	@Post()
	@UseGuards(RolesGuard)
	async createCategory(@Body() category: Category): Promise<Category> {
		return await this.categoryService.createCategory(category);
	}

	@Get()
	async getAllCategories(): Promise<Category[]> {
		return await this.categoryService.getAllCategories();
	}

	@Get(':id')
	async getCategoryById(@Param('id') id: string): Promise<Category> {
		return await this.categoryService.getCategoryById(id);
	}

	@Put()
	@UseGuards(RolesGuard)
	async editCategoryById(@Body() category: Category): Promise<Category> {
		return await this.categoryService.editCategoryById(category);
	}

	@Delete(':id')
	@UseGuards(RolesGuard)
	async deleteCategory(@Param('id') id: string): Promise<Category> {
		return await this.fieldService.deleteFieldsAndParentCat(id);
	}
}
