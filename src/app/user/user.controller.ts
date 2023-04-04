import {
	Body,
	Controller, Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Put,
	UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.schema';
import { InjectToken, Token } from '../auth/token.decorator';
import { Role } from '../models/auth.model';
import { RolesGuard } from 'src/roles/roles.guard';
import { OrganisationService } from '../organisation/organisation.service';
import { Organisation } from '../organisation/organisation.schema';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService, private organisationService: OrganisationService) {}

	// ##### User #####
	@Get('info')
	async getUserInfo(@InjectToken() token: Token): Promise<User> {
		return await this.userService.getUserInfo(token.id);
	}

	@Get('role/:role')
	@UseGuards(RolesGuard)
	async getAllUsersByRole(
		@InjectToken() token: Token,
		@Param('role') role: Role,
	): Promise<User[]> {
		return await this.userService.getAllUsersByRole(role);
	}

	@Get('/organisations')
	async getOrganisationsFromUser(@InjectToken() token: Token): Promise<Organisation[]> {
		return await this.userService.getOrganisationsFromUser(token.id);
	}

	@Get(':id/organisation')
	async getUsersFromOrganisation(@Param('id') organisationId: string): Promise<User[]> {
		const org = await this.organisationService.getOrganisationByIdWithoutImg(organisationId)
		return await this.userService.getUsersFromOrganisation(org);
	}


	@Get(':id')
	async getUserById(
		@Param('id') userId: string,
	): Promise<User> {
		return await this.userService.getUserById(userId);
	}

	@Get()
	@UseGuards(RolesGuard)
	async getAllUsers(): Promise<User[]> {
		return await this.userService.getAllUsers();
	}

	@Put()
	async editUser(
		@InjectToken() token: Token,
		@Body() user: User,
	): Promise<User> {
		return await this.userService.editUser(token.id, user);
	}

	@Put(':id')
	@UseGuards(RolesGuard)
	async editUserById(
		@Param('id') id: string,
		@Body() user: User,
	): Promise<User> {
		try {
			return await this.userService.editUserById(id, user);
		} catch (e) {
			throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
		}
	}

	@Delete(':id')
	@UseGuards(RolesGuard)
	async deleteUserById(
		@Param('id') idToBeDeleted: string,
		@InjectToken() token: Token,
	): Promise<User> {
		return await this.userService.deleteIdentityByIdAndUserById(idToBeDeleted, token.id);
	}


}
