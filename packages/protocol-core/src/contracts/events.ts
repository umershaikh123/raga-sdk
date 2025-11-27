import type { PublicClient, Abi } from 'viem';
import type { EventListenerParams } from './types.js';
import { EventListenerError } from '../errors/index.js';

export class EventListener {
  constructor(private client: PublicClient) {}

  watch<TAbi extends Abi>(params: EventListenerParams<TAbi>): () => void {
    try {
      const event = params.abi.find(
        (item) => item.type === 'event' && item.name === params.eventName
      );

      if (!event) {
        throw new EventListenerError(
          `Event "${params.eventName}" not found in ABI`,
          params.eventName
        );
      }

      const unwatch = this.client.watchEvent({
        address: params.address,
        event: event as any,
        onLogs: params.onLogs as any,
        pollingInterval: params.pollingInterval,
      });

      return unwatch;
    } catch (error) {
      throw new EventListenerError(
        error instanceof Error ? error.message : 'Unknown error',
        params.eventName
      );
    }
  }

  async getLogs<TAbi extends Abi>(
    params: Omit<EventListenerParams<TAbi>, 'onLogs'> & {
      fromBlock?: bigint;
      toBlock?: bigint;
    }
  ): Promise<unknown[]> {
    try {
      const event = params.abi.find(
        (item) => item.type === 'event' && item.name === params.eventName
      );

      if (!event) {
        throw new EventListenerError(
          `Event "${params.eventName}" not found in ABI`,
          params.eventName
        );
      }

      const logs = await this.client.getLogs({
        address: params.address,
        event: event as any,
        fromBlock: params.fromBlock,
        toBlock: params.toBlock,
      });

      return logs;
    } catch (error) {
      throw new EventListenerError(
        error instanceof Error ? error.message : 'Unknown error',
        params.eventName
      );
    }
  }
}
