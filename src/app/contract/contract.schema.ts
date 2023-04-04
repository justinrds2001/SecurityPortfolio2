import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../customer/customer.schema';
import { Organisation } from '../organisation/organisation.schema';
import { Response, ResponseSchema } from '../response/response.schema';
import { User } from '../user/user.schema';

export type ContractDocument = Contract & Document;

@Schema()
export class Contract {
	@Prop({ default: uuidv4, unique: true })
	id: string;

	@Prop({ required: true })
	title: string;

	@Prop({
		required: true,
		type: MongooseSchema.Types.ObjectId,
		ref: Organisation.name,
	})
	organisation: Organisation;

	@Prop({ required: true })
	lastEditedBy: User;

	@Prop({ required: true })
	supplier: User;

	@Prop({ required: true })
	lastEditedDate: Date;

	// ##### Only used on generated pdf #####

	@Prop({ required: true })
	customer: Customer;

	@Prop({ required: true })
	dateOfSigning: Date;

	@Prop({ required: true })
	locationOfSigning: string;

	//Optional
	@Prop({ type: [ResponseSchema] })
	responses: Response[];
}

export const ContractSchema = SchemaFactory.createForClass(Contract).index(
	{ title: 1, organisation: 1 },
	{ unique: true },
);
