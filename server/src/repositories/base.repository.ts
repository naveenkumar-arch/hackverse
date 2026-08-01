import { PrismaClient } from '@prisma/client';

export interface IBaseRepository<T> {
  findMany(params?: any): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: any): Promise<T>;
  update(id: string, data: any): Promise<T>;
  delete(id: string): Promise<T>;
  count(where?: any): Promise<number>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(prisma: PrismaClient, modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  protected get model(): any {
    return (this.prisma as any)[this.modelName];
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: any;
    orderBy?: any;
    include?: any;
    select?: any;
  } = {}): Promise<T[]> {
    return this.model.findMany(params);
  }

  async findById(id: string, include?: any): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
      ...(include && { include }),
    });
  }

  async create(data: any, include?: any): Promise<T> {
    return this.model.create({
      data,
      ...(include && { include }),
    });
  }

  async update(id: string, data: any): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }

  async count(where: any = {}): Promise<number> {
    return this.model.count({ where });
  }
}
