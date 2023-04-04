import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from '../models/auth.model';
import { v4 as uuid } from 'uuid';
import { Organisation } from '../organisation/organisation.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop({ default: uuid, required: true, unique: true })
	id: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	jobTitle: string;

	@Prop({ enum: Role, default: Role.Sales })
	role: Role;

	@Prop({
		type: [MongooseSchema.Types.ObjectId],
		ref: Organisation.name,
		required: true,
	})
	organisations: Organisation[];
}

export const UserSchema = SchemaFactory.createForClass(User);
