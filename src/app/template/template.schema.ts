import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type TemplateDocument = Template & Document;

@Schema()
export class Template {
	@Prop({ default: uuid, index: true })
	id: string;

	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ required: true })
	content: string;

	@Prop({ required: true })
	templateImage: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
