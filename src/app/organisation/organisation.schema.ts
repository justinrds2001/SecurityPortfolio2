import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type OrganisationDocument = Organisation & Document;

@Schema()
export class Organisation {
	@Prop({ default: uuid, index: true })
	id: string;

	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ required: true })
	organisationImage: string;

	@Prop({ required: true })
	organisationIdentifier: string;

	@Prop({ required: true })
	address: string;

	@Prop({ required: true })
	zipcode: string;

	@Prop({ required: true })
	city: string;

	@Prop({ required: true })
	country: string;

	@Prop({ required: true })
	representative: string;
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
