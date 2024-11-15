import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
    ADVENDTURE='ADVENDTURE',
    CLASSICS='CLASSICS',
    CRIME='CRIME',
    FANTASY='FANTASY',
}

@Schema({ versionKey: false, timestamps: true })
export class Book {
    
    @Prop({required: [true, 'Book title is required'], trim: true, uppercase: true})
    title: string;

    @Prop({required: [true, 'Book description is required'], trim: true, uppercase: true})
    description: string;

    @Prop({required: [true, 'Book author is required'], trim: true, uppercase: true})
    author: string;

    @Prop({required: [true, 'Book price is required']})
    price: number;

    @Prop({required: [true, 'Book category is required']})
    category: Category;

    @Prop({default: true})
    is_active: boolean;

}

export const BookSchema = SchemaFactory.createForClass(Book);
