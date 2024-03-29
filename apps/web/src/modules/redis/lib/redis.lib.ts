import { Link } from '@prisma/client';
import { Redis } from '@upstash/redis';
import { StoreURLRedis } from '../types/redis.types';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const setLinkInRedis = async (payload: { link: Link }) => {
  const { link } = payload;
  const passwordProtected = link.password !== null;
  const exat = link.expiresAt ? new Date(link.expiresAt).getTime() / 1000 : null;

  await redis.set<StoreURLRedis>(
    link.alias,
    {
      url: link.url,
      password: passwordProtected,
    },
    // @ts-ignore
    {
      ...(exat && { exat }),
    }
  );
};

export const removeLinkFromRedis = async (payload: { alias: string }) => {
  await redis.del(payload.alias);
};

export const getLinkFromAlias = async (payload: { alias: string }) => {
  const link = await redis.get<StoreURLRedis>(payload.alias);

  if (!link) throw new Error(`Could not find URL with alias '${payload.alias}'!`);

  return link;
};
