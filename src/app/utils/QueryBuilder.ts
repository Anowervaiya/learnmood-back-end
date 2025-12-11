import { Query, Document } from 'mongoose';
import { excludeField } from '../constant/constant';

// Nested populate type
type PopulateType = string | {
  path: string;
  select?: string;
  populate?: PopulateType;
};

export class QueryBuilder<T extends Document> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): this {
    const filter: Record<string, any> = { ...this.query };

    for (const field of excludeField) {
      delete filter[field];
    }

    Object.keys(filter).forEach(key => {
      if (filter[key] === '' || filter[key] === undefined || filter[key] === null) {
        delete filter[key];
      }
    });

    if (filter.minAge) {
      const today = new Date();
      const cutoffDate = new Date(
        today.getFullYear() - Number(filter.minAge),
        today.getMonth(),
        today.getDate()
      );
      filter.dob = { $lte: cutoffDate };
      delete filter.minAge;
    }

    this.modelQuery = this.modelQuery.find(filter);
    return this;
  }

  search(searchableFields: string[]): this {
    const searchTerm = this.query.searchTerm?.trim() || '';
    if (searchTerm) {
      const orConditions = searchableFields.map(field => {
        if (field === 'subject') {
          return { [field]: { $elemMatch: { $regex: searchTerm, $options: 'i' } } };
        } else if (field.includes('.')) {
          const [parent, child] = field.split('.');
          return { [`${parent}.${child}`]: { $regex: searchTerm, $options: 'i' } };
        }
        return { [field]: { $regex: searchTerm, $options: 'i' } };
      });
      this.modelQuery = this.modelQuery.find({ $or: orConditions });
    }
    return this;
  }

  sort(): this {
    const sort = this.query.sort || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  fields(): this {
    const fields = this.query.fields?.split(',').join(' ') || '';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  /**
   * Populate supports both:
   * 1️⃣ string + optional select (legacy)
   * 2️⃣ nested object (new)
   */
  populate(pathOrObj: PopulateType, select?: string): this {
    if (typeof pathOrObj === 'string') {
      // string path + optional select
      this.modelQuery = this.modelQuery.populate(pathOrObj, select);
    } else {
      // nested object populate
      this.modelQuery = this.modelQuery.populate(pathOrObj as any);
    }
    return this;
  }

  build() {
    return this.modelQuery;
  }

  async getMeta() {
    const totalDocuments = await this.modelQuery.model.countDocuments(
      (this.modelQuery as any)._conditions
    );

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const totalPage = Math.ceil(totalDocuments / limit);

    return { page, limit, total: totalDocuments, totalPage };
  }
}
