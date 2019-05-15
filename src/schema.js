import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';
import Db from './db';

const Item = new GraphQLObjectType({
    name: 'Item',
    description: 'An item',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(item){
                    return item.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(item){
                    return item.title;
                }
            },
            description: {
                type: GraphQLString,
                resolve(item){
                    return item.description;
                }
            },
            color: {
                type: GraphQLString,
                resolve(item){
                    return item.color;
                }
            },
            image: {
                type: GraphQLString,
                resolve(item){
                    return item.image;
                }
            },
            season: {
                type: Season,
                resolve(item) {
                    return item.getSeason();
                }
            }
            
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Functions to create new entres',
    fields() {
        return {
            addItem: {
                type: Item,
                args: {
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    image: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    season: {
                        type: GraphQLInt
                    }
                },
                resolve(_, args){
                    return Db.models.item.create({
                        title: args.title,
                        description: args.description,
                        color: args.color,
                        image: args.image,
                        seasonId: args.season
                    })
                }
            }
        }
    }
})

const Season = new GraphQLObjectType({
    name: 'Season',
    description: 'A season',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(description){
                    return description.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(description){
                    return description.title;
                }
            },
            description: {
                type: GraphQLString,
                resolve(description){
                    return description.description;
                }
            },
            items: {
                type: new GraphQLList(Item),
                resolve(item) {
                    return item.getSeasons();
                }
            }
            
        }
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            items: {
                type: new GraphQLList(Item),
                args:{
                    id: {
                        type: GraphQLInt
                    },
                    title: {
                        type: GraphQLString
                    },
                    description: {
                        type: GraphQLString
                    },
                    color: {
                        type: GraphQLString
                    }
                },
                resolve(root, args){
                    return Db.models.item.findAll({where: args});
                }
            },
            seasons: {
                type: new GraphQLList(Season),
                resolve(root,args){
                    return Db.models.seasons.findAll({where: args});
                }
            }
        }
    }
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default Schema;