import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field } from '../field/field.schema';

export type ResponseDocument = Response & Document;

@Schema()
export class Response {
	@Prop({
		type: MongooseSchema.Types.ObjectId,
		ref: Field.name,
		required: true,
	})
	field: Field;

	@Prop()
	data: string;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);
