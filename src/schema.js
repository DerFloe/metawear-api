import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
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
            },
            brand: {
                type: Brand,
                resolve(item) {
                    return item.getBrand();
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
                    },
                    brand: {
                        type: GraphQLInt
                    }
                },
                resolve(_, args){
                    return Db.models.item.create({
                        title: args.title,
                        description: args.description,
                        color: args.color,
                        image: args.image,
                        seasonId: args.season,
                        brandId: args.brand
                    })
                }
            },
            addSeason: {
                type: Season,
                args: {
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args){
                    return Db.models.season.create({
                        title: args.title,
                        description: args.description
                    })
                }
            },
            addBrand: {
                type: Brand,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args){
                    return Db.models.brand.create({
                        name: args.name,
                        description: args.description
                    })
                }
            },
            addStore: {
                type: Store,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    link: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    logo: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args){
                    return Db.models.store.create({
                        name: args.name,
                        link: args.link,
                        logo: args.logo
                    })
                }
            },
            addStock: {
                type: Stock,
                args: {
                    size:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    stockcount: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    storelisting: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(_, args){
                    return Db.models.stock.create({
                        size: args.size,
                        stockcount: args.stockcount,
                        storelistingId: args.storelisting
                    })
                }
            },
            addStorelisting: {
                type: Storelisting,
                args: {
                    price: {
                        type: new GraphQLNonNull(GraphQLFloat)
                    },
                    saleprice: {
                        type: new GraphQLNonNull(GraphQLFloat)
                    },
                    link: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    item: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    store:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(_, args){
                    return Db.models.storelisting.create({
                        price: args.price,
                        saleprice: args.saleprice,
                        link: args.link,
                        itemId: args.item,
                        storeId: args.store
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
                resolve(season){
                    return season.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(season){
                    return season.title;
                }
            },
            description: {
                type: GraphQLString,
                resolve(season){
                    return season.description;
                }
            },
            items: {
                type: new GraphQLList(Item),
                resolve(season) {
                    return season.getItems();
                }
            }
            
        }
    }
});

const Stock = new GraphQLObjectType({
    name: 'Stock',
    description: 'A stock entry',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(stock){
                    return stock.id;
                }
            },
            size: {
                type: GraphQLString,
                resolve(stock){
                    return stock.size;
                }
            },
            stockcount: {
                type: GraphQLInt,
                resolve(stock){
                    return stock.stockcount;
                }
            },
            storelistings: {
                type: Storelisting,
                resolve(stock){
                    return stock.getStorelisting();
                }
            }
        }
    }
});



const Brand = new GraphQLObjectType({
    name: 'Brand',
    description: 'A brand',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(brand){
                    return brand.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(brand){
                    return brand.name;
                }
            },
            description: {
                type: GraphQLString,
                resolve(brand){
                    return brand.description;
                }
            },
            items: {
                type: new GraphQLList(Item),
                resolve(brand) {
                    return brand.getItems();
                }
            }
            
        }
    }
});

const Storelisting = new GraphQLObjectType({
    name: 'Storelisting',
    description: 'A storelisting',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(storelisting){
                    return storelisting.id;
                }
            },
            price: {
                type: GraphQLFloat,
                resolve(storelisting){
                    return storelisting.price;
                }
            },
            saleprice: {
                type: GraphQLFloat,
                resolve(storelisting){
                    return storelisting.saleprice;
                }
            },
            link: {
                type: GraphQLString,
                resolve(storelisting) {
                    return store.link;
                }
            },
            stocks: {
                type: new GraphQLList(Stock),
                resolve(storelisting){
                    return storelisting.getStocks();
                }
            },
            item: {
                type: Item,
                resolve(storelisting){
                    return storelisting.getItem();
                }
            },
            store: {
                type: Store,
                resolve(storelisting){
                    return storelisting.getStore();
                }
            }
            
        }
    }
});

const Store = new GraphQLObjectType({
    name: 'Store',
    description: 'A store',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(store){
                    return store.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve(store){
                    return store.name;
                }
            },
            link: {
                type: GraphQLString,
                resolve(store){
                    return store.link;
                }
            },
            logo: {
                type: GraphQLString,
                resolve(store) {
                    return store.logo;
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
                    return Db.models.season.findAll({where: args});
                }
            },
            brands: {
                type: new GraphQLList(Brand),
                resolve(root,args){
                    return Db.models.brand.findAll({where: args});
                }
            },
            stores: {
                type: new GraphQLList(Store),
                resolve(root,args){
                    return Db.models.store.findAll({where: args});
                }
            },
            stocks: {
                type: new GraphQLList(Stock),
                resolve(root,args){
                    return Db.models.stock.findAll({where: args});
                }
            },
            storelistings: {
                type: new GraphQLList(Storelisting),
                resolve(root,args){
                    return Db.models.storelisting.findAll({where: args});
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