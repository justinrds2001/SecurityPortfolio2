import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../category/category.schema';
import { Role } from '../models/auth.model';
import { Organisation } from '../organisation/organisation.schema';

export type FieldDocument = Field & Document;

@Schema()
export class Field {
	@Prop({ default: uuidv4 })
	id: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true })
	shortcodeName: string;

	@Prop({
		required: true,
		type: MongooseSchema.Types.ObjectId,
		ref: Category.name,
	})
	category: Category;

	@Prop({
		required: true,
		default: true,
	})
	isSpecifiable: boolean;
}

export const FieldSchema = SchemaFactory.createForClass(Field).index(
	{ name: 1, category: 1 },
	{ unique: true },
);
