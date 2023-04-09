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

import { Field } from './field.schema';
import { FieldService } from './field.service';

@Controller('field')
export class FieldController {
	constructor(private readonly fieldService: FieldService) { }

	// ##### User #####

	@Post()
	@UseGuards(RolesGuard)
	async createField(@Body() newField: Field): Promise<Field> {
		return await this.fieldService.createField(newField);
	}

	@Put(':id')
	@UseGuards(RolesGuard)
	async editField(
		@Param('id') id: string,
		@Body() newField: Field,
	): Promise<Field> {
		return await this.fieldService.editField(id, newField);
	}

	@Get()
	async getAllFields(): Promise<Field[]> {
		return await this.fieldService.getAllFields();
	}

	@Get(':id')
	async getFieldById(@Param('id') id: string): Promise<Field> {
		return await this.fieldService.getFieldById(id);
	}

	@Get(':id/category')
	async getFieldByIdWithCategory(@Param('id') id: string): Promise<Field> {
		return await this.fieldService.getFieldByIdWithCategory(id);
	}

	@Delete(':id')
	@UseGuards(RolesGuard)
	async deleteField(@Param('id') id: string): Promise<Field> {
		return await this.fieldService.deleteField(id);
	}
}
