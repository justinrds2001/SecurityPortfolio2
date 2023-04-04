import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	jobTitle: string;

	@Prop({ required: true })
	address: string;

	@Prop({ required: true })
	postalCode: string;

	@Prop({ required: true })
	city: string;

	@Prop({ required: true })
	country: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
