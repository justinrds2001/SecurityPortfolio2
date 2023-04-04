import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Delete,
    UseGuards
} from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { Template } from './template.schema';

import { TemplateService } from './template.service';

@Controller()
export class TemplateController {
    constructor(private readonly templateService: TemplateService) { }

    @Get('template')
    async getTemplates(): Promise<Template[]> {
        return await this.templateService.getTemplates();
    }

    @Post('template')
    @UseGuards(RolesGuard)
    async createTemplate(
        @Body('name') name: string,
        @Body('content') content: string,
        @Body('templateImage') templateImage: string,
    ): Promise<Template> {
        try {
            return await this.templateService.createTemplate(name, content, templateImage);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('template/:id')
    @UseGuards(RolesGuard)
    async updateTemplate(
        @Param('id') id: string,
        @Body() template: Template,
    ): Promise<Template> {
        try {
            return await this.templateService.updateTemplate(id, template);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('template/:id')
    @UseGuards(RolesGuard)
    async deleteTemplate(@Param('id') id: string): Promise<Template> {
        try {
            return await this.templateService.deleteTemplate(id);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('template/:id')
    async getTemplateById(@Param('id') id: string): Promise<Template> {
        try {
            return await this.templateService.getTemplateById(id);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}