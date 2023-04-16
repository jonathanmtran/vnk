import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../../pages/api/graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddToQueueInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  performed?: InputMaybe<Scalars['String']>;
  queueId?: InputMaybe<Scalars['ID']>;
  songName?: InputMaybe<Scalars['String']>;
  youTubeUrl?: InputMaybe<Scalars['String']>;
};

export type CreateQueueInput = {
  name: Scalars['String'];
};

export type DeleteQueueEntryInput = {
  id?: InputMaybe<Scalars['ID']>;
  queueId?: InputMaybe<Scalars['ID']>;
};

export type DeleteQueueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type DeleteQueueResponse = {
  __typename?: 'DeleteQueueResponse';
  affectedRows?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddToQueue: QueueEntry;
  CreateQueue: Queue;
  DeleteQueue: DeleteQueueResponse;
  DeleteQueueEntry: DeleteQueueResponse;
  UpdateQueueEntry: QueueEntry;
};


export type MutationAddToQueueArgs = {
  input: AddToQueueInput;
};


export type MutationCreateQueueArgs = {
  input: CreateQueueInput;
};


export type MutationDeleteQueueArgs = {
  input: DeleteQueueInput;
};


export type MutationDeleteQueueEntryArgs = {
  input: DeleteQueueEntryInput;
};


export type MutationUpdateQueueEntryArgs = {
  input: AddToQueueInput;
};

export type Query = {
  __typename?: 'Query';
  queue?: Maybe<Queue>;
  queues: Array<Queue>;
  youTubeVideos: Array<YouTubeVideo>;
};


export type QueryQueueArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryYouTubeVideosArgs = {
  query: Scalars['String'];
};

export type Queue = {
  __typename?: 'Queue';
  created?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  queue?: Maybe<Array<QueueEntry>>;
};

export type QueueEntry = {
  __typename?: 'QueueEntry';
  created?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  performed?: Maybe<Scalars['String']>;
  queueId?: Maybe<Scalars['String']>;
  songName?: Maybe<Scalars['String']>;
  youTubeUrl?: Maybe<Scalars['String']>;
};

export type YouTubeVideo = {
  __typename?: 'YouTubeVideo';
  id?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddToQueueInput: AddToQueueInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateQueueInput: CreateQueueInput;
  DeleteQueueEntryInput: DeleteQueueEntryInput;
  DeleteQueueInput: DeleteQueueInput;
  DeleteQueueResponse: ResolverTypeWrapper<DeleteQueueResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Queue: ResolverTypeWrapper<Queue>;
  QueueEntry: ResolverTypeWrapper<QueueEntry>;
  String: ResolverTypeWrapper<Scalars['String']>;
  YouTubeVideo: ResolverTypeWrapper<YouTubeVideo>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddToQueueInput: AddToQueueInput;
  Boolean: Scalars['Boolean'];
  CreateQueueInput: CreateQueueInput;
  DeleteQueueEntryInput: DeleteQueueEntryInput;
  DeleteQueueInput: DeleteQueueInput;
  DeleteQueueResponse: DeleteQueueResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Queue: Queue;
  QueueEntry: QueueEntry;
  String: Scalars['String'];
  YouTubeVideo: YouTubeVideo;
}>;

export type DeleteQueueResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['DeleteQueueResponse'] = ResolversParentTypes['DeleteQueueResponse']> = ResolversObject<{
  affectedRows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  AddToQueue?: Resolver<ResolversTypes['QueueEntry'], ParentType, ContextType, RequireFields<MutationAddToQueueArgs, 'input'>>;
  CreateQueue?: Resolver<ResolversTypes['Queue'], ParentType, ContextType, RequireFields<MutationCreateQueueArgs, 'input'>>;
  DeleteQueue?: Resolver<ResolversTypes['DeleteQueueResponse'], ParentType, ContextType, RequireFields<MutationDeleteQueueArgs, 'input'>>;
  DeleteQueueEntry?: Resolver<ResolversTypes['DeleteQueueResponse'], ParentType, ContextType, RequireFields<MutationDeleteQueueEntryArgs, 'input'>>;
  UpdateQueueEntry?: Resolver<ResolversTypes['QueueEntry'], ParentType, ContextType, RequireFields<MutationUpdateQueueEntryArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  queue?: Resolver<Maybe<ResolversTypes['Queue']>, ParentType, ContextType, Partial<QueryQueueArgs>>;
  queues?: Resolver<Array<ResolversTypes['Queue']>, ParentType, ContextType>;
  youTubeVideos?: Resolver<Array<ResolversTypes['YouTubeVideo']>, ParentType, ContextType, RequireFields<QueryYouTubeVideosArgs, 'query'>>;
}>;

export type QueueResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Queue'] = ResolversParentTypes['Queue']> = ResolversObject<{
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  queue?: Resolver<Maybe<Array<ResolversTypes['QueueEntry']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueueEntryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['QueueEntry'] = ResolversParentTypes['QueueEntry']> = ResolversObject<{
  created?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  performed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  queueId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  songName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youTubeUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type YouTubeVideoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['YouTubeVideo'] = ResolversParentTypes['YouTubeVideo']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  DeleteQueueResponse?: DeleteQueueResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Queue?: QueueResolvers<ContextType>;
  QueueEntry?: QueueEntryResolvers<ContextType>;
  YouTubeVideo?: YouTubeVideoResolvers<ContextType>;
}>;

