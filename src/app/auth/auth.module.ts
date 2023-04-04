import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';

import { Identity, IdentitySchema } from './identity.schema';
import { User, UserSchema } from '../user/user.schema';
import { AuthService } from './auth.service';
import { OrganisationService } from '../organisation/organisation.service';
import {
	Organisation,
	OrganisationSchema,
} from '../organisation/organisation.schema';
import { UserService } from '../user/user.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Identity.name, schema: IdentitySchema },
			{ name: User.name, schema: UserSchema },
			{ name: Organisation.name, schema: OrganisationSchema },
		]),
	],
	controllers: [AuthController],
	providers: [AuthService, OrganisationService, UserService],
	exports: [AuthService],
})
export class AuthModule {}
