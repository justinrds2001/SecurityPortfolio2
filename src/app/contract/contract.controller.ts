import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { InjectToken, Token } from '../auth/token.decorator';
import { ContractService } from './contract.service';
import { Contract } from './contract.schema';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('contract')
export class ContractController {
	constructor(private readonly contractService: ContractService) {}

	@Post()
	async createContract(
		@InjectToken() token: Token,
		@Body() contract: any,
	): Promise<Contract> {
		return await this.contractService.createContract(token.id, contract);
	}

	@Get(':id')
	async getContractById(@Param('id') id: string): Promise<Contract> {
		return await this.contractService.getContractById(id);
	}

	@Get(':id/fields')
	async getContractByIdWithFields(
		@Param('id') id: string,
	): Promise<Contract> {
		return await this.contractService.getContractByIdWithFields(id);
	}

	@Get(':id/organisation')
	async getContractsByOrganisation(@Param('id') id: string): Promise<any> {
		return await this.contractService.getContractsByOrganisation(id);
	}

	@Put(':id')
	async editContract(@Param('id') id: string, @Body() contractToEdit: Contract): Promise<string> {
		return await this.contractService.editContract(id, contractToEdit);
	}

	@Delete(':id')
	async deleteContract(@Param('id') id: string): Promise<Contract> {
		return await this.contractService.deleteContract(id);
	}
}
