import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrganisationController } from './organisation/organisation.controller';
import {
	Organisation,
	OrganisationSchema,
} from './organisation/organisation.schema';
import { OrganisationService } from './organisation/organisation.service';

import { AuthService } from './auth/auth.service';
import { Identity, IdentitySchema } from './auth/identity.schema';

import { UserController } from './user/user.controller';
import { User, UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';

import { Category, CategorySchema } from './category/category.schema';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';

import { FieldController } from './field/field.controller';
import { FieldService } from './field/field.service';
import { Field, FieldSchema } from './field/field.schema';

import { Template, TemplateSchema } from './template/template.schema';
import { TemplateController } from './template/template.controller';
import { TemplateService } from './template/template.service';

import { Contract, ContractSchema } from './contract/contract.schema';
import { ContractController } from './contract/contract.controller';
import { ContractService } from './contract/contract.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema },
			{ name: Identity.name, schema: IdentitySchema },
			{ name: Organisation.name, schema: OrganisationSchema },
			{ name: Category.name, schema: CategorySchema },
			{ name: Field.name, schema: FieldSchema },
			{ name: Template.name, schema: TemplateSchema },
			{ name: Contract.name, schema: ContractSchema },
		]),
	],
	controllers: [
		UserController,
		OrganisationController,
		CategoryController,
		FieldController,
		TemplateController,
		ContractController,
	],
	providers: [
		UserService,
		AuthService,
		OrganisationService,
		CategoryService,
		FieldService,
		TemplateService,
		ContractService,
	],
	exports: [UserService, OrganisationService],
})
export class DataModule {}
