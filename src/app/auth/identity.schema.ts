import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import isEmail from 'validator/lib/isEmail';

export type IdentityDocument = Identity & Document;

@Schema()
export class Identity {
	@Prop({ default: uuidv4, unique: true })
	id: string;

	@Prop({
		required: true,
		unique: true,
		validate: {
			validator: isEmail,
			message: 'should be a valid email',
		},
	})
	email: string;

	@Prop({ required: true })
	hash: string;
}

export const IdentitySchema = SchemaFactory.createForClass(Identity);
