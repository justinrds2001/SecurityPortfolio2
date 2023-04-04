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
	UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { ContractService } from '../contract/contract.service';
import { Organisation } from './organisation.schema';

import { OrganisationService } from './organisation.service';

@Controller('organisation')
export class OrganisationController {
	constructor(private readonly organisationService: OrganisationService,
		private readonly contractService: ContractService) { }

	@Get()
	async getOrganisations() {
		return await this.organisationService.getOrganisations();
	}

	@Post()
	@UseGuards(RolesGuard)
	async createOrganisation(
		@Body('name') name: string,
		@Body('organisationImage') organisationImage: string,
		@Body('organisationIdentifier') organisationIdentifier: string,
		@Body('address') address: string,
		@Body('city') city: string,
		@Body('zipcode') zipcode: string,
		@Body('country') country: string,
		@Body('representative') representative: string,
	): Promise<Organisation> {
		return await this.organisationService.createOrganisation(
			name,
			organisationImage,
			organisationIdentifier,
			address,
			city,
			zipcode,
			country,
			representative
		);
	}

	@Put(':id')
	@UseGuards(RolesGuard)
	async updateOrganisation(
		@Param('id') id: string,
		@Body() organisation: Organisation,
	): Promise<Organisation> {
		return await this.organisationService.updateOrganisation(
			id,
			organisation,
		);
	}

	@Delete(':id')
	@UseGuards(RolesGuard)
	async deleteOrganisation(@Param('id') id: string): Promise<Organisation> {
		return await this.organisationService.deleteOrganisation(id);
	}

	@Get(':id')
	async getOrganisationById(@Param('id') id: string): Promise<Organisation> {
		return await this.organisationService.getOrganisationById(id);
	}

	@Get(':id/users')
	async getOrganisationUserCount(@Param('id') id: string): Promise<number> {
		return await this.organisationService.getOrganisationUserCount(id);
	}

	@Get(':id/contracts')
	async getOrganisationContractCount(@Param('id') id: string): Promise<number> {
		return await this.contractService.getOrganisationContractCount(id);
	}
}
