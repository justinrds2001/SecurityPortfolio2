import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
	@Prop({ default: uuidv4, unique: true })
	id: string;

	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ required: true, default: 0 })
	priority: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
