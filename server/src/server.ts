import app from './app';
import { env } from './config/env.config';
import { logger } from './utils/logger';
import { prisma } from './config/db.config';

const server = app.listen(env.PORT, async () => {
  try {
    await prisma.$connect();
    logger.info('🚀 Database connected successfully via Prisma');
    logger.info(`⚡ Server running on http://localhost:${env.PORT}${env.API_PREFIX}`);
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
  }
});

const handleShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    logger.info('Database connection closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
